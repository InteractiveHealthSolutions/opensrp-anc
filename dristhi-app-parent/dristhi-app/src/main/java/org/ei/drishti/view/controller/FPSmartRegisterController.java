package org.ei.drishti.view.controller;

import com.google.gson.Gson;
import org.ei.drishti.domain.Alert;
import org.ei.drishti.domain.EligibleCouple;
import org.ei.drishti.repository.AllBeneficiaries;
import org.ei.drishti.repository.AllEligibleCouples;
import org.ei.drishti.service.AlertService;
import org.ei.drishti.util.Cache;
import org.ei.drishti.util.CacheableData;
import org.ei.drishti.view.contract.AlertDTO;
import org.ei.drishti.view.contract.FPClient;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import static java.util.Collections.sort;
import static org.apache.commons.lang3.StringUtils.isBlank;
import static org.ei.drishti.AllConstants.DEFAULT_WOMAN_IMAGE_PLACEHOLDER_PATH;

public class FPSmartRegisterController {
    public static final String OCP_REFILL_ALERT_NAME = "OCP Refill";
    public static final String CONDOM_REFILL_ALERT_NAME = "Condom Refill";
    public static final String DMPA_INJECTABLE_REFILL_ALERT_NAME = "DMPA Injectable Refill";
    public static final String FEMALE_STERILIZATION_FOLLOWUP_1_ALERT_NAME = "Female sterilization Followup 1";
    public static final String FEMALE_STERILIZATION_FOLLOWUP_2_ALERT_NAME = "Female sterilization Followup 2";
    public static final String FEMALE_STERILIZATION_FOLLOWUP_3_ALERT_NAME = "Female sterilization Followup 3";
    public static final String MALE_STERILIZATION_FOLLOWUP_1_ALERT_NAME = "Male sterilization Followup 1";
    public static final String MALE_STERILIZATION_FOLLOWUP_2_ALERT_NAME = "Male sterilization Followup 2";
    public static final String IUD_FOLLOWUP_1_ALERT_NAME = "IUD Followup 1";
    public static final String IUD_FOLLOWUP_2_ALERT_NAME = "IUD Followup 2";
    public static final String FP_FOLLOWUP_ALERT_NAME = "FP Followup";
    public static final String FP_REFERRAL_FOLLOWUP_ALERT_NAME = "FP Referral Followup";

    private final static String FP_CLIENTS_LIST = "FPClientsList";

    private final AllEligibleCouples allEligibleCouples;
    private final AllBeneficiaries allBeneficiaries;
    private Cache<String> cache;
    private final AlertService alertService;

    public FPSmartRegisterController(AllEligibleCouples allEligibleCouples, AllBeneficiaries allBeneficiaries, AlertService alertService, Cache<String> cache) {
        this.allEligibleCouples = allEligibleCouples;
        this.allBeneficiaries = allBeneficiaries;
        this.alertService = alertService;
        this.cache = cache;
    }

    public String get() {
        return cache.get(FP_CLIENTS_LIST, new CacheableData<String>() {
            @Override
            public String fetch() {
                List<EligibleCouple> ecs = allEligibleCouples.all();
                List<FPClient> fpClients = new ArrayList<FPClient>();
                for (EligibleCouple ec : ecs) {
                    if (allBeneficiaries.isPregnant(ec.caseId())) {
                        continue;
                    }
                    String photoPath = isBlank(ec.photoPath()) ? DEFAULT_WOMAN_IMAGE_PLACEHOLDER_PATH : ec.photoPath();
                    List<AlertDTO> alerts = getFPAlertsForEC(ec.caseId());
                    FPClient fpClient = new FPClient(ec.caseId(), ec.wifeName(), ec.husbandName(), ec.village(), ec.ecNumber())
                            .withAge(ec.age())
                            .withFPMethod(ec.getDetail("currentMethod"))
                            .withFamilyPlanningMethodChangeDate(ec.getDetail("familyPlanningMethodChangeDate"))
                            .withComplicationDate(ec.getDetail("complicationDate"))
                            .withIUDPlace(ec.getDetail("iudPlace"))
                            .withIUDPerson(ec.getDetail("iudPerson"))
                            .withNumberOfCondomsSupplied(ec.getDetail("numberOfCondomsSupplied"))
                            .withNumberOfCentchromanPillsDelivered(ec.getDetail("numberOfCentchromanPillsDelivered"))
                            .withNumberOfOCPDelivered(ec.getDetail("numberOfOCPDelivered"))
                            .withFPMethodFollowupDate(ec.getDetail("fpFollowupDate"))
                            .withCaste(ec.getDetail("caste"))
                            .withEconomicStatus(ec.getDetail("economicStatus"))
                            .withNumberOfPregnancies(ec.getDetail("numberOfPregnancies"))
                            .withParity(ec.getDetail("parity"))
                            .withNumberOfLivingChildren(ec.getDetail("numberOfLivingChildren"))
                            .withNumberOfStillBirths(ec.getDetail("numberOfStillBirths"))
                            .withNumberOfAbortions(ec.getDetail("numberOfAbortions"))
                            .withIsYoungestChildUnderTwo(ec.isYoungestChildUnderTwo())
                            .withYoungestChildAge(ec.getDetail("youngestChildAge"))
                            .withIsHighPriority(ec.isHighPriority())
                            .withPhotoPath(photoPath)
                            .withAlerts(alerts)
                            .withCondomSideEffect(ec.getDetail("condomSideEffect"))
                            .withIUDSidEffect(ec.getDetail("iudSidEffect"))
                            .withOCPSideEffect(ec.getDetail("ocpSideEffect"))
                            .withInjectableSideEffect(ec.getDetail("injectableSideEffect"))
                            .withSterilizationSideEffect(ec.getDetail("sterilizationSideEffect"))
                            .withOtherSideEffect(ec.getDetail("otherSideEffect"))
                            .withHighPriorityReason(ec.getDetail("highPriorityReason"));
                    fpClients.add(fpClient);
                }
                sortByName(fpClients);
                return new Gson().toJson(fpClients);
            }
        });
    }

    private List<AlertDTO> getFPAlertsForEC(String entityId) {
        List<Alert> alerts = alertService.findByEntityIdAndAlertNames(entityId,
                OCP_REFILL_ALERT_NAME,
                CONDOM_REFILL_ALERT_NAME, DMPA_INJECTABLE_REFILL_ALERT_NAME,
                FEMALE_STERILIZATION_FOLLOWUP_1_ALERT_NAME,
                FEMALE_STERILIZATION_FOLLOWUP_2_ALERT_NAME,
                FEMALE_STERILIZATION_FOLLOWUP_3_ALERT_NAME,
                MALE_STERILIZATION_FOLLOWUP_1_ALERT_NAME,
                MALE_STERILIZATION_FOLLOWUP_2_ALERT_NAME,
                IUD_FOLLOWUP_1_ALERT_NAME,
                IUD_FOLLOWUP_2_ALERT_NAME,
                FP_FOLLOWUP_ALERT_NAME,
                FP_REFERRAL_FOLLOWUP_ALERT_NAME);
        ArrayList<AlertDTO> alertDTOs = new ArrayList<AlertDTO>();
        for (Alert alert : alerts) {
            alertDTOs.add(new AlertDTO(alert.visitCode(), String.valueOf(alert.status()), alert.startDate()));
        }
        return alertDTOs;
    }

    private void sortByName(List<FPClient> fpClients) {
        sort(fpClients, new Comparator<FPClient>() {
            @Override
            public int compare(FPClient oneFPClient, FPClient anotherFPClient) {
                return oneFPClient.wifeName().compareToIgnoreCase(anotherFPClient.wifeName());
            }
        });
    }

}
