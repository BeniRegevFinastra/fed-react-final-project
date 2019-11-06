package com.beniregev.price_compare_app.service;

import com.beniregev.price_compare_app.model.Shop;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Objects;

public class ShopServiceResponseEntity {
    private HttpStatus statusCode;
    private String statusMessage;
    private List<Shop> shops;

    public ShopServiceResponseEntity() {
    }

    public ShopServiceResponseEntity(List<Shop> shops) {
        this.shops = shops;
    }

    public ShopServiceResponseEntity(HttpStatus statusCode, String statusMessage) {
        this.statusCode = statusCode;
        this.statusMessage = statusMessage;
    }

    public ShopServiceResponseEntity(HttpStatus statusCode, String statusMessage, List<Shop> shops) {
        this.statusCode = statusCode;
        this.statusMessage = statusMessage;
        this.shops = shops;
    }

    public HttpStatus getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(HttpStatus statusCode) {
        this.statusCode = statusCode;
    }

    public String getStatusMessage() {
        return statusMessage;
    }

    public void setStatusMessage(String statusMessage) {
        this.statusMessage = statusMessage;
    }

    public List<Shop> getShops() {
        return shops;
    }

    public void setFacts(List<Shop> shops) {
        this.shops = shops;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ShopServiceResponseEntity that = (ShopServiceResponseEntity) o;
        return statusCode == that.statusCode &&
                statusMessage.equals(that.statusMessage) &&
                Objects.equals(shops, that.shops);
    }

    @Override
    public int hashCode() {
        return Objects.hash(statusCode, statusMessage, shops);
    }

    @Override
    public String toString() {
        return "ServiceResponseEntity{" +
                "statusCode=" + statusCode +
                ", statusMessage='" + statusMessage + '\'' +
                ", shops=" + shops +
                '}';
    }
}
