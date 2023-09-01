package com.example.VATP.repository;

import com.example.VATP.model.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface ProductImageRepository extends JpaRepository<ProductImage, Integer> {
}