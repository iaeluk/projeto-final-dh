package com.dh.Projeto.Integrador.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity @Table
@Getter
@Setter
public class Caracteristicas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private boolean wifi;
    private boolean arCondicionado;
    private boolean tvACabo;
    private boolean piscina;
    private boolean restaurante;
    private boolean cafeDaManha;
    private boolean estacionamento;
    private boolean permiteAnimais;
    private boolean hidromassagem;
    private boolean quartosFamilia;
    private boolean areaFumantes;
    private boolean bar;
    private boolean churrasqueira;
    private boolean lavanderia;


    public Caracteristicas(boolean wifi, boolean arCondicionado, boolean tvACabo, boolean piscina, boolean restaurante,
                           boolean cafeDaManha, boolean estacionamento, boolean permiteAnimais, boolean hidromassagem,
                           boolean quartosFamilia, boolean areaFumantes, boolean bar, boolean churrasqueira, boolean lavanderia) {
        this.wifi = wifi;
        this.arCondicionado = arCondicionado;
        this.tvACabo = tvACabo;
        this.piscina = piscina;
        this.restaurante = restaurante;
        this.cafeDaManha = cafeDaManha;
        this.estacionamento = estacionamento;
        this.permiteAnimais = permiteAnimais;
        this.hidromassagem = hidromassagem;
        this.quartosFamilia = quartosFamilia;
        this.areaFumantes = areaFumantes;
        this.bar = bar;
        this.churrasqueira = churrasqueira;
        this.lavanderia = lavanderia;
    }

    public Caracteristicas(){

    }
}