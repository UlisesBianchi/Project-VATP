package com.example.VATP.repository;

import com.example.VATP.model.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;



public interface ProductImageRepository extends JpaRepository<ProductImage, Integer> {
}