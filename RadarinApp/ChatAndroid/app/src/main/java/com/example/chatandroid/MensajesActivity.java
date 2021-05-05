package com.example.chatandroid;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.example.chatandroid.Info.Chats;
import com.example.chatandroid.Info.Estado;
import com.example.chatandroid.adapters.AdapterChats;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;

import de.hdodenhof.circleimageview.CircleImageView;

public class MensajesActivity extends AppCompatActivity {

    CircleImageView img_user;
    TextView username;
    ImageView ic_conectado, ic_desconectado;
    SharedPreferences mPref;

    FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();
    FirebaseDatabase database = FirebaseDatabase.getInstance();
    DatabaseReference ref_estado = database.getReference("Estado").child(user.getUid());
    DatabaseReference ref_chat = database.getReference("Chats");

    EditText et_mensaje_txt;
    ImageButton btn_enviar_msj;

    //ID CHAT GLOBAL
    String id_chat_global;
    Boolean amigoOnline = false;

    //RV...
    RecyclerView rv_chats;
    AdapterChats adapter;
    ArrayList<Chats> chatList;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_mensajes);

        Toolbar toolbar = findViewById(R.id.toolbar);
        //setSupportActionBar(toolbar);
        getSupportActionBar().setTitle("");
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        mPref = getApplicationContext().getSharedPreferences("usuario_sp", MODE_PRIVATE);
        img_user = findViewById(R.id.img_user);
        username = findViewById(R.id.tv_user);
        ic_conectado = findViewById(R.id.icon_conectado);
        ic_desconectado = findViewById(R.id.icon_desconectado);

        String usuario = getIntent().getExtras().getString("nombre");
        String foto = getIntent().getExtras().getString("img_user");
        String id_user = getIntent().getExtras().getString("id_user");
        id_chat_global = getIntent().getExtras().getString("id_unico");

        colocarEnVisto();

        et_mensaje_txt = findViewById(R.id.et_txt_mensaje);
        btn_enviar_msj = findViewById(R.id.btn_enviar_msj);
        btn_enviar_msj.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                String msj = et_mensaje_txt.getText().toString();

                if (!msj.isEmpty()) {
                    final Calendar c = Calendar.getInstance();
                    final SimpleDateFormat dateFormat = new SimpleDateFormat("dd/mm/yyyy");
                    final SimpleDateFormat timeFormat = new SimpleDateFormat("HH:mm");
                    String idPush = ref_chat.push().getKey();

                    if(amigoOnline){
                        Chats chatmsj = new Chats(idPush,user.getUid(), id_user, msj, "SI", dateFormat.format(c.getTime()), timeFormat.format(c.getTime()));
                        ref_chat.child(id_chat_global).child(idPush).setValue(chatmsj);
                        Toast.makeText(MensajesActivity.this, "Mensaje enviado", Toast.LENGTH_SHORT).show();
                        et_mensaje_txt.setText("");
                    } else {
                        Chats chatmsj = new Chats(idPush,user.getUid(), id_user, msj, "NO", dateFormat.format(c.getTime()), timeFormat.format(c.getTime()));
                        ref_chat.child(id_chat_global).child(idPush).setValue(chatmsj);
                        Toast.makeText(MensajesActivity.this, "Mensaje enviado", Toast.LENGTH_SHORT).show();
                        et_mensaje_txt.setText("");
                    }

                } else {
                    Toast.makeText(MensajesActivity.this, "El mensaje está vacío!", Toast.LENGTH_SHORT).show();
                }

            }
        });

        final String id_user_sp = mPref.getString("usuario_sp", "");

        username.setText(usuario);
        Glide.with(this).load(foto).into(img_user);

        final DatabaseReference ref = database.getReference("Estado").child(id_user_sp).child("chatcon");
        ref.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                String chatcon = dataSnapshot.getValue(String.class);
                if(dataSnapshot.exists()){
                    if(chatcon.equals(user.getUid())){
                        amigoOnline = true;
                        ic_conectado.setVisibility(View.VISIBLE);
                        ic_desconectado.setVisibility(View.GONE);
                    } else {
                        amigoOnline = false;
                        ic_desconectado.setVisibility(View.VISIBLE);
                        ic_conectado.setVisibility(View.GONE);
                    }
                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {

            }
        });


        //RV ....

        rv_chats = findViewById(R.id.rv);
        rv_chats.setHasFixedSize(true);
        LinearLayoutManager linearLayoutManager = new LinearLayoutManager(this);
        linearLayoutManager.setStackFromEnd(true);
        rv_chats.setLayoutManager(linearLayoutManager);

        chatList = new ArrayList<>();
        adapter = new AdapterChats(chatList,this);
        rv_chats.setAdapter(adapter);

        leerMensajes();


    } //Fin de OnCreate

    private void colocarEnVisto() {
        ref_chat.child(id_chat_global).addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                for(DataSnapshot snapshot: dataSnapshot.getChildren()){
                    Chats chats = snapshot.getValue(Chats.class);
                    if(chats.getRecibe().equals(user.getUid())){
                        ref_chat.child(id_chat_global).child(chats.getId()).child("visto").setValue("SI");
                    }
                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {

            }
        });
    }

    private void leerMensajes() {
        ref_chat.child(id_chat_global).addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {

                if(dataSnapshot.exists()){
                    chatList.removeAll(chatList);
                    for(DataSnapshot snapshot: dataSnapshot.getChildren()){
                        Chats chat = snapshot.getValue(Chats.class);
                        chatList.add(chat);
                        rv_chats.scrollToPosition(adapter.getItemCount()-1); //Para tener el ultimo mensaje
                    }
                    adapter.notifyDataSetChanged();
                }
            }
            @Override
            public void onCancelled(@NonNull DatabaseError error) {

            }
        });
    }




    private void estadoUsuario(String estado) {
        ref_estado.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                final String id_user_sp = mPref.getString("usuario_sp", "");
                Estado est = new Estado(estado, "", "", "");
                ref_estado.setValue(est);
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {

            }
        });
    }

    @Override
    protected void onResume() {
        super.onResume();
        estadoUsuario("conectado");
    }

    @Override
    protected void onPause() {
        super.onPause();
        estadoUsuario("desconectado");
        dameUltimaFecha();
    }

    private void dameUltimaFecha() {
        Calendar c = Calendar.getInstance();
        SimpleDateFormat timeFormat = new SimpleDateFormat("HH:mm");
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");

        ref_estado.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                ref_estado.child("fecha").setValue(dateFormat.format(c.getTime()));
                ref_estado.child("hora").setValue(timeFormat.format(c.getTime()));
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {

            }
        });
    }
}