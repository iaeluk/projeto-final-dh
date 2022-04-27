package com.dh.Projeto.Integrador.DTO;

import com.dh.Projeto.Integrador.model.Caracteristicas;
import com.dh.Projeto.Integrador.model.Imagens;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import java.awt.font.TextAttribute;
import java.util.HashMap;
import java.util.List;

@Getter
@Setter
public class ProdutoDto {

    private Integer id;
    private String nome;
    private String descricao;
    private List<Imagens> imagens;
    private Integer categoriaId;
    private Caracteristicas caracteristicas;
    private Integer cidadeId;
    private double avaliacao;
    private String latitude;
    private String longitude;
    private double preco;


}
