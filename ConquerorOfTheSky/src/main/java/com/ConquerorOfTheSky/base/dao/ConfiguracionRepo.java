package com.ConquerorOfTheSky.base.dao;

import com.ConquerorOfTheSky.base.modelo.Configuracion;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConfiguracionRepo extends JpaRepository<Configuracion, Integer> {

 
}