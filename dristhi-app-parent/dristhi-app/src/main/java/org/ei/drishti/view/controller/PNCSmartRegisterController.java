package org.ei.drishti.view.controller;

import com.google.gson.Gson;
import org.apache.commons.lang3.tuple.Pair;
import org.ei.drishti.domain.*;
import org.ei.drishti.domain.Child;
import org.ei.drishti.repository.AllBeneficiaries;
import org.ei.drishti.repository.AllEligibleCouples;
import org.ei.drishti.service.AlertService;
import org.ei.drishti.service.ServiceProvidedService;
import org.ei.drishti.util.Cache;
import org.ei.drishti.util.CacheableData;
import org.ei.drishti.view.contract.*;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import static java.lang.String.valueOf;
import static java.util.Collections.sort;
import static org.apache.commons.lang3.StringUtils.isBlank;
import static org.ei.drishti.AllConstants.PNCRegistrationFields.*;
import static org.ei.drishti.AllConstants.DEFAULT_WOMAN_IMAGE_PLACEHOLDER_PATH;
import static org.ei.drishti.AllConstants.ECRegistrationFields.*;
import static org.ei.drishti.domain.ServiceProvided.PNC_SERVICE_PROVIDED_NAME;

public class PNCSmartRegisterController {
    private static final String PNC_1_ALERT_NAME = "PNC 1";

    private static final String PNC_CLIENTS_LIST = "PNCClientList";
    private AllEligibleCouples allEligibleCouples;
    private AllBeneficiaries allBeneficiaries;
    private AlertService alertService;
    private Cache<String> cache;
    private final ServiceProvidedService serviceProvidedService;

    public PNCSmartRegisterController(ServiceProvidedService serviceProvidedService, AlertService alertService,
                                      AllEligibleCouples allEligibleCouples, AllBeneficiaries allBeneficiaries,
                                      Cache<String> cache) {
        this.allEligibleCouples = allEligibleCouples;
        this.allBeneficiaries = allBeneficiaries;
        this.alertService = alertService;
        this.serviceProvidedService = serviceProvidedService;
        this.cache = cache;
    }

    public String get() {
        return cache.get(PNC_CLIENTS_LIST, new CacheableData<String>() {
            @Override
            public String fetch() {
                List<PNCClient> pncClients = new ArrayList<PNCClient>();
                List<Pair<Mother, EligibleCouple>> pncsWithEcs = allBeneficiaries.allPNCsWithEC();

                for (Pair<Mother, EligibleCouple> pncWithEc : pncsWithEcs) {
                    Mother pnc = pncWithEc.getLeft();
                    EligibleCouple ec = pncWithEc.getRight();
                    String photoPath = isBlank(ec.photoPath()) ? DEFAULT_WOMAN_IMAGE_PLACEHOLDER_PATH : ec.photoPath();

                    List<ServiceProvidedDTO> servicesProvided = getServicesProvided(pnc.caseId());
                    List<AlertDTO> alerts = getAlerts(pnc.caseId());
                    pncClients.add(new PNCClient(pnc.caseId(), ec.village(), ec.wifeName(), pnc.thayiCardNumber(), pnc.referenceDate())
                            .withHusbandName(ec.husbandName())
                            .withAge(ec.age())
                            .withWomanDOB(ec.getDetail(WOMAN_DOB))
                            .withECNumber(ec.ecNumber())
                            .withIsHighPriority(ec.isHighPriority())
                            .withIsHighRisk(pnc.isHighRisk())
                            .withEconomicStatus(ec.getDetail(ECONOMIC_STATUS))
                            .withIsOutOfArea(ec.isOutOfArea())
                            .withCaste(ec.getDetail(CASTE))
                            .withPhotoPath(photoPath)
                            .withFPMethod(ec.getDetail(CURRENT_FP_METHOD))
                            .withIUDPlace(ec.getDetail(IUD_PLACE))
                            .withIUDPerson(ec.getDetail(IUD_PERSON))
                            .withNumberOfCondomsSupplied(ec.getDetail(NUMBER_OF_CONDOMS_SUPPLIED))
                            .withFamilyPlanningMethodChangeDate(ec.getDetail(FAMILY_PLANNING_METHOD_CHANGE_DATE))
                            .withNumberOfOCPDelivered(ec.getDetail(NUMBER_OF_OCP_DELIVERED))
                            .withNumberOfCentchromanPillsDelivered(ec.getDetail(NUMBER_OF_CENTCHROMAN_PILLS_DELIVERED))
                            .withDeliveryPlace(pnc.getDetail(DELIVERY_PLACE))
                            .withDeliveryType(pnc.getDetail(DELIVERY_TYPE))
                            .withDeliveryComplications(pnc.getDetail(DELIVERY_COMPLICATIONS))
                            .withPNCComplications(pnc.getDetail(IMMEDIATE_REFERRAL_REASON))
                            .withOtherDeliveryComplications(pnc.getDetail(OTHER_DELIVERY_COMPLICATIONS))
                            .withEntityIdToSavePhoto(ec.caseId())
                            .withAlerts(alerts)
                            .withServicesProvided(servicesProvided)
                            .withChildren(findChildren(pnc))
                    );
                }
                sortByName(pncClients);
                return new Gson().toJson(pncClients);
            }
        });
    }

    public String villages() {
        List<Village> villagesList = new ArrayList<Village>();
        List<String> villages = allEligibleCouples.villages();
        for (String village : villages) {
            villagesList.add(new Village(village));
        }
        return new Gson().toJson(villagesList);
    }

    private List<ServiceProvidedDTO> getServicesProvided(String entityId) {
        List<ServiceProvided> servicesProvided = serviceProvidedService.findByEntityIdAndServiceNames(entityId,
                PNC_SERVICE_PROVIDED_NAME);
        List<ServiceProvidedDTO> serviceProvidedDTOs = new ArrayList<ServiceProvidedDTO>();
        for (ServiceProvided serviceProvided : servicesProvided) {
            serviceProvidedDTOs.add(new ServiceProvidedDTO(serviceProvided.name(), serviceProvided.date(), serviceProvided.data()));
        }
        return serviceProvidedDTOs;
    }

    private List<AlertDTO> getAlerts(String entityId) {
        List<Alert> alerts = alertService.findByEntityIdAndAlertNames(entityId,
                PNC_1_ALERT_NAME
        );
        List<AlertDTO> alertDTOs = new ArrayList<AlertDTO>();
        for (Alert alert : alerts) {
            alertDTOs.add(new AlertDTO(alert.visitCode(), valueOf(alert.status()), alert.startDate()));
        }
        return alertDTOs;
    }

    private void sortByName(List<PNCClient> pncClients) {
        sort(pncClients, new Comparator<PNCClient>() {
            @Override
            public int compare(PNCClient onePNCClient, PNCClient anotherPNCClient) {
                if(onePNCClient.wifeName()==null )
                {
                	if(anotherPNCClient.wifeName()==null)
                	{
                		
                		return "".compareToIgnoreCase("");
                	}else{
                		
                		return"".compareToIgnoreCase(anotherPNCClient.wifeName());
                	}
                }else if(anotherPNCClient.wifeName()==null)
                {
                return	onePNCClient.wifeName().compareToIgnoreCase("");
                }
                else{
            	return onePNCClient.wifeName().compareToIgnoreCase(anotherPNCClient.wifeName());
                }
                }
        });
    }

    private List<ChildClient> findChildren(Mother mother) {
        List<Child> children = allBeneficiaries.findAllChildrenByMotherId(mother.caseId());
        List<ChildClient> childClientList = new ArrayList<ChildClient>();
        for (Child child : children) {
            childClientList.add(new ChildClient(child.caseId(), child.gender(), child.getDetail("weight"), mother.thayiCardNumber()));
        }
        return childClientList;
    }
}
