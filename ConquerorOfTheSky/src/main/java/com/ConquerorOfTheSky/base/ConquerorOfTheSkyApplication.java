package com.ConquerorOfTheSky.base;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@SpringBootApplication(scanBasePackages = { "com.ConquerorOfTheSky.base.handlers", "com.ConquerorOfTheSky.base.logica" })
@EnableJpaRepositories("com.ConquerorOfTheSky.base.dao")
@EntityScan("com.ConquerorOfTheSky.base.modelo")
public class ConquerorOfTheSkyApplication implements ApplicationRunner{
    
    public static void main(String[] args) {
        SpringApplication.run(ConquerorOfTheSkyApplication.class, args);
    }

    @Override
    public void run(ApplicationArguments arg0) throws Exception {


    }

}
