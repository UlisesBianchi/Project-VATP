package com.example.VATP.controller;


import com.example.VATP.model.CaracteristicasProducto;
import com.example.VATP.service.CaracteristicasProductoService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/caracteristicas")
public class CaracteristicasController {

    private final CaracteristicasProductoService caracteristicasProductoService;

    @Autowired
    public CaracteristicasController(CaracteristicasProductoService caracteristicasProductoService) {
        this.caracteristicasProductoService = caracteristicasProductoService;
    }

    @PostMapping
    public CaracteristicasProducto crearCaracteristicas (@RequestBody CaracteristicasProducto caracteristicasProducto){
        return  caracteristicasProductoService.guardarCaracteristicas(caracteristicasProducto);
    }

    @GetMapping
    public List<CaracteristicasProducto> getAllCaracteristicas() {
        return caracteristicasProductoService.obtenerTodas();
    }

    @GetMapping("/{id}")
    public CaracteristicasProducto getCaracteristicaById(@PathVariable Integer id) {
        return caracteristicasProductoService.obtenerPorId(id)
                .orElseThrow(() -> new EntityNotFoundException("Product Image not found with ID: " + id));
    }

    @PutMapping("/{id}")
    public CaracteristicasProducto updateCaracteristicas(@PathVariable Integer id, @RequestBody CaracteristicasProducto updatedCaracteristica) {
        CaracteristicasProducto caracteristicaExistente = caracteristicasProductoService.obtenerPorId(id)
                .orElseThrow(() -> new EntityNotFoundException("Product Image not found with ID: " + id));

        caracteristicaExistente.setImagenUrl(updatedCaracteristica.getImagenUrl());
        // se agrega para tambien setear el nombre
        caracteristicaExistente.setNombre(updatedCaracteristica.getNombre());

        return caracteristicasProductoService.actualizarCaracteristicas(caracteristicaExistente);
    }


    @DeleteMapping("/{id}")
    public void deleteCaracteristicas(@PathVariable Integer id) {
        caracteristicasProductoService.eliminarCaracteristica(id);
    }



    @PostMapping("/{caracteristicaId}/asociacionCaracteristicaConProducto/{productId}")
    public CaracteristicasProducto asociacionCaracteristicaConProducto(
            @PathVariable Integer caracteristicaId,
            @PathVariable Integer productId
    ) {
        return caracteristicasProductoService.asociacionCaracteristicaConProducto(caracteristicaId, productId);
    }



}



