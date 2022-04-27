package com.dh.Projeto.Integrador.repository;

import com.dh.Projeto.Integrador.model.Categorias;
import com.dh.Projeto.Integrador.model.Cidades;
import com.dh.Projeto.Integrador.model.Produtos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface CidadeRepository extends JpaRepository<Cidades, Integer> {

}
