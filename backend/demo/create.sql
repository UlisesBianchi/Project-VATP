CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    precio DOUBLE NOT NULL,
    descripcion VARCHAR(50) NOT NULL
);

INSERT INTO productos (nombre, precio, descripcion) VALUES ('Auto', 100, 'ferrari');
INSERT INTO productos (nombre, precio, descripcion) VALUES ('Casa', 200, 'chalet');
INSERT INTO productos (nombre, precio, descripcion) VALUES ('Avion', 300, 'boeing');