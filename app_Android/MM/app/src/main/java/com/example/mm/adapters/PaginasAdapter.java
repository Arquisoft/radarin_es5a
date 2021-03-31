package com.example.mm.adapters;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentActivity;
import androidx.viewpager2.adapter.FragmentStateAdapter;

import com.example.mm.fragments.chatsFragment;
import com.example.mm.fragments.mis_solicitudes_Fragment;
import com.example.mm.fragments.solicitudesFragment;
import com.example.mm.fragments.usuariosFragment;

public class PaginasAdapter extends FragmentStateAdapter {

    public PaginasAdapter(@NonNull FragmentActivity fragmentActivity) {
        super(fragmentActivity);
    }

    @NonNull
    @Override
    public Fragment createFragment(int position) {

        switch (position) {
            case 0:
                return new usuariosFragment();
            case 1:
                return new chatsFragment();
            case 2:
                return new solicitudesFragment();
            case 3:
                return new mis_solicitudes_Fragment();
            default:
                return new usuariosFragment();
        }
    }

    @Override
    public int getItemCount() {
        return 4; //Tenemos 4 fragments
    }
}