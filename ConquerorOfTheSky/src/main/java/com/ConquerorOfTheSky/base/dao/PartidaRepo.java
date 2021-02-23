package com.ConquerorOfTheSky.base.dao;

import com.ConquerorOfTheSky.base.modelo.Partida;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PartidaRepo extends JpaRepository<Partida, Long> {

 
}