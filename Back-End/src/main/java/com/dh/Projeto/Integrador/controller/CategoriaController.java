package com.dh.Projeto.Integrador.controller;

import com.dh.Projeto.Integrador.model.Categorias;
import com.dh.Projeto.Integrador.model.Produtos;
import com.dh.Projeto.Integrador.service.CategoriaService;
import com.dh.Projeto.Integrador.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("categoria")
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    @PostMapping
    public ResponseEntity<Categorias> post(@RequestBody Categorias categoria){
        return ResponseEntity.ok(categoriaService.create(categoria));
    }
    @GetMapping("/{id}")
    public ResponseEntity<Categorias> getId(@PathVariable Integer id){
        return ResponseEntity.ok(categoriaService.selectId(id));
    }

    @GetMapping
    public ResponseEntity<List<Categorias>> get(){
        return ResponseEntity.ok(categoriaService.selectAll());
    }

    @PutMapping
    public ResponseEntity<Categorias> put(@RequestBody Categorias categoria){
        return ResponseEntity.ok(categoriaService.update(categoria));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> remove(@PathVariable Integer id){
        categoriaService.delete(id);
        return ResponseEntity.ok("Categoria excluída!!");
    }

}
