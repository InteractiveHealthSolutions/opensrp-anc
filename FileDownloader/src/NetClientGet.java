import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

 
public class NetClientGet {
 
	// http://localhost:8080/RESTfulExample/json/product/get
	public static void main(String[] args) {
 
	  try {

		URL url = new URL("https://enketo.formhub.org/transform/get_html_form");
		HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		conn.setRequestMethod("POST");
		conn.setDoInput(true);
		conn.setDoOutput(true);
        conn.getOutputStream().write("server_url=https://ona.io/thrive_pakistan&form_id=TT_Pakistan".getBytes());
		if (conn.getResponseCode() != 200) {
			throw new RuntimeException("Failed : HTTP error code : "
					+ conn.getResponseCode());
		}
 
		BufferedReader br = new BufferedReader(new InputStreamReader(
			(conn.getInputStream())));
 
		StringBuilder sb = new StringBuilder();
		String output = null;
		System.out.println("Output from Server .... \n");
		while ((output = br.readLine()) != null) {
			System.out.println(output);
			sb.append(output);
		}
 
		/*FileOutputStream fop = new FileOutputStream("d:\\tlocal201312161608.xml");
		fop.write(sb.toString().getBytes());
		conn.disconnect();*/
 
	  } catch (MalformedURLException e) {
 
		e.printStackTrace();
 
	  } catch (IOException e) {
 
		e.printStackTrace();
 
	  }
 
	}
/* 
	  public String clientPost (String postUri, String content)
      {
              HttpsClient client = new HttpsClient (context);
              HttpUriRequest request = null;
              HttpResponse response = null;
              HttpEntity entity;
              StringBuilder builder = new StringBuilder ();
              String auth = "";
              try
              {
                      HttpPost httpPost = new HttpPost (postUri);
                      httpPost.setHeader ("Accept", "application/json");
                      httpPost.setHeader ("Content-Type", "application/json");
                      StringEntity stringEntity = new StringEntity (content);
                      httpPost.setEntity (stringEntity);
                      request = httpPost;
                      auth = Base64.encodeToString ((App.getUsername () + ":" + App.getPassword ()).getBytes ("UTF-8"),
                                      android.util.Base64.NO_WRAP);
                      request.addHeader ("Authorization", "Basic " + auth);
                      response = client.execute (request);
                      entity = response.getEntity ();
                      InputStream is = entity.getContent ();
                      BufferedReader bufferedReader = new BufferedReader (new InputStreamReader (is));
                      builder = new StringBuilder ();
                      while (bufferedReader.read () != -1)
                              builder.append (bufferedReader.readLine ());
                      entity.consumeContent ();
              }
              catch (UnsupportedEncodingException e)
              {
                      Log.e (TAG, e.getMessage ());
              }
              catch (ClientProtocolException e)
              {
                      Log.e (TAG, e.getMessage ());
              }
              catch (IOException e)
              {
                      Log.e (TAG, e.getMessage ());
              }
              return builder.toString ();
      }*/
}