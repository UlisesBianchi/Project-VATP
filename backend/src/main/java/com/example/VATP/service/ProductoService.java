package com.example.VATP.service;

import com.example.VATP.dto.ProductoRequestDTO;
import com.example.VATP.model.Categoria;
import com.example.VATP.model.Producto;
import com.example.VATP.model.ProductoDisponibilidad;
import com.example.VATP.repository.ProductoDisponibilidadRepository;
import com.example.VATP.repository.ProductoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class ProductoService {
    private final ProductoRepository productoRepository;
    private final CategoriaService categoriaService;

    private final ProductoDisponibilidadRepository productoDisponibilidadRepository;

    @Autowired
    public ProductoService(ProductoRepository productoRepository, CategoriaService categoriaService, ProductoDisponibilidadRepository productoDisponibilidadRepository) {
        this.productoRepository = productoRepository;
        this.categoriaService = categoriaService;
        this.productoDisponibilidadRepository = productoDisponibilidadRepository;
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

        // Set the initial stock to 5 for new products
        newProducto.setStockDiario(5);

        // Fetch the Categoria object from the CategoriaService
        Categoria categoria = productoRequestDTO.getCategoria();
        if (categoria != null && categoria.getId() != null) {
            final Categoria finalCategoria = categoria; // Create a final variable
            categoria = categoriaService.obtenerCatPorId(categoria.getId())
                    .orElseThrow(() -> new NoSuchElementException("Category not found with ID: " + finalCategoria.getId()));
            newProducto.setCategoria(categoria);
        }

        // If images are provided, add them to the product
        List<String> images = productoRequestDTO.getImages();
        if (images != null && !images.isEmpty()) {
            for (String imageUrl : images) {
                newProducto.addImage(imageUrl);
            }
        }

        // Save the product with images and category to the repository
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
    }

    public void replenishStock(Producto producto) {
        producto.setStockDiario(5);
        productoRepository.save(producto);
    }
    public Optional<ProductoDisponibilidad> getProductAvailability(Producto producto, LocalDate date) {
        // Query the database to find availability for the product and date

        return productoDisponibilidadRepository.findByProductoAndDate(producto, date);
    }
    public void decrementAvailability(ProductoDisponibilidad availability) {
        // Check if the availability record exists
        if (availability != null) {
            // Get the current available units
            int currentUnits = availability.getAvailableUnits();

            // Check if there are available units to decrement
            if (currentUnits > 0) {
                // Decrement the available units
                availability.setAvailableUnits(currentUnits - 1);

                // Update the availability record in the database
                productoDisponibilidadRepository.save(availability);
            }
        }
    }
}
