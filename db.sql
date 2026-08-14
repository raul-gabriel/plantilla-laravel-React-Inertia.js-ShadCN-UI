DROP DATABASE IF EXISTS laravel_inertia_tailwind_boilerplate;
CREATE DATABASE laravel_inertia_tailwind_boilerplate 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_general_ci;
USE laravel_inertia_tailwind_boilerplate;

/*
INSERT INTO usuarios (nombres, celular, dni, rol, correo, password, estado) VALUES 
('Administrador del Sistema', '987654321', '12345678', 'administrador', 'admin@gmail.com', SHA2('123456', 256), 'activo');
*/  

DROP TABLE IF EXISTS usuarios;
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombres VARCHAR(255) NOT NULL,
    celular VARCHAR(9),
    dni VARCHAR(8) NOT NULL,
    rol ENUM('administrador', 'editor') DEFAULT 'editor',
    correo VARCHAR(50) NOT NULL,
    password VARCHAR(300) NOT NULL,
    estado ENUM('activo', 'inactivo') DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- tabla ejemplo:
CREATE TABLE libros (
    id int AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL,
    anio_publicacion YEAR,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);

DROP PROCEDURE IF EXISTS sp_crear_libro;
DELIMITER //
CREATE PROCEDURE sp_crear_libro(IN p_titulo VARCHAR(255),IN p_autor VARCHAR(255),IN p_anio_publicacion YEAR)
BEGIN
    IF NOT EXISTS (SELECT 1 FROM libros WHERE titulo = p_titulo AND autor = p_autor ) THEN
        INSERT INTO libros (titulo, autor, anio_publicacion, created_at, updated_at)
        VALUES (p_titulo, p_autor, p_anio_publicacion, NOW(), NOW());

        SELECT 'success' AS status, 'Libro creado correctamente.' AS message;
    ELSE
        SELECT 'error' AS status, 'Ya existe un libro con ese título del mismo autor.' AS message;
    END IF;
END //
DELIMITER ;


DROP PROCEDURE IF EXISTS sp_actualizar_libro;
DELIMITER //

CREATE PROCEDURE sp_actualizar_libro(IN p_id INT,IN p_titulo VARCHAR(255),IN p_autor VARCHAR(255),IN p_anio_publicacion YEAR)
BEGIN
    IF NOT EXISTS (SELECT 1 FROM libros WHERE titulo = p_titulo AND autor = p_autor AND id <> p_id) THEN
        UPDATE libros
        SET titulo = p_titulo,autor = p_autor, anio_publicacion = p_anio_publicacion,updated_at = NOW()
        WHERE id = p_id;

        SELECT 'success' AS status, 'Libro actualizado correctamente.' AS message;
    ELSE
        SELECT 'error' AS status, 'Ya existe otro libro con ese título del mismo autor.' AS message;
    END IF;
END //
DELIMITER ;