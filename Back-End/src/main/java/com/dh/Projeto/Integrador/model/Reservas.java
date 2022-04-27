package com.dh.Projeto.Integrador.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.text.SimpleDateFormat;
import java.util.Date;

@Entity
@Table
@Getter
@Setter
public class Reservas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Temporal(TemporalType.DATE)
    private Date checkIn;
    @Temporal(TemporalType.DATE)
    private Date checkOut;
    @ManyToOne
    private Produtos produto;
    @ManyToOne
    private Usuarios usuario;
    private String horaCheckIn;
    @ManyToOne
    private Cidades cidade;


    public Reservas(Date checkIn, Date checkOut, Produtos produto, Usuarios usuario, String horaCheckIn, Cidades cidade) {
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.produto = produto;
        this.usuario = usuario;
        this.horaCheckIn = horaCheckIn;
        this.cidade = cidade;
    }

    public Reservas() {
    }

}
