package com.ConquerorOfTheSky.base.modelo;

import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.google.gson.annotations.Expose;

import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.FetchType;
import javax.persistence.CascadeType;


@Entity
@Table(name="campo")
public class Campo {
    
    @Expose
    @Id
    @Column(name="id_campo")
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long idCampo;

    @Expose
    private int posicionX;

    @Expose
    private int posicionY;

    @Expose
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "artillerias_campo",
                joinColumns = {@JoinColumn(name = "id_campo")},
                inverseJoinColumns = {@JoinColumn(name = "id_artilleria")})
    private Set<Artilleria> artillerias;

    @Expose
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_base", referencedColumnName = "id_base")
    private Base base;

    public Campo() {
    }

    public Campo( int posicionX, int posicionY, Set<Artilleria> artillerias,
            Base base) {
        this.posicionX = posicionX;
        this.posicionY = posicionY;
        this.artillerias = artillerias;
        this.base = base;
    }

    public Long getIdCampo() {
        return idCampo;
    }

    public void setIdCampo(Long idCampo) {
        this.idCampo = idCampo;
    }

    public Set<Artilleria> getArtillerias() {
        return artillerias;
    }

    public void setArtillerias(Set<Artilleria> artillerias) {
        this.artillerias = artillerias;
    }

    public Base getBase() {
        return base;
    }

    public void setBase(Base bases) {
        this.base = bases;
    }

    public int getPosicionX() {
        return posicionX;
    }

    public void setPosicionX(int posicionX) {
        this.posicionX = posicionX;
    }

    public int getPosicionY() {
        return posicionY;
    }

    public void setPosicionY(int posicionY) {
        this.posicionY = posicionY;
    }

    @Override
    public String toString() {
        return "Campo [artillerias=" + artillerias + ", base=" + base + ", idCampo=" + idCampo + ", posicionX="
                + posicionX + ", posicionY=" + posicionY + "]";
    }

    
}
