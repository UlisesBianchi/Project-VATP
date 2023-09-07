package com.example.VATP.controller;

import com.example.VATP.model.Producto;
import com.example.VATP.service.ProductoService;
import com.example.VATP.utils.SearchRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;


@RestController
@RequestMapping("/search")
public class SearchController {

    @Autowired
    private ProductoService productoService;

    @PostMapping("/availability")
    public ResponseEntity<List<Producto>> searchByDay(@RequestBody SearchRequest searchRequest) {
        LocalDate date = searchRequest.getDate();
        List<Producto> products = productoService.findAvailableProductsByDay(date);
        return ResponseEntity.ok(products);
    }

    @PostMapping("/keywords")
    public ResponseEntity<List<Producto>> searchByKeywords(@RequestBody SearchRequest searchRequest) {
        String keywords = searchRequest.getKeywords();
        List<Producto> products = productoService.findProductsByKeywords(keywords);
        return ResponseEntity.ok(products);
    }

}