package com.ConquerorOfTheSky.logica;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


import com.ConquerorOfTheSky.modelos.Avion;

 
@SpringBootApplication
public class ConquerorOfTheSkyApplication {

    public static void main(String[] args) {

        SpringApplication.run(ConquerorOfTheSkyApplication.class, args);

        Avion av = new Avion( "Avion1", 222,12, 400, "Alta", 0, 0);
        
    }
}
