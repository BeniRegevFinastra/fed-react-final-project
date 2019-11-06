package com.beniregev.price_compare_app.service;

import com.beniregev.price_compare_app.model.Shop;
import com.beniregev.price_compare_app.repository.ShopRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ShopService {
    private static ShopRepository shopRepository = new ShopRepository();

    public List<Shop> getAll() {
        return shopRepository.findAll();
    }

    public Shop create(String name) {
        Shop shop = new Shop(name);
        return shopRepository.create(shop);
    }

    public Shop getById(final String shopId) {
        return shopRepository.findById(shopId);
    }

    public Shop deleteById(final String shopId) {
        return shopRepository.deleteById(shopId);
    }

}
