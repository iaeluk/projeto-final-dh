package com.dh.Projeto.Integrador.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table
@Getter @Setter
public class Cidades {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nome;
    private String pais;


    public Cidades(String nome, String pais) {
        this.nome = nome;
        this.pais = pais;

    }

    public Cidades(){

    }
}
