package com.dh.Projeto.Integrador.repository;

import com.dh.Projeto.Integrador.DTO.ProdutoDto;
import com.dh.Projeto.Integrador.model.Categorias;
import com.dh.Projeto.Integrador.model.Cidades;
import com.dh.Projeto.Integrador.model.Produtos;
import com.dh.Projeto.Integrador.model.Reservas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ProdutoRepository extends JpaRepository<Produtos, Integer>, JpaSpecificationExecutor<ProdutoDto> {

    @Query("SELECT p FROM Produtos p WHERE p.categorias = ?1")
    List<Produtos> listarProdutos(Categorias categoria);

    @Query("SELECT p FROM Produtos p WHERE p.cidades = ?1")
    List<Produtos> listProdutos(Cidades cidades);


}
