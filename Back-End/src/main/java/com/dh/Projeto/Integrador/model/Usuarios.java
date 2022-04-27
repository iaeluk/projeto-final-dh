package com.dh.Projeto.Integrador.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;


import javax.persistence.*;


@Entity
@Table
@Getter
@Setter
public class Usuarios {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nome;
    private String sobrenome;
    @Column(unique=true)
    private String email;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String senha;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "funcoes_nome")
    private Funcoes funcoes;


    public Usuarios(){

    }

    public Usuarios(String nome, String sobrenome, String email, String senha, Funcoes funcoes) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.email = email;
        this.senha = senha;
        this.funcoes = funcoes;
    }
}
