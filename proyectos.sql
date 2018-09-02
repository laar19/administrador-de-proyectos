-- Adminer 4.6.3 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP DATABASE IF EXISTS `proyectos`;
CREATE DATABASE `proyectos` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci */;
USE `proyectos`;

DROP TABLE IF EXISTS `proyectos`;
CREATE TABLE `proyectos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

INSERT INTO `proyectos` (`id`, `nombre`) VALUES
(18,	'proyectos'),
(19,	'gdlwebcamp'),
(20,	'Admin LTE');

DROP TABLE IF EXISTS `tareas`;
CREATE TABLE `tareas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_tarea` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `estado` int(1) NOT NULL DEFAULT '0',
  `id_proyecto` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_proyecto` (`id_proyecto`),
  CONSTRAINT `tareas_ibfk_1` FOREIGN KEY (`id_proyecto`) REFERENCES `proyectos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

INSERT INTO `tareas` (`id`, `nombre_tarea`, `estado`, `id_proyecto`) VALUES
(17,	'crear administrar usuarios',	1,	18),
(18,	'crear administrar proyectos',	0,	18),
(19,	'auto-desaparecer las alertas',	0,	18),
(20,	'poder editar las tareas',	0,	18),
(21,	'probar el INNER JOIN del AdminLTE en la consulta del index que no funciona',	0,	19),
(24,	'resolver esto kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk',	0,	18),
(25,	'eliminar todos los espacios entre los value',	0,	19),
(26,	'añadir para que se seleccione el nivel del administrador al crearlo',	0,	19),
(29,	'terminar el pago con paypal',	0,	19),
(30,	'añadir utf8_encode() a todos los echo',	0,	19),
(31,	'abstraer el CRUD con ajax',	0,	19),
(32,	'quitar el alert al agregar una tarea y hacerlo como en la agenda',	0,	18),
(33,	'extender la cantidad de caracteres en la base de datos',	0,	18),
(34,	'acomodar e identar bien el código',	0,	19),
(35,	'acomodar e identar bien el código',	0,	18),
(36,	'comentar bien el código',	0,	18),
(37,	'comentar bien el código',	0,	19),
(38,	'abstraer y hacer portable el menú principal',	0,	19),
(39,	'abstraer y hacer portable el sidebar y la barra',	0,	18),
(40,	'las librerías y plugins: tenerlos locales y remotos. Y agruparlos en archivos diferentes',	0,	18),
(41,	'las librerías y plugins: tenerlos locales y remotos. Y agruparlos en archivos diferentes',	0,	19),
(42,	'las librerías y plugins: tenerlos locales y remotos. Y agruparlos en archivos diferentes',	0,	20),
(43,	'poner la barra fija',	0,	20),
(44,	'comentar todos los console.log',	0,	20),
(45,	'comentar todos los console.log',	0,	19),
(46,	'comentar todos los console.log',	0,	18),
(47,	'duplicarlo y sólo dejar comentarios mínimos. Para poder ser negociado',	0,	18),
(48,	'duplicarlo y sólo dejar comentarios mínimos. Para poder ser negociado',	0,	19),
(49,	'duplicarlo y sólo dejar comentarios mínimos. Para poder ser negociado',	0,	20),
(53,	'añadir a todos los arreglos de respuesta de ajax: \"error\" => error_get_last()',	0,	20),
(54,	'añadir a todos los arreglos de respuesta de ajax: \"error\" => error_get_last()',	0,	19),
(55,	'añadir a todos los arreglos de respuesta de ajax: \"error\" => error_get_last()',	0,	18),
(56,	'verifica que GdlWebCamp en el index tenga el estilo distorsionado',	0,	19),
(57,	'crear bien el login',	0,	18),
(58,	'en registro.php eliminar el input type number porque no funciona en firefox',	0,	19),
(59,	'redireccionar automáticamente apenas se inicie sesión',	0,	18),
(60,	'enumerar las tareas',	0,	18),
(61,	'plugins en un archivo aparte',	0,	20),
(63,	'plugins en un archivo aparte',	0,	19),
(64,	'plugins en un archivo aparte',	0,	18),
(65,	'la clase minimal de icheck no funciona',	0,	20),
(66,	'crear-registro.php: validar los formularios',	0,	19),
(67,	'lista-registrados.php: mostrar dos decimales',	0,	19),
(68,	'alinear el campo number de \"Pase por 2 días\" en editar-registro.php',	0,	19),
(70,	'agregar los \";\" que le falten a los \"echo\" en los campos html',	0,	19),
(71,	'agregar los \";\" que le falten a los \"echo\" en los campos html',	0,	20),
(72,	'agregar los \";\" que le falten a los \"echo\" en los campos html',	0,	18),
(73,	'recargar después de editar cualquiera de las secciones',	0,	20),
(74,	'verificar y corregir los TypeError de javascript en la consola',	0,	19),
(75,	'verificar y corregir los TypeError de javascript en la consola',	0,	18),
(76,	'verificar y corregir los TypeError de javascript en la consola',	0,	20),
(77,	'cambiar nombres y títulos al español',	0,	18),
(78,	'cambiar nombres y títulos al español',	0,	19),
(79,	'cambiar nombres y títulos al español',	0,	20),
(80,	'lo de 404.html no funciona',	0,	19),
(81,	'al iniciar sesión redireccionar al dashboard',	0,	20),
(82,	'en el formulario de invitados garegarle la tilde a viografía y revisar la ortografía en general',	0,	20),
(83,	'crear un LEEME que diga que se deben dar todos los permisos a la carpeta con el sitio, porque sino r',	0,	20),
(84,	'en editar invitados acmbiar el nombre del botoón de \"añadir\" a \"guardar cambios\"',	0,	20),
(85,	'agregar el paco \"editado\" a la tabla de registrados para que no de el error ese cuando no se modific',	0,	20),
(87,	'en la base dedatos. Revisar tabla registrados, columna pases_articulos y ver si puedes dividir esos ',	0,	19),
(88,	'en caso de necesitar, añadir enlaces absolutos como ya sabes',	0,	19),
(89,	'en caso de necesitar, añadir enlaces absolutos como ya sabes',	0,	20),
(90,	'añadir la validación de contraseña bien fina que tienes',	0,	18),
(91,	'después de crear usuario redireccionar al index',	0,	18),
(92,	'cambiar el nombre a la base de datos',	0,	18);

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `nombre` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `clave` varchar(60) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

INSERT INTO `usuarios` (`id`, `usuario`, `nombre`, `clave`) VALUES
(3,	'mint',	'mint',	'$2y$12$kkB2VFdqRWoZXktjy6v5vOPx4tEd9eCiHUdX7aW4OUBYyYS2IqNma'),
(4,	'usuario',	'usuario',	'$2y$12$Iff0RzGzL95DxN4fruxMnu890JSLpoQtz/HQeTW0dvfDnguP4qy4W');

-- 2018-09-02 23:53:46
