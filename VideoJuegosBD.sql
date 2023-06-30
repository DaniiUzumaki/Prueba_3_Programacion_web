
-- estructura de base de datos para videojuegos
CREATE DATABASE IF NOT EXISTS `videojuegos` ;
USE `videojuegos`;

-- estructura para tabla videojuegos.plataforma
CREATE TABLE IF NOT EXISTS `plataforma` (
  `id_plat` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `id_user` int(11) NOT NULL,
  PRIMARY KEY (`id_plat`) USING BTREE,
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- datos para la tabla videojuegos.plataforma: 
DELETE FROM `plataforma`;
INSERT INTO `plataforma` (`id_plat`, `nombre`, `id_user`) VALUES
	(1, 'Playstation', 1),
	(2, 'Nintendo', 1);

-- estructura para tabla videojuegos.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(64) DEFAULT NULL,
  `apellido` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `user` varchar(16) DEFAULT NULL,
  `password` varchar(64) DEFAULT NULL,
  `activo` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id_user`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- datos para la tabla videojuegos.usuario:
DELETE FROM `usuario`;
INSERT INTO `usuario` (`id_user`, `nombre`, `apellido`, `user`, `password`, `activo`) VALUES
	(1, 'Daniel', 'San Martin', 'dsanmartin', '$2b$10$zFiAinRv6QQTTHMkNlsNfexed0IRfwe4OT6zHI8kXoi.DlouWSi9G', 1),
	(2, 'Julio', 'Soto', 'jsoto', '$2b$10$XwOB1UjB.9S8A5IZKKne8ekCQuIFR7DrU7HCYjF516y1EZX3mOQWq', 1);

-- estructura para tabla videojuegos.videojuegos
CREATE TABLE IF NOT EXISTS `videojuegos` (
  `id_game` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(50) NOT NULL,
  `descripcion` text NOT NULL,
  `id_plat` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  PRIMARY KEY (`id_game`) USING BTREE,
  UNIQUE KEY `titulo` (`titulo`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- datos para la tabla videojuegos.videojuegos:
DELETE FROM `videojuegos`;
INSERT INTO `videojuegos` (`id_game`, `titulo`, `descripcion`, `id_plat`, `id_user`) VALUES
	(1, 'Final Fantasy XVI', ' Juegos de rol...', 1, 1),
	(2, 'Super Mario Bros', ' Juegos estilo Libre...', 2, 1);

-- APUNTES RELEVANTES---------

--  agregar juego
--        {
--             "id_game": 4,
--             "titulo": " Pokemon Moon",
--             "descripcion": "Juego de aventuras y mundo abierto",
--             "id_plat": 5
--         }

-- formato para agregar usuario:
--    {
--             "id_user": 4,
--             "nombre": "Clive",
--             "apellido": "Rosfield",
--             "user": "crosfield",
--             "password": "$2b$10$C8b6531hFsVcsFnbxYWkS.Ea0bIRMinJcdwWcggCJRl1Mb74Hpo/S", //poner 12345678
--             "activo": 1
--         }

--  {
--             "id_plat": 6,
--             "nombre": "Atari"
--         },
--         {
--             "id_plat": 5,
--             "nombre": "Nintendo Switch"
--         }

-- ---- para eliminar user necesito poner la url de /usuario/aqui el numero de id_user

-- --- para editar videojuego:

-- {
--     "titulo": "Pokemon Sol",
--     "descripcion": "Juego de aventuras con pokemon de Alola",
--     "id_plat": "5"
-- }

-- --- para eliminar plataforma

-- http://localhost:4000/plataforma/9    - poner id_plat