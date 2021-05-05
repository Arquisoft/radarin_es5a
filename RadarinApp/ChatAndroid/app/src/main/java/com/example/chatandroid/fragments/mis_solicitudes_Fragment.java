package com.example.chatandroid.fragments;

import android.content.Intent;
import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.chatandroid.MapaActivity;
import com.example.chatandroid.R;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link mis_solicitudes_Fragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class mis_solicitudes_Fragment extends Fragment {

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    public mis_solicitudes_Fragment() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment mis_solicitudes_Fragment.
     */
    // TODO: Rename and change types and number of parameters
    public static mis_solicitudes_Fragment newInstance(String param1, String param2) {
        mis_solicitudes_Fragment fragment = new mis_solicitudes_Fragment();
        Bundle args = new Bundle();
        args.putString(ARG_PARAM1, param1);
        args.putString(ARG_PARAM2, param2);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            mParam1 = getArguments().getString(ARG_PARAM1);
            mParam2 = getArguments().getString(ARG_PARAM2);
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment

        //Intent intent = new Intent(getActivity(), MapaActivity.class);
        //startActivity(intent);
        return inflater.inflate(R.layout.fragment_mis_solicitudes_, container, false);

    }

    public void irAMapa(View view) {
        Intent intent = new Intent(getActivity(), MapaActivity.class);
        startActivity(intent);
        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_CLEAR_TASK | Intent.FLAG_ACTIVITY_NEW_TASK);
        startActivity(intent);
    }


  /*  @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View v = inflater.inflate(R.layout.fragment_principal, container, false);

        TextView tv = v.findViewById(R.id.textview)

        Intent intent = new Intent(getActivity(), MainActivity.class);
        startActivity(intent);

        return v;
    } */

  /*  public void irAMapa(View view) {
        Intent i = new Intent(this, mapaAc
        i.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_CLEAR_TASK | Intent.FLAG_ACTIVITY_NEW_TASK);
        startActivity(i);
    } */
}