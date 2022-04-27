package com.dh.Projeto.Integrador.controller;

import com.dh.Projeto.Integrador.DTO.ProdutoDto;
import com.dh.Projeto.Integrador.model.Cidades;
import com.dh.Projeto.Integrador.service.CidadeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("cidade")
public class CidadeController {

    @Autowired
    private CidadeService cidadeService;

    @GetMapping("/{id}")
    public ResponseEntity<Cidades> getById(@PathVariable Integer id) {

        return ResponseEntity.ok(cidadeService.findId(id));
    }

    @PostMapping
    public ResponseEntity<Cidades> post(@RequestBody Cidades cidades){
        return ResponseEntity.ok(cidadeService.createCidade(cidades));
    }
    @GetMapping
    public ResponseEntity<List<Cidades>> get(){
        return ResponseEntity.ok(cidadeService.selectAllCidades());
    }



}
