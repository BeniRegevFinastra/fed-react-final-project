package com.beniregev.price_compare_app.repository;

import com.beniregev.price_compare_app.model.Product;
import com.beniregev.price_compare_app.model.Shop;
import com.google.gson.Gson;
import org.springframework.util.ResourceUtils;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.util.*;
import java.util.stream.Collectors;

public class ProductRepository {
    private Map<String, Product> products = new HashMap<>();

    public ProductRepository() {
        try {
            final String FILENAME = "classpath:json/products.json";
            File file =  ResourceUtils.getFile(FILENAME);

            //File found?
            System.out.println("\"json/products.json\" -- File Found : " + file.exists());

            //Read File Content
            String content  = new String(Files.readAllBytes(file.toPath()));
            System.out.println("ProductRepository() -- " + content);

            List<Product> productsList = Arrays.asList(new Gson().fromJson(content, Product[].class));
            products = productsList.stream().collect(
                    Collectors.toMap(Product::getId, product -> product));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public List<Product> findAll() {
        return new ArrayList<>(products.values());
    }

    public Product findById(String productId) {
        return products.get(productId);
    }

    public Product create(String name, BigDecimal pricePerUnit, String measuringUnits) {
        Product product = new Product(name, pricePerUnit, measuringUnits);
        return this.create(product);
    }

    public Product create(Product product) {
        products.put(product.getId(), product);
        return product;
    }

    public Product deleteById(String productId) {
        Product productToDelete = products.get(productId);
        if (productToDelete != null) {
            products.remove(productId);
        }
        return productToDelete;
    }
}
