package com.example.VATP.service;

import com.example.VATP.model.ProductImage;
import com.example.VATP.model.Producto;
import com.example.VATP.repository.ProductImageRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductImageService {

    private final ProductImageRepository productImageRepository;
    private final ProductoService productoService;

    @Autowired
    public ProductImageService(ProductImageRepository productImageRepository, ProductoService productoService) {
        this.productImageRepository = productImageRepository;
        this.productoService = productoService;
    }

    public ProductImage guardarImagen(ProductImage productImage) {
        Producto producto = productImage.getProducto();

        if (producto != null && producto.getId() != null) {
            Producto existingProduct = productoService.obtenerPorId(producto.getId())
                    .orElseThrow(() -> new EntityNotFoundException("Product not found with ID: " + producto.getId()));

            productImage.setProducto(existingProduct);
        }

        return productImageRepository.save(productImage);
    }

    public List<ProductImage> obtenerTodas() {
        return productImageRepository.findAll();
    }

    public Optional<ProductImage> obtenerPorId(Integer id) {
        return productImageRepository.findById(id);
    }

    public void eliminarImagen(Integer id) {
        productImageRepository.deleteById(id);
    }

    public ProductImage actualizarImagen(ProductImage productImage) {
        return productImageRepository.save(productImage);
    }
    public ProductImage associateImageWithProduct(Integer imageId, Integer productId) {
        ProductImage productImage = productImageRepository.findById(imageId)
                .orElseThrow(() -> new EntityNotFoundException("Product Image not found with ID: " + imageId));

        Producto producto = productoService.obtenerPorId(productId)
                .orElseThrow(() -> new EntityNotFoundException("Product not found with ID: " + productId));

        productImage.setProducto(producto);

        return productImageRepository.save(productImage);
    }
}


