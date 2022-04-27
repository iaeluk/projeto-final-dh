package com.dh.Projeto.Integrador.service;

import com.dh.Projeto.Integrador.DTO.ProdutoDto;
import com.dh.Projeto.Integrador.DTO.ReservaDto;
import com.dh.Projeto.Integrador.model.Cidades;
import com.dh.Projeto.Integrador.model.Produtos;
import com.dh.Projeto.Integrador.model.Reservas;
import com.dh.Projeto.Integrador.model.Usuarios;
import com.dh.Projeto.Integrador.repository.CidadeRepository;
import com.dh.Projeto.Integrador.repository.ProdutoRepository;
import com.dh.Projeto.Integrador.repository.ReservaRepository;
import com.dh.Projeto.Integrador.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.awt.*;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private CidadeRepository cidadeRepository;

    @Transactional
    public Reservas createReserva(ReservaDto reservaDto) {

        Produtos produto = produtoRepository.getById(reservaDto.getProdutoId());
        Usuarios usuario = usuarioRepository.getById(reservaDto.getUsuarioId());
        Cidades cidade = cidadeRepository.getById(reservaDto.getCidadeId());

        Reservas reserva = new Reservas();
        reserva.setCheckIn(reservaDto.getCheckIn());
        reserva.setCheckOut(reservaDto.getCheckOut());
        reserva.setProduto(produto);
        reserva.setUsuario(usuario);
        reserva.setHoraCheckIn(reservaDto.getHoraCheckIn());
        reserva.setCidade(cidade);


        return reservaRepository.save(reserva);

    }

    public List<ReservaDto> listarPorProduto(Integer id) {

        Produtos produto = produtoRepository.getById(id);
        List<Reservas> listReservas = reservaRepository.listarReservasIdProduto(produto.getId());

        List<ReservaDto> listReservasIdProduto = new ArrayList<>();

        if (id == produto.getId()) {
            for (int i = 0; i < listReservas.size(); i++) {
                ReservaDto reservaDto = new ReservaDto();

                reservaDto.setId(listReservas.get(i).getId());
                reservaDto.setCheckIn(listReservas.get(i).getCheckIn());
                reservaDto.setCheckOut(listReservas.get(i).getCheckOut());
                reservaDto.setProdutoId(listReservas.get(i).getProduto().getId());
                reservaDto.setUsuarioId(listReservas.get(i).getUsuario().getId());
                reservaDto.setHoraCheckIn(listReservas.get(i).getHoraCheckIn());

                listReservasIdProduto.add(reservaDto);
            }
        }
        return listReservasIdProduto;
    }


    public List<ReservaDto> listarPorUsuario(Integer id) {

        Usuarios usuario = usuarioRepository.getById(id);
        List<Reservas> listReservas = reservaRepository.listarReservasIdUsuario(usuario.getId());

        List<ReservaDto> listReservasIdUsuario = new ArrayList<>();

        if (id == usuario.getId()) {
            for (int i = 0; i < listReservas.size(); i++) {
                ReservaDto reservaDto = new ReservaDto();

                reservaDto.setId(listReservas.get(i).getId());
                reservaDto.setCheckIn(listReservas.get(i).getCheckIn());
                reservaDto.setCheckOut(listReservas.get(i).getCheckOut());
                reservaDto.setProdutoId(listReservas.get(i).getProduto().getId());
                reservaDto.setUsuarioId(listReservas.get(i).getUsuario().getId());
                reservaDto.setHoraCheckIn(listReservas.get(i).getHoraCheckIn());

                listReservasIdUsuario.add(reservaDto);
            }
        }
        return listReservasIdUsuario;
    }


}

