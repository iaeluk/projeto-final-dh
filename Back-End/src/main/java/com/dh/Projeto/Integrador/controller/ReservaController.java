package com.dh.Projeto.Integrador.controller;


import com.dh.Projeto.Integrador.DTO.ReservaDto;
import com.dh.Projeto.Integrador.model.Reservas;
import com.dh.Projeto.Integrador.repository.ReservaRepository;
import com.dh.Projeto.Integrador.service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@Controller
@RequestMapping("/reserva")
public class ReservaController {


    @Autowired
    private ReservaService reservaService;

    @PostMapping
    public ResponseEntity<Reservas> postReserva(@RequestBody ReservaDto reservaDto){

        return ResponseEntity.status(HttpStatus.CREATED).body(reservaService.createReserva(reservaDto));
    }

    @GetMapping("/produto/{id}")
    public ResponseEntity<List<ReservaDto>> getPorProduto(@PathVariable Integer id){

        return ResponseEntity.ok(reservaService.listarPorProduto(id));
    }

    @GetMapping("/usuario/{id}")
    public ResponseEntity<List<ReservaDto>> getPorUsuario(@PathVariable Integer id){

        return ResponseEntity.ok(reservaService.listarPorUsuario(id));
    }

}
