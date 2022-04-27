package com.dh.Projeto.Integrador.service;

import com.dh.Projeto.Integrador.model.Cidades;
import com.dh.Projeto.Integrador.repository.CidadeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class CidadeService {

    @Autowired
    private CidadeRepository cidadeRepository;

    @Transactional
    public Cidades createCidade(Cidades cidades){
        return cidadeRepository.save(cidades);
    }

    public Cidades findId(Integer id){
        return cidadeRepository.getById(id);
    }

    public List<Cidades> selectAllCidades(){
        return cidadeRepository.findAll();
    }

}
