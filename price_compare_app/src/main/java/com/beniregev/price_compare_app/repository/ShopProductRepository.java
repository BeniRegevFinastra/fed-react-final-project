package com.beniregev.price_compare_app.repository;

import com.beniregev.price_compare_app.model.ShopProduct;
import com.google.gson.Gson;
import org.springframework.util.ResourceUtils;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.util.*;
import java.util.stream.Collectors;

public class ShopProductRepository {
    private Map<String, ShopProduct> shopsProducts = new HashMap<>();

    public ShopProductRepository() {
        try {
            final String FILENAME = "classpath:json/ShopsProducts.json";
            File file =  ResourceUtils.getFile(FILENAME);

            //File found?
            System.out.println("\"json/ShopsProducts.json\" -- File Found : " + file.exists());

            //Read File Content
            String content  = new String(Files.readAllBytes(file.toPath()));
            System.out.println("ShopProductRepository() -- " + content);

            List<ShopProduct> shopsList = Arrays.asList(new Gson().fromJson(content, ShopProduct[].class));
            shopsProducts = shopsList.stream().collect(
                    Collectors.toMap(ShopProduct::getId, shopProduct -> shopProduct));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public List<ShopProduct> findAll() {
        return new ArrayList<>(shopsProducts.values());
    }

    public ShopProduct findById(String shopProductId) {
        return shopsProducts.get(shopProductId);
    }

    public List<ShopProduct> findByProductId(final String productId) {
        List<ShopProduct> products =  shopsProducts.values().stream()
                .filter(sp -> sp.getProductId().equals(productId))
                .collect(Collectors.toList());
        return products;
    }

    public ShopProduct findLowestPriceByProductId(final String productId) throws NoSuchElementException {
        List<ShopProduct> listProducts = this.findByProductId(productId);
        ShopProduct lowestPricedProduct = listProducts
                .stream()
                .min(Comparator.comparing(ShopProduct::getPricePerUnit))
                .orElseThrow(NoSuchElementException::new);

        return lowestPricedProduct;
    }

    public ShopProduct create(String shopId, String productId, BigDecimal pricePerUnit, String measuringUnits) {
        ShopProduct shopProduct = new ShopProduct(shopId, productId, pricePerUnit, measuringUnits);
        return this.create(shopProduct);
    }

    public ShopProduct create(ShopProduct shopProduct) {
        shopsProducts.put(shopProduct.getId(), shopProduct);
        return shopProduct;
    }

    public ShopProduct deleteById(String shopProductId) {
        ShopProduct shopProductToDelete = shopsProducts.get(shopProductId);
        if (shopProductToDelete != null) {
            shopsProducts.remove(shopProductId);
        }
        return shopProductToDelete;
    }

}
