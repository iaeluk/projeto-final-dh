package com.dh.Projeto.Integrador.repository;

import com.dh.Projeto.Integrador.model.Usuarios;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuarios, Integer> {

     Usuarios findByEmail(String email);


}
