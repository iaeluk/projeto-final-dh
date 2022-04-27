package com.dh.Projeto.Integrador.service;

import com.dh.Projeto.Integrador.model.Funcoes;
import com.dh.Projeto.Integrador.model.Usuarios;
import com.dh.Projeto.Integrador.repository.FuncoesRepository;
import com.dh.Projeto.Integrador.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private FuncoesRepository funcoesRepository;

    @Transactional
    public Usuarios createUser(Usuarios usuarios) {

        return usuarioRepository.save(usuarios);
    }

    public List<Usuarios> AllUsers() {
        return usuarioRepository.findAll();
    }

}
