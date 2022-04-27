package com.dh.Projeto.Integrador;

import com.dh.Projeto.Integrador.DTO.ProdutoDto;
import com.dh.Projeto.Integrador.model.Produtos;
import com.dh.Projeto.Integrador.model.Reservas;
import com.dh.Projeto.Integrador.model.Usuarios;
import com.dh.Projeto.Integrador.service.ProdutoService;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.Assert.*;

@SpringBootTest
class ProjetoIntegradorApplicationTests  {

    @Test
    void teste(Integer id){
        ProdutoService produtoService = new ProdutoService();

        assertEquals(produtoService.listProdCity(id), produtoService.selectAllProdutos());
    }

    @Test
    void testeReserva(){
        Reservas reservas = new Reservas();

        assertNull(reservas.getUsuario());
    }

    @Test
    void produto(){
        Produtos produto = new Produtos();
        ProdutoDto produtoDto = new ProdutoDto();

        assertNotEquals(produto, produtoDto );
    }

    @Test
    void criarProduto(ProdutoDto produto){

        ProdutoService produtoService = new ProdutoService();

        produtoService.createProduto(produto);
    }



}
