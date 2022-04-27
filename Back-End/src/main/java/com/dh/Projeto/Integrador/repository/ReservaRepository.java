package com.dh.Projeto.Integrador.repository;

import com.dh.Projeto.Integrador.DTO.ProdutoDto;
import com.dh.Projeto.Integrador.DTO.ReservaDto;
import com.dh.Projeto.Integrador.model.Produtos;
import com.dh.Projeto.Integrador.model.Reservas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ReservaRepository extends JpaRepository<Reservas, Integer> {

    @Query(value = "SELECT * FROM reservas " +
            "INNER JOIN produtos " +
            "ON reservas.produto_id=produtos.id " +
            "WHERE produtos.id=:id", nativeQuery = true)
    List<Reservas> listarReservasIdProduto(@Param("id") Integer id);


    @Query(value = "SELECT * FROM reservas " +
            "INNER JOIN usuarios " +
            "ON reservas.usuario_id=usuarios.id " +
            "WHERE usuarios.id=:id", nativeQuery = true)
    List<Reservas> listarReservasIdUsuario(@Param("id") Integer id);


    List<Reservas> findByCheckOutGreaterThanEqualAndCheckInLessThanEqualAndCidadeId(Date checkIn, Date checkOut,
                                                                                      Integer cidadeId);


}
