package com.dh.Projeto.Integrador.service;

import com.dh.Projeto.Integrador.model.Categorias;
import com.dh.Projeto.Integrador.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Transactional
    public Categorias create(Categorias categoria){
        return categoriaRepository.save(categoria);
    }

    public List<Categorias> selectAll(){
        return categoriaRepository.findAll();
    }
    
    public Categorias selectId(Integer id){
        return categoriaRepository.getById(id);
    }


    public String delete(Integer id){
        categoriaRepository.deleteById(id);
        return ("Categoria deletada");
    }

    public Categorias update(Categorias categoria){
        Categorias categoria1 = categoriaRepository.getById(categoria.getId());
        categoria1.setTitulo(categoria.getTitulo());
        categoria1.setDisponibilidade(categoria.getDisponibilidade());
        categoria1.setUrl_Img(categoria.getUrl_Img());

        return categoriaRepository.save(categoria1);

    }


}
