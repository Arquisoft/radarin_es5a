package com.example.chatandroid.Info;

public class Estado {
    String estado;
    String fecha;
    String hora;
    String chatcon;

    public Estado() {
    }

    public Estado(String estado, String fecha, String hora, String chatcon) {
        this.estado = estado;
        this.fecha = fecha;
        this.hora = hora;
        this.chatcon = chatcon;
    }

    public String getChatcon() {
        return chatcon;
    }

    public void setChatcon(String chatcon) {
        this.chatcon = chatcon;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getFecha() {
        return fecha;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public String getHora() {
        return hora;
    }

    public void setHora(String hora) {
        this.hora = hora;
    }
}
