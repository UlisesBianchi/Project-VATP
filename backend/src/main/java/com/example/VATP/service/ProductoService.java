package com.example.VATP.service;

import com.example.VATP.dto.ProductoRequestDTO;
import com.example.VATP.model.Categoria;
import com.example.VATP.model.Producto;
import com.example.VATP.repository.ProductoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductoService {
    private final ProductoRepository productoRepository;

    @Autowired
    public ProductoService(ProductoRepository productoRepository, CategoriaService categoriaService) {
        this.productoRepository = productoRepository;
    }

    public List<Producto> obtenerTodos() {
        return productoRepository.findAll();
    }

    public Optional<Producto> obtenerPorId(Integer id) {
        return productoRepository.findById(id);
    }

    public Producto guardarProducto(ProductoRequestDTO productoRequestDTO) {
        Producto newProducto = new Producto();
        newProducto.setNombre(productoRequestDTO.getNombre());
        newProducto.setPrecio(productoRequestDTO.getPrecio());
        newProducto.setDescripcion(productoRequestDTO.getDescripcion());

        // If images are provided, add them to the product
        List<String> images = productoRequestDTO.getImages();
        if (images != null && !images.isEmpty()) {
            for (String imageUrl : images) {
                newProducto.addImage(imageUrl);
            }
        }

        // Save the product with images to the repository
        return productoRepository.save(newProducto);
    }

    public void eliminarProducto(Integer id) {
        productoRepository.deleteById(id);
    }

    public Producto actualizarProducto(Integer id, ProductoRequestDTO productoRequestDTO) {
        Optional<Producto> existingProducto = obtenerPorId(id);
        if (existingProducto.isPresent()) {
            Producto producto = existingProducto.get();
            producto.setNombre(productoRequestDTO.getNombre());
            producto.setPrecio(productoRequestDTO.getPrecio());
            producto.setDescripcion(productoRequestDTO.getDescripcion());
            // Update other fields as needed

            // If images are provided, add them to the product
            List<String> images = productoRequestDTO.getImages();
            if (images != null && !images.isEmpty()) {
                for (String imageUrl : images) {
                    producto.addImage(imageUrl);
                }
            }

            return productoRepository.save(producto);
        } else {
            throw new EntityNotFoundException("Producto not found with ID: " + id);
        }
    }}
