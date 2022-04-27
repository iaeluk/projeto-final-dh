package com.dh.Projeto.Integrador.DTO;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class ReservaDto {

    private Integer id;
    private Date checkIn;
    private Date checkOut;
    private Integer produtoId;
    private Integer usuarioId;
    private String horaCheckIn;
    private Integer cidadeId;



}
