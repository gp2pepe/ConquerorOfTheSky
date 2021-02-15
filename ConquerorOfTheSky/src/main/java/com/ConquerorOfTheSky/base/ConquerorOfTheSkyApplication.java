package com.ConquerorOfTheSky.base;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@SpringBootConfiguration
@SpringBootApplication
public class ConquerorOfTheSkyApplication implements ApplicationRunner{
    
    private static final Logger log = LoggerFactory.getLogger(ConquerorOfTheSkyApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(ConquerorOfTheSkyApplication.class, args);
    }

    @Override
    public void run(ApplicationArguments arg0) throws Exception {


    }

}
