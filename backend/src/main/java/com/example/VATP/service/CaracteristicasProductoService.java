package com.example.VATP.service;


import com.example.VATP.model.CaracteristicasProducto;
import com.example.VATP.model.Producto;
import com.example.VATP.repository.CaracteristicasProductoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CaracteristicasProductoService {


    private final CaracteristicasProductoRepository caracteristicasProductoRepository;

    private final ProductoService productoService;

    @Autowired
    public CaracteristicasProductoService(CaracteristicasProductoRepository caracteristicasProductoRepository, ProductoService productoService) {
        this.caracteristicasProductoRepository = caracteristicasProductoRepository;
        this.productoService = productoService;
    }

    public CaracteristicasProducto guardarCaracteristicas(CaracteristicasProducto caracteristicasProducto) {

        Producto producto = caracteristicasProducto.getProducto();

        if (producto != null && producto.getId() != null) {
            Producto productoExistente = productoService.obtenerPorId(producto.getId())
                    .orElseThrow(() -> new EntityNotFoundException("Product not found with ID: " + producto.getId()));
            caracteristicasProducto.setProducto(productoExistente);
        }
        return caracteristicasProductoRepository.save(caracteristicasProducto);
    }

    public List<CaracteristicasProducto> obtenerTodas() {
        return caracteristicasProductoRepository.findAll();
    }

    public Optional<CaracteristicasProducto> obtenerPorId(Integer id) {
        return caracteristicasProductoRepository.findById(id);
    }

    public void eliminarCaracteristica(Integer id) {
        caracteristicasProductoRepository.deleteById(id);
    }


    public CaracteristicasProducto actualizarCaracteristicas(CaracteristicasProducto caracteristicasProducto) {
        return caracteristicasProductoRepository.save(caracteristicasProducto);
    }


    public CaracteristicasProducto asociacionCaracteristicaConProducto(Integer caracteristicaId, Integer productoId) {
        CaracteristicasProducto caracteristicasProducto = caracteristicasProductoRepository.findById(caracteristicaId)
                .orElseThrow(() -> new EntityNotFoundException("Product Image not found with ID: " + caracteristicaId));

        Producto producto = productoService.obtenerPorId(productoId)
                .orElseThrow(() -> new EntityNotFoundException("Product not found with ID: " + productoId));

        caracteristicasProducto.setProducto(producto);

        return caracteristicasProductoRepository.save(caracteristicasProducto);

    }

}
