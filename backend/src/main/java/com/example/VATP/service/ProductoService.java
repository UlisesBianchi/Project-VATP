package com.example.VATP.service;

import com.example.VATP.model.Categoria;
import com.example.VATP.model.Producto;
import com.example.VATP.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductoService {
    private final ProductoRepository productoRepository;
    private final CategoriaService categoriaService;

    @Autowired
    public ProductoService(ProductoRepository productoRepository, CategoriaService categoriaService) {
        this.productoRepository = productoRepository;
        this.categoriaService = categoriaService;
    }

    public List<Producto> obtenerTodos() {
        return productoRepository.findAll();
    }

    public Optional<Producto> obtenerPorId(Integer id) {
        return productoRepository.findById(id);
    }

/*
    public Producto guardarProducto (Producto producto){
        return productoRepository.save(producto);
    }
*/


    public Producto guardarProducto(Producto p) {

        Categoria categoria = p.getCategoria();

        if (categoria !=null && categoria.getId() != null) {
            Integer categoriaId = categoria.getId();
            Categoria existingCategoria = categoriaService.obtenerCatPorId(categoriaId)
                    .orElseThrow(() -> new IllegalArgumentException("Invalid categoria ID provided"));

            p.setCategoria(existingCategoria);
        }

        return productoRepository.save(p);
    }



    public void eliminarProducto(Integer id) {
        productoRepository.deleteById(id);
    }

    public void eliminarTodosProducto() {
        productoRepository.deleteAll();}



    public Producto actualizarProducto(Producto p) {
        return productoRepository.save(p);
    }
}