package com.example.mm.fragments;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.fragment.app.Fragment;

import com.bumptech.glide.Glide;
import com.example.mm.R;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;

/**
 * A simple {@link Fragment} subclass.
 */
public class usuariosFragment extends Fragment {

    public usuariosFragment() {
        // Required empty public constructor
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        final FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();

        View view = inflater.inflate(R.layout.fragment_chats, container, false);

        TextView tv_user = view.findViewById(R.id.tv_user);
        ImageView img_user = view.findViewById(R.id.img_user);

        assert user!=null;
        tv_user.setText(user.getDisplayName());
        Glide.with(this).load(user.getPhotoUrl()).into(img_user);


        return view;
    }
}