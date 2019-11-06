package com.beniregev.price_compare_app.model;

import lombok.*;
import org.springframework.data.annotation.Id;

import java.math.BigDecimal;
import java.util.UUID;

//price-compare-app
/**
 * Using {@link Lombok} annotations
 * @author Binyamin (Benny) Regev e-mail: beniregev@gmail.com
 */
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class Product {
    @Id
    @Getter
    private String id;
    @Getter
    @Setter
    private String name;
    @Getter
    @Setter
    private BigDecimal pricePerUnit;
    @Getter
    @Setter
    private String measuringUnits;

    public Product(String name, BigDecimal pricePerUnit, String measuringUnits) {
        this.id = UUID.randomUUID().toString();
        this.name = name;
        this.pricePerUnit = pricePerUnit;
        this.measuringUnits = measuringUnits;
    }
}
