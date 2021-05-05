package com.example.chatandroid.Info;

public class Chats {

    private String id;
    private String envia;
    private String recibe;
    private String mensaje;
    private String visto;
    private String fecha;
    private String hora;

    public Chats() {
    }

    public Chats(String id, String envia, String recibe, String mensaje, String visto, String fecha, String hora) {
        this.id = id;
        this.envia = envia;
        this.recibe = recibe;
        this.mensaje = mensaje;
        this.visto = visto;
        this.fecha = fecha;
        this.hora = hora;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEnvia() {
        return envia;
    }

    public void setEnvia(String envia) {
        this.envia = envia;
    }

    public String getRecibe() {
        return recibe;
    }

    public void setRecibe(String recibe) {
        this.recibe = recibe;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }

    public String getVisto() {
        return visto;
    }

    public void setVisto(String visto) {
        this.visto = visto;
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
