package com.dh.Projeto.Integrador.Admin;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class UsuarioSenha {

    private String email;
    private String senha;


}
