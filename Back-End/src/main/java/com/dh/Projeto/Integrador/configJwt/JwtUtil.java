package com.dh.Projeto.Integrador.configJwt;

import com.dh.Projeto.Integrador.model.Usuarios;
import com.dh.Projeto.Integrador.repository.UsuarioRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {


    @Autowired
    private  UsuarioRepository repository;

    private String SECRET_KEY = "secret";


    public String extractUserName(String token) {

        return extractClaimUsername(token);
    }


    public Date extractExpiration(String token) {
        return extractClaimDate(token);
    }

    public Date extractClaimDate(String token){
        Claims claims = extractAllClaims(token);
        return claims.getExpiration();
    }
    public String extractClaimUsername(String token){
        Claims claims = extractAllClaims(token);
        return claims.getSubject();
    }
    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    }

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("dados", repository.findByEmail(userDetails.getUsername()));


        return createToken(claims, userDetails.getUsername());
    }

    private String createToken(Map<String, Object> claims, String userDetails ) {


        return Jwts.builder().setClaims(claims).setSubject(userDetails)
                        .setIssuedAt(new
                        Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 900_000 * 16))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY ).compact();
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUserName(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
}
