package com.dh.Projeto.Integrador.repository;

import com.dh.Projeto.Integrador.model.Categorias;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriaRepository extends JpaRepository<Categorias, Integer> {

}
