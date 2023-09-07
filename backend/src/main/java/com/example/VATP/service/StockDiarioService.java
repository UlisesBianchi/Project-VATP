package com.example.VATP.service;

import com.example.VATP.model.Producto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StockDiarioService {
    @Autowired
    private ProductoService productoService;

    // Scheduled task to replenish stock daily at midnight
    @Scheduled(cron = "0 0 0 * * *") // Run every day at midnight
    public void replenishDailyStock() {
        List<Producto> productos = productoService.obtenerTodos();

        for (Producto producto : productos) {
            productoService.replenishStock(producto);
        }
    }
}