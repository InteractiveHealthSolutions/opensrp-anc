package org.ei.drishti.view.activity;

import static org.ei.drishti.AllConstants.ALERT_NAME_PARAM;
import static org.ei.drishti.AllConstants.ENTITY_ID;
import static org.ei.drishti.util.Log.logInfo;

import java.util.Map;

import org.ei.drishti.AllConstants;
import org.ei.drishti.Context;
import org.ei.drishti.event.CapturedPhotoInformation;
import org.ei.drishti.event.Event;
import org.ei.drishti.event.Listener;
import org.ei.drishti.view.controller.ANCDetailController;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import android.content.Intent;
import android.util.Log;

public class ANCDetailActivity extends SecuredWebActivity {
    private Listener<CapturedPhotoInformation> photoCaptureListener;
    private String metaData;
    
    @Override
    protected void onInitialization() {
        String caseId = (String) getIntent().getExtras().get("caseId");

        webView.addJavascriptInterface(new ANCDetailController(this, caseId, context.allEligibleCouples(), context.allBeneficiaries(), context.allTimelineEvents()), "context");
        webView.loadUrl("file:///android_asset/www/anc_detail.html");

        photoCaptureListener = new Listener<CapturedPhotoInformation>() {
            @Override
            public void onEvent(CapturedPhotoInformation data) {
                if (webView != null) {
                    webView.loadUrl("javascript:pageView.reloadPhoto('" + data.entityId() + "', '" + data.photoPath() + "')");
                }
            }
        };
        Event.ON_PHOTO_CAPTURED.addListener(photoCaptureListener);
    }

	@Override
	protected void onActivityResult(int requestCode, int resultCode, Intent data) {
		// TODO Auto-generated method stub
		
		if(data!=null){
	Log.d("ANC_onactivityresult", ""+data.describeContents());
		}
		else {
			Log.d("ANC_onactivityresult", "intent data is null");
			
		}
		}

	
}
