package com.dh.Projeto.Integrador.controller;

import com.dh.Projeto.Integrador.DTO.ProdutoDto;
import com.dh.Projeto.Integrador.model.Produtos;
import com.dh.Projeto.Integrador.service.ProdutoService;
import com.dh.Projeto.Integrador.service.ReservaService;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.sipios.springsearch.anotation.SearchSpec;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("produto")
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    @Autowired
    private ReservaService reservaService;

    @PostMapping
    public ResponseEntity<Produtos> post(@RequestBody ProdutoDto produtoDto) {
        return ResponseEntity.ok(produtoService.createProduto(produtoDto));
    }

    @GetMapping
    public ResponseEntity<List<ProdutoDto>> get() {
        return ResponseEntity.ok(produtoService.selectAllProdutos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProdutoDto> getById(@PathVariable Integer id) {

        return ResponseEntity.ok(produtoService.selectById(id));
    }

    @GetMapping("categoria/{id}")
    public ResponseEntity<List<ProdutoDto>> selectProdCateg(@PathVariable Integer id) {
        return ResponseEntity.ok(produtoService.listProdCateg(id));
    }

    @GetMapping("cidade/{id}")
    public ResponseEntity<List<ProdutoDto>> selectProdCity(@PathVariable Integer id) {
        return ResponseEntity.ok(produtoService.listProdCity(id));
    }

    @GetMapping("filtro")
    public Object selectDate(@RequestParam @JsonFormat( pattern = "dd-MM-yyyy")Date checkIn,
                             @RequestParam @JsonFormat( pattern = "dd-MM-yyyy") Date checkOut,
                             @RequestParam Integer id) {

        return ResponseEntity.ok(produtoService.listDate( checkIn, checkOut, id));
    }

    @PutMapping
    public ResponseEntity<Produtos> update(@RequestBody ProdutoDto produtoDto) {
        return ResponseEntity.ok(produtoService.updateProduto(produtoDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> remove(@PathVariable Integer id){
        produtoService.delete(id);
        return ResponseEntity.ok("Produto excluído com sucesso!");
    }

}

