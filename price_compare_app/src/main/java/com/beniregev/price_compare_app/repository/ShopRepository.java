package com.beniregev.price_compare_app.repository;

import com.beniregev.price_compare_app.model.Shop;
import com.google.gson.Gson;
import org.springframework.util.ResourceUtils;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.util.*;
import java.util.stream.Collectors;

public class ShopRepository {
    private Map<String, Shop> shops = new HashMap<>();

    public ShopRepository() {
        try {
            final String FILENAME = "classpath:json/shops.json";
            File file =  ResourceUtils.getFile(FILENAME);

            //File found?
            System.out.println("\"json/shops.json\" -- File Found? " + file.exists());

            //Read File Content
            String content  = new String(Files.readAllBytes(file.toPath()));
            System.out.println("ShopRepository() -- " + content);

            List<Shop> shopsList = Arrays.asList(new Gson().fromJson(content, Shop[].class));
            shops = shopsList.stream().collect(
                    Collectors.toMap(Shop::getId, shop -> shop));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public List<Shop> findAll() {
        return new ArrayList<>(shops.values());
    }

    public Shop findById(String shopId) {
        return shops.get(shopId);
    }

    public Shop create(String name) {
        Shop shop = new Shop(name);
        return this.create(shop);
    }

    public Shop create(Shop shop) {
        shops.put(shop.getId(), shop);
        return shop;
    }

    public Shop deleteById(String shopId) {
        Shop shopToDelete = shops.get(shopId);
        if (shopToDelete != null) {
            shops.remove(shopId);
        }
        return shopToDelete;
    }
}
