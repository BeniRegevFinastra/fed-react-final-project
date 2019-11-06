package com.beniregev.price_compare_app.service;

import com.beniregev.price_compare_app.model.Product;
import com.beniregev.price_compare_app.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    private ProductRepository productRepository = new ProductRepository();

    public List<Product> getAll() {
        return productRepository.findAll();
    }

    public Product getById(final String productId) {
        return productRepository.findById(productId);
    }

    public Product create(String name, BigDecimal pricePerUnit, String measuringUnits) {
        Product product = new Product(name, pricePerUnit, measuringUnits);
        return productRepository.create(product);
    }

    public Product deleteById(final String productId) {
        return productRepository.deleteById(productId);
    }
}
