package com.ConquerorOfTheSky.base.excepciones;

import com.google.gson.annotations.Expose;

public class PartidaNoExisteException extends Exception {

    private static final long serialVersionUID = 1L;

    @Expose
    private String operacion = "errorServidor";
    @Expose
    private String metodo;
    @Expose
    private String mensaje;
	
	public PartidaNoExisteException(String metodo,String mensaje) {
        this.metodo = metodo;
		this.mensaje = mensaje;
	}

	public String getMensaje() {
		return mensaje;
	}
}
