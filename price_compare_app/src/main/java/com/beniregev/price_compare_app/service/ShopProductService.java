package com.beniregev.price_compare_app.service;

import org.json.JSONObject;
import com.beniregev.price_compare_app.model.ShopProduct;
import com.beniregev.price_compare_app.repository.ShopProductRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.math.BigDecimal;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ShopProductService {
    private BufferedReader in;
    private HttpURLConnection conn = null;
    private StringBuffer result;
    private StringBuffer response;

    private static ShopProductRepository shopProductRepository = new ShopProductRepository();

    public List<ShopProduct> getAll() {
        return shopProductRepository.findAll();
    }

    public ShopProduct getById(final String shopProductId) {
        return shopProductRepository.findById(shopProductId);
    }

    public ShopProduct create(String shopId, String productId, BigDecimal pricePerUnit, String measuringUnits) {
        ShopProduct shopProduct = new ShopProduct(shopId, productId, pricePerUnit, measuringUnits);
        return shopProductRepository.create(shopProduct);
    }

    public ShopProduct updateShopProduct(String shopId, String productId, BigDecimal pricePerUnit) {
        return null;
    }

    public ShopProduct getLowestPriceByProductId(final String productId) {
        try {
            ShopProduct shopProduct = shopProductRepository.findLowestPriceByProductId(productId);

//            final String stringGetShopByIdUrl = "http://localhost:8080/shop/" + shopProduct.getShopId();
//            final String stringGetProductByIdUrl = "http://localhost:8080/product/" + shopProduct.getProductId();
//
//            //  region send GET request: Chuck Norris Random Fact
//            String responseGetShop = this.sendGetRequest(stringGetShopByIdUrl);
//            System.out.println("GET request: GetShopById(" + shopProduct.getShopId() + ") -- response JSON = " + responseGetShop);
//            JSONObject jsonObjResponse = this.getJsonObject(responseGetShop);
//            int httpStatusCode;
//            if (responseGetShop.indexOf("\"error\":") > -1) {
//                //  Get Request Error Handling
//                ShopServiceResponseEntity responseEntity = handleRequestError(jsonObjResponse);
//                return null;    //  T.B.D.
//            }
//            String shopName = jsonObjResponse.getString("name");
//
//            String responseGetProduct = this.sendGetRequest(stringGetProductByIdUrl);
//            System.out.println("GET request: GetProductById(" + shopProduct.getProductId() + ") -- response JSON = " + responseGetProduct);
//            jsonObjResponse = this.getJsonObject(responseGetProduct);
//            if (responseGetShop.indexOf("\"error\":") > -1) {
//                //  Get Request Error Handling
//                ShopServiceResponseEntity responseEntity = handleRequestError(jsonObjResponse);
//                return null;    //  T.B.D.
//            }
//            String productName = jsonObjResponse.getString("name");
//
//            shopProduct.setShopName(shopName);
//            shopProduct.setProductName(productName);
//            System.out.println("Shop Name: " + shopName + " ; Product Name: " + productName);
//            //  endregion

            return shopProduct;
        } catch(NoSuchElementException nse) {
            System.out.println("ShopProductService.findLowestPriceByProductId(" + productId +") throws NoSuchElementException");
            return null;
        }
    }
    public ShopProduct deleteById(final String shopProductId) {
        return shopProductRepository.deleteById(shopProductId);
    }

    private String sendGetRequest(final String stringUrl) {
        result = new StringBuffer();

        try {
            URL url = new URL(stringUrl);
            conn = (HttpURLConnection) url.openConnection();

            // optional default is GET
            conn.setRequestMethod("GET");
            conn.setRequestProperty("User-Agent", "Mozilla/5.0");
            conn.setRequestProperty("Content-Type", "application/json; utf-8");
            conn.setRequestProperty("Accept-Language", "en-US,en;q=0.5");

            int httpStatusCode = conn.getResponseCode();

            Reader streamReader;
            if (httpStatusCode > 299) {
                streamReader = new InputStreamReader(conn.getErrorStream());
            } else {
                streamReader = new InputStreamReader(conn.getInputStream());
            }

            in = new BufferedReader( streamReader );

            System.out.println("\t -------------------------------------------------");
            System.out.println("URL String: " + stringUrl);
            response = new StringBuffer();
            String inputLine;
            while ((inputLine = in.readLine()) != null) {
                System.out.println("\t inputLine: " + inputLine);
                response.append(inputLine);
            }
            System.out.println("\t -------------------------------------------------");
            in.close();
            conn.disconnect();

            //print result
            System.out.println("\nSending 'GET' request to URL : " + url);
            System.out.println("HTTP Status Code: " + httpStatusCode);
            System.out.println("response = " + response.toString());

            result.append(response.toString()).append("\n");
        } catch (IOException e) {
            e.printStackTrace();
            result.append(e.getMessage()).append("\n");
        } finally {
            try {
                conn.disconnect();
            } catch(NullPointerException npe) {
                npe.printStackTrace();
                result.append(npe.getMessage());
            }
        }
        return result.toString();
    }

    private JSONObject getJsonObject(final String jsonString) {
        System.out.println("ShopProductService.getJsonObject(..) -- jsonString: " + jsonString );
        return new JSONObject(jsonString);
    }

    /**
     *
     * @param objJsonError
     * @return
     */
    private ShopServiceResponseEntity handleRequestError(final JSONObject objJsonError) {
        /*  Create an Error JSON string and return it as part of ResponseEntity
            {
                "error": {
                    "code": 429,
                    "message": "Too Many Requests: Rate limit of 5 requests per hour exceeded. Please wait for 3 seconds."
                }
            }
         */
        int httpStatusCode = objJsonError.getJSONObject("error").getInt("code");
        String HttpStatusText = objJsonError.getJSONObject("error").getString("message");
        StringBuffer jsonObjectError = new StringBuffer("{ \"error\": { \"code\": ")
                .append(httpStatusCode)
                .append(", \"message\": \"")
                .append(HttpStatusText)
                .append("\" }  }");
        System.out.println("An error occurred. Get request returned HTTP Status code " + httpStatusCode +
                ", message: " + HttpStatusText + "\n Error JSON Object: " + jsonObjectError.toString());

        return new ShopServiceResponseEntity(HttpStatus.valueOf(httpStatusCode), jsonObjectError.toString());
    }

}
