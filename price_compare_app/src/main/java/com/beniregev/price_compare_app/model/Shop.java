package com.beniregev.price_compare_app.model;

import lombok.*;
import org.springframework.data.annotation.Id;

import java.util.UUID;

@NoArgsConstructor
@EqualsAndHashCode
@ToString
public class Shop {
    @Id
    @Getter
    private String id;
    @Setter
    @Getter
    private String name;

    public Shop(String name) {
        this.id = UUID.randomUUID().toString();
        this.name = name;
    }


    public Shop(String id, String name) {
        this.id = id;
        this.name = name;
    }
}
