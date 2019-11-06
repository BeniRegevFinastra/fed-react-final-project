package com.beniregev.price_compare_app.controller;

import com.beniregev.price_compare_app.model.Product;
import com.beniregev.price_compare_app.model.Shop;
import com.beniregev.price_compare_app.model.ShopProduct;
import com.beniregev.price_compare_app.service.ProductService;
import com.beniregev.price_compare_app.service.ShopProductService;
import com.beniregev.price_compare_app.service.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
public class PriceCompareController {
    @Autowired
    private ProductService productService;
    @Autowired
    private ShopService shopService;
    @Autowired
    private ShopProductService shopProductService;

    @CrossOrigin
    @RequestMapping("/product/getAll")
    public List<Product> getAllProducts() {
        return productService.getAll();
    }

    @CrossOrigin
    @GetMapping("/product/{productId}")
    public Product getProductById(@PathVariable String productId) {
        return productService.getById(productId);
    }

    @CrossOrigin
    @RequestMapping("/product/create")
    public Product createProduct(@RequestParam String name,
                          @RequestParam BigDecimal pricePerUnit,
                          @RequestParam String measuringUnits) {
        return productService.create(name, pricePerUnit, measuringUnits);
    }

    @CrossOrigin
    @DeleteMapping("/product/delete/{productId}")
    //@RequestMapping(value="/delete/{productId}", method=RequestMethod.DELETE)
    public Product deleteProductById(@PathVariable String productId) {
        System.out.println("PriceCompareController.deleteById(" + productId + ")");
        Product product = productService.deleteById(productId);
        System.out.println("PriceCompareController.deleteById(" + productId + ") = " + product);
        return product;
    }

    @CrossOrigin
    @RequestMapping("/shop/getAll")
    public List<Shop> getAllShops() {
        return shopService.getAll();
    }

    @CrossOrigin
    @GetMapping("/shop/{shopId}")
    public Shop getShopById(@PathVariable String shopId) {
        return shopService.getById(shopId);
    }

    @CrossOrigin
    @RequestMapping("/shop/create")
    public Shop createShop(@RequestParam String name) {
        return shopService.create(name);
    }

    @CrossOrigin
    @DeleteMapping("/shop/delete/{shopId}")
    //@RequestMapping(value="/shop/delete/{shopId}", method=RequestMethod.DELETE)
    public Shop deleteShopById(@PathVariable String shopId) {
        System.out.println("PriceCompareController.deleteById(" + shopId + ")");
        Shop shop = shopService.deleteById(shopId);
        System.out.println("PriceCompareController.deleteById(" + shopId + ") = " + shop);
        return shop;
    }

    @CrossOrigin
    @RequestMapping("/shopProduct/getAll")
    public List<ShopProduct> getAllShopsProducts() {
        return shopProductService.getAll();
    }

    @CrossOrigin
    @RequestMapping("/shopProduct/create")
    public ShopProduct createShopProduct(@RequestParam String shopId,
                           @RequestParam String productId,
                           @RequestParam BigDecimal pricePerUnit,
                           @RequestParam String measuringUnits) {
        return shopProductService.create(shopId, productId, pricePerUnit, measuringUnits);
    }

    @CrossOrigin
    @DeleteMapping("/shopProduct/update/shop/{shopId}/product/{productId}/price/{pricePerUnit}")
    public ShopProduct updateShopProduct(@PathVariable String shopId,
                                         @PathVariable String productId,
                                         @PathVariable BigDecimal pricePerUnit) {
        return shopProductService.updateShopProduct(shopId, productId, pricePerUnit);
    }

    @CrossOrigin
    @RequestMapping("/shopProduct/getLowestPrice/product/{productId}")
    public ResponseEntity<ShopProduct> getLowestPriceByProductId(@PathVariable String productId) {
        ShopProduct shopProduct = shopProductService.getLowestPriceByProductId(productId);
        HttpStatus httpStatus = HttpStatus.OK;
        if (shopProduct == null) {
            shopProduct = new ShopProduct("", "", new BigDecimal(0), "pcs");
            httpStatus = HttpStatus.NOT_FOUND;
        }
        return new ResponseEntity<>(shopProduct, httpStatus);
    }

}
