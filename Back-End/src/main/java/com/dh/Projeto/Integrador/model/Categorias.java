package com.dh.Projeto.Integrador.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity @Table
@Getter
@Setter
public class Categorias {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String titulo;
    private String disponibilidade;
    private String url_Img;


    public Categorias(String titulo, String disponibilidade, String url_Img) {
        this.titulo = titulo;
        this.disponibilidade = disponibilidade;
        this.url_Img = url_Img;
    }

    public Categorias(){

    }
}
