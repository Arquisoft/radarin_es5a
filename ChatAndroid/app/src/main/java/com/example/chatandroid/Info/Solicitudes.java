package com.example.chatandroid.Info;

public class Solicitudes {

    String estado;
    String idchat;

    public Solicitudes() {
    }

    public Solicitudes(String estado, String idchat) {
        this.estado = estado;
        this.idchat = idchat;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getIdchat() {
        return idchat;
    }

    public void setIdchat(String idchat) {
        this.idchat = idchat;
    }
}
