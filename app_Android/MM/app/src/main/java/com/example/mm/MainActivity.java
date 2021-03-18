package com.example.mm;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import com.firebase.ui.auth.AuthUI;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;

import java.util.Arrays;
import java.util.List;

public class MainActivity extends AppCompatActivity {
    private FirebaseAuth mfireBaseAuth;
    private FirebaseAuth.AuthStateListener mautListener;
    public static final int SIGN_IN = 1;

    List<AuthUI.IdpConfig> providers = Arrays.asList(
            new AuthUI.IdpConfig.GoogleBuilder().build());

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        setTheme(R.style.SpashTheme);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mfireBaseAuth = FirebaseAuth.getInstance();
        mautListener = new FirebaseAuth.AuthStateListener() {
            @Override
            public void onAuthStateChanged(@NonNull FirebaseAuth firebaseAuth) {
                FirebaseUser user = firebaseAuth.getCurrentUser();
                if(user != null){
                    vamosAHome();
                    Toast.makeText(com.example.mm.MainActivity.this, "Login con éxito", Toast.LENGTH_SHORT).show();
                } else {
                    startActivityForResult(
                            AuthUI.getInstance()
                            .createSignInIntentBuilder()
                            .setAvailableProviders(providers)
                            .setIsSmartLockEnabled(false)
                            .build(), SIGN_IN
                    );
                }
            }
        };
    } //Fin onCreate

    @Override
    protected void onResume() {
        super.onResume();
        mfireBaseAuth.addAuthStateListener(mautListener);
    }

    @Override
    protected void onPause() {
        super.onPause();
        mfireBaseAuth.removeAuthStateListener(mautListener);
    }

    private void vamosAHome() {
        Intent i = new Intent(this, com.example.mm.homeActivity.class);
        i.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_CLEAR_TASK | Intent.FLAG_ACTIVITY_NEW_TASK);
        startActivity(i);
    }
}