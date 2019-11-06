package com.beniregev.price_compare_app.model;

import lombok.*;
import org.springframework.data.annotation.Id;

import java.math.BigDecimal;
import java.util.UUID;

@NoArgsConstructor
@EqualsAndHashCode
@ToString
public class ShopProduct {
    @Id
    @Getter
    private String id;
    @Setter @Getter
    private String shopId;
    @Setter @Getter
    private String shopName;
    @Setter @Getter
    private String productId;
    @Setter @Getter
    private String productName;
    @Setter @Getter
    private BigDecimal pricePerUnit;
    @Setter @Getter
    private String measuringUnits;

    public ShopProduct(String shopId, String productId, BigDecimal pricePerUnit, String measuringUnits) {
        this.id = UUID.randomUUID().toString();
        this.shopId = shopId;
        this.productId = productId;
        this.pricePerUnit = pricePerUnit;
        this.measuringUnits = measuringUnits;
        this.shopName = "";
        this.productName = "";
    }
}
