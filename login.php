<?php

    session_start();
    include 'inc/funciones/funciones.php';
    include 'inc/templates/header.php';

    /*
    session_start();
    echo "<pre>";
    var_dump($_SESSION);
    echo "</pre>";
    */

    // cierra la sesión, botón de la barra
    if(isset($_GET['cerrar_sesion'])) {
        $_SESSION = array();
    }

?>

<div class="contenedor-formulario">

    <h1>Administrador de Proyectos</h1>

    <form id="formulario" class="caja-login" method="post">

        <div class="campo">
            <label for="usuario">Usuario: </label>
            <input type="text" name="usuario" id="usuario" placeholder="Usuario">
            </div> <!-- <div class="campo"> -->

        <div class="campo">
            <label for="password">Clave: </label>
            <input type="password" name="clave" id="clave" placeholder="Contraseña">
        </div> <!-- <div class="campo"> -->
            
        <div class="campo enviar">
            <input type="hidden" id="tipo" value="login">
            <input type="submit" class="boton" value="Iniciar Sesión">
        </div> <!-- <div class="campo enviar"> -->

    </form> <!-- <form id="formulario" class="caja-login" method="post"> -->

</div> <!-- <div class="contenedor-formulario"> -->

<?php
    include 'inc/templates/footer.php';
?>
