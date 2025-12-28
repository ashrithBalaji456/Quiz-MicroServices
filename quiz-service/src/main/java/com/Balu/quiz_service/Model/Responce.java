package com.Balu.quiz_service.Model;

import lombok.Data;

@Data
public class Responce {
    private Integer id;
    private String response;

    public Responce(Integer id, String response) {
        this.id = id;
        this.response = response;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }
}
