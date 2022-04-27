package com.dh.Projeto.Integrador.repository;

import com.dh.Projeto.Integrador.model.Caracteristicas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CaracteristicasRepository extends JpaRepository<Caracteristicas, Boolean>{

}
