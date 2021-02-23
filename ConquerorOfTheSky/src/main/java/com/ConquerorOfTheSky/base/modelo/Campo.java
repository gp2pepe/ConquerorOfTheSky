package com.ConquerorOfTheSky.base.modelo;

import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.FetchType;
import javax.persistence.CascadeType;


@Entity
@Table(name="campo")
public class Campo {
    
    @Id
    @Column(name="id_campo")
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long idCampo;

    private int tamanioX;
    private int tamanioY;
    private int posicion;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "artillerias_campo",
                joinColumns = {@JoinColumn(name = "id_campo")},
                inverseJoinColumns = {@JoinColumn(name = "id_artilleria")})
    private Set<Artilleria> artillerias;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_base", referencedColumnName = "id_base")
    private Base base;

    public Campo() {
    }

    public Campo(Long idCampo, int tamanioX, int tamanioY, int posicion, Set<Artilleria> artillerias,
            Base base) {
        this.idCampo = idCampo;
        this.tamanioX = tamanioX;
        this.tamanioY = tamanioY;
        this.posicion = posicion;
        this.artillerias = artillerias;
        this.base = base;
    }

    public Long getIdCampo() {
        return idCampo;
    }

    public void setIdCampo(Long idCampo) {
        this.idCampo = idCampo;
    }

    public int getTamanioX() {
        return tamanioX;
    }

    public void setTamanioX(int tamanioX) {
        this.tamanioX = tamanioX;
    }

    public int getTamanioY() {
        return tamanioY;
    }

    public void setTamanioY(int tamanioY) {
        this.tamanioY = tamanioY;
    }

    public int getPosicion() {
        return posicion;
    }

    public void setPosicion(int posicion) {
        this.posicion = posicion;
    }

    public Set<Artilleria> getArtillerias() {
        return artillerias;
    }

    public void setArtillerias(Set<Artilleria> artillerias) {
        this.artillerias = artillerias;
    }

    public Base getBases() {
        return base;
    }

    public void setBases(Base bases) {
        this.base = bases;
    }

    


}
