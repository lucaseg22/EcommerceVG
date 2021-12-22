-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 25-11-2021 a las 15:03:44
-- Versión del servidor: 5.5.24-log
-- Versión de PHP: 5.4.3

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `ecommerce`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE IF NOT EXISTS `productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(250) NOT NULL,
  `subtitulo` text NOT NULL,
  `precio` int(20) NOT NULL,
  `cuerpo` text NOT NULL,
  `img_id` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `titulo`, `subtitulo`, `precio`, `cuerpo`, `img_id`) VALUES
(1, 'MX-50', 'Ilumincion para cultivo ', 20000, 'La mejor iluminacion para tu cultivo.', 't465zrdckr8tj9qesbkk'),
(4, 'Maceta 10 L Roothouse', 'Root house', 600, 'Maceta 10L Root house', 'inzybptotq1gmmzoxyxt'),
(5, 'MX-150', 'Ilumincaion led', 25000, '150w', NULL),
(6, 'Red Scrog 60x60', 'Red scrog', 1000, 'Red scrog para cultivo indoor', 'wd5x5smlxvfy4sk8rtpl'),
(7, 'MX50', 'MX50', 2131442, 'MX50', ''),
(8, 'MX50', 'MX50', 2135125, 'MX50MX50', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(60) CHARACTER SET utf8mb4 NOT NULL,
  `password` varchar(60) CHARACTER SET utf8mb4 NOT NULL,
  KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `password`) VALUES
(1, 'lucas', '34c62e97d41d3dc96779797932095e70'),
(2, 'silvana', 'f850bce37f95a998a2362e26062e7a22');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
