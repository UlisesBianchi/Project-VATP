package com.example.VATP.controller;

import com.example.VATP.model.ProductImage;
import com.example.VATP.service.ProductImageService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/productImages")
public class ProductImageController {

    private final ProductImageService productImageService;

    @Autowired
    public ProductImageController(ProductImageService productImageService) {
        this.productImageService = productImageService;
    }

    @PostMapping
    public ProductImage createProductImage(@RequestBody ProductImage productImage) {
        return productImageService.guardarImagen(productImage);
    }

    @GetMapping
    public List<ProductImage> getAllProductImages() {
        return productImageService.obtenerTodas();
    }

    @GetMapping("/{id}")
    public ProductImage getProductImageById(@PathVariable Integer id) {
        return productImageService.obtenerPorId(id)
                .orElseThrow(() -> new EntityNotFoundException("Product Image not found with ID: " + id));
    }

    @PutMapping("/{id}")
    public ProductImage updateProductImage(@PathVariable Integer id, @RequestBody ProductImage updatedImage) {
        ProductImage existingImage = productImageService.obtenerPorId(id)
                .orElseThrow(() -> new EntityNotFoundException("Product Image not found with ID: " + id));

        existingImage.setImageUrl(updatedImage.getImageUrl());
        // Update other fields as needed

        return productImageService.actualizarImagen(existingImage);
    }

    @DeleteMapping("/{id}")
    public void deleteProductImage(@PathVariable Integer id) {
        productImageService.eliminarImagen(id);
    }



    @PostMapping("/{imageId}/associateWithProduct/{productId}")
    public ProductImage associateImageWithProduct(
            @PathVariable Integer imageId,
            @PathVariable Integer productId
    ) {
        return productImageService.associateImageWithProduct(imageId, productId);
    }






}
