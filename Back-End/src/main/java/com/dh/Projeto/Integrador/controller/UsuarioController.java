package com.dh.Projeto.Integrador.controller;

import com.dh.Projeto.Integrador.configJwt.JwtUtil;
import com.dh.Projeto.Integrador.model.Usuarios;
import com.dh.Projeto.Integrador.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserDetailsService userDetailsService;
    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping
    public ResponseEntity<Usuarios> create(@RequestBody Usuarios usuarios){

        usuarios.setSenha(encoder.encode(usuarios.getSenha()));
        usuarioService.createUser(usuarios);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
    @GetMapping
    public ResponseEntity<List<Usuarios>> selectall(){
        return ResponseEntity.ok(usuarioService.AllUsers());
    }

    @PostMapping("/jwt")
    public ResponseEntity<String> getJwt(@RequestBody Usuarios usuarios) throws Exception{ {

            try {
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(usuarios.getEmail(), usuarios.getSenha()));
            }catch (BadCredentialsException e) {
                throw new Exception("Incorrect", e);
            }
            catch (Exception e) {
                e.printStackTrace();
            }
            final UserDetails userDetails =
                    userDetailsService.loadUserByUsername(usuarios.getEmail());
            return ResponseEntity.ok(jwtUtil.generateToken(userDetails));
        }
    }
}
