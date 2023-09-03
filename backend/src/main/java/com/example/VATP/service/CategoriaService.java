package com.example.VATP.service;

import com.example.VATP.model.Categoria;

import com.example.VATP.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriaService {
    private final CategoriaRepository categoriaRepository;

    @Autowired
    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }


    public List<Categoria> obtenerTodas() {
        return categoriaRepository.findAll();
    }

    public Optional<Categoria> obtenerCatPorId(Integer id) {
        return categoriaRepository.findById(id);
    }

    public Categoria guardarCategoria(Categoria c) {
        return categoriaRepository.save(c);
    }

    public void eliminarCategoria(Integer id) {
        categoriaRepository.deleteById(id);
    }


    public Categoria actualizarCategoria(Categoria c) {
        return categoriaRepository.save(c);
    }
}