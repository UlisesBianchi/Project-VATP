package com.example.VATP.service;

import com.example.VATP.dto.ProductoRequestDTO;
import com.example.VATP.model.CaracteristicasProducto;
import com.example.VATP.model.Categoria;
import com.example.VATP.model.Producto;
import com.example.VATP.model.ProductoDisponibilidad;
import com.example.VATP.repository.ProductoDisponibilidadRepository;
import com.example.VATP.repository.ProductoRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class ProductoService {
    private final ProductoRepository productoRepository;
    private final CategoriaService categoriaService;


    @PersistenceContext
    private final EntityManager entityManager;
    private final ProductoDisponibilidadRepository productoDisponibilidadRepository;

    @Autowired
    public ProductoService(ProductoRepository productoRepository, CategoriaService categoriaService, EntityManager entityManager, ProductoDisponibilidadRepository productoDisponibilidadRepository) {
        this.productoRepository = productoRepository;
        this.categoriaService = categoriaService;
        this.entityManager = entityManager;
        this.productoDisponibilidadRepository = productoDisponibilidadRepository;
    }

    public List<Producto> obtenerTodos() {
        return productoRepository.findAll();
    }

    public Optional<Producto> obtenerPorId(Integer id) {
        return productoRepository.findById(id);
    }


    public List<Producto> findAvailableProductsByDay(LocalDate date) {
        // Query products with available units for the specified date
        // Assuming you have a 'product_availability' table with columns 'product_id', 'date', and 'available_units'

        // Example using JPQL (Java Persistence Query Language)
        String jpqlQuery = "SELECT p FROM Producto p " +
                "WHERE EXISTS (" +
                "   SELECT a FROM ProductoDisponibilidad a " +
                "   WHERE a.producto = p AND a.date = :date AND a.availableUnits > 0" +
                ")";

        TypedQuery<Producto> query = entityManager.createQuery(jpqlQuery, Producto.class);
        query.setParameter("date", date);

        return query.getResultList();
    }

    public List<Producto> findProductsByKeywords(String keywords) {
        // Query products where product name or description contains the specified keywords

        // Example using JPQL (Java Persistence Query Language)
        String jpqlQuery = "SELECT p FROM Producto p " +
                "WHERE LOWER(p.nombre) LIKE LOWER(:keywords) OR LOWER(p.descripcion) LIKE LOWER(:keywords)";

        TypedQuery<Producto> query = entityManager.createQuery(jpqlQuery, Producto.class);
        query.setParameter("keywords", "%" + keywords + "%");

        return query.getResultList();
    }


    public Producto guardarProducto(ProductoRequestDTO productoRequestDTO) {
        Producto newProducto = new Producto();
        newProducto.setNombre(productoRequestDTO.getNombre());
        newProducto.setPrecio(productoRequestDTO.getPrecio());
        newProducto.setDescripcion(productoRequestDTO.getDescripcion());



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

        List<CaracteristicasProducto> characteristics = productoRequestDTO.getCaracteristicasProductos();
        if (characteristics != null && !characteristics.isEmpty()) {
            for (CaracteristicasProducto caracteristicasProducto : characteristics) {
                newProducto.addCaracteristica(caracteristicasProducto);
            }
        }

        Producto productoGuardado = productoRepository.save(newProducto);
        LocalDate startDate = LocalDate.now();
        int stockInicial = 5;
        int daysToCreateAvailability = 365;

        while (daysToCreateAvailability > 0) {
            ProductoDisponibilidad disponibilidad = new ProductoDisponibilidad();
            disponibilidad.setProducto(newProducto);
            disponibilidad.setDate(startDate);
            disponibilidad.setAvailableUnits(stockInicial);
            productoDisponibilidadRepository.save(disponibilidad);
            startDate = startDate.plusDays(1);
            daysToCreateAvailability--;
    }
        return productoGuardado;


        // Save the product with images and category to the repository
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
