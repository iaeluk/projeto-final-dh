package com.dh.Projeto.Integrador.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity @Table
public class Imagens {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String url;
    private String descricao;


    public Imagens(String url, String descricao) {
        this.url = url;
        this.descricao = descricao;
    }

    public Imagens(){

    }
}
