package com.dh.Projeto.Integrador.service;

import com.dh.Projeto.Integrador.model.Funcoes;
import com.dh.Projeto.Integrador.model.Usuarios;
import com.dh.Projeto.Integrador.repository.FuncoesRepository;
import com.dh.Projeto.Integrador.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@Transactional
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UsuarioRepository adminrepository;

    private Funcoes funcoes;

    @Autowired
    private FuncoesRepository repository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        Usuarios usuario = adminrepository.findByEmail(email);

        List<GrantedAuthority> authoritiesListUser = List.of(new SimpleGrantedAuthority(usuario.getFuncoes().getNome()));



        return new User(usuario.getEmail(), usuario.getSenha(), authoritiesListUser);



    }

}
