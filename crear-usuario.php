<?php
    include 'inc/funciones/sesiones.php';
    include 'inc/funciones/funciones.php';
    include 'inc/templates/header.php';
    include 'inc/templates/barra.php';
?>

    <div class="contenedor-formulario">

        <h1>Crear Cuenta</h1>

        <form id="formulario" class="caja-login" method="post">

            <div class="campo">
                <label for="usuario">Usuario: </label>
                <input type="text" name="usuario" id="usuario" placeholder="Usuario">
            </div> <!-- <div class="campo"> -->

            <div class="campo">
                <label for="nombre">Nombre: </label>
                <input type="text" name="nombre" id="nombre" placeholder="Nombre">
            </div> <!-- <div class="campo"> -->

            <div class="campo">
                <label for="clave">Clave: </label>
                <input type="password" name="clave" id="clave" placeholder="Contraseña">
            </div> <!-- <div class="campo"> -->

            <div class="campo">
                <label for="password">Repita la clave: </label>
                <input type="password" name="repetir_clave" id="repetir_clave" placeholder="Repita la contraseña">
            </div> <!-- <div class="campo"> -->

            <div class="campo">
                <span id="resultado-clave"></span>
            </div> <!-- <div class="campo"> -->

            <div class="campo enviar">
                <input type="hidden" id="tipo" value="crear">
                <!-- <input type="submit" class="boton" value="Crear cuenta" id="crear-usuario"> -->
                <button type="submit" class="crear-usuario" id="crear-usuario">Crear cuenta</button>
            </div> <!-- <div class="campo enviar"> -->

        </form> <!-- <form id="formulario" class="caja-login" method="post"> -->

    </div> <!-- <div class="contenedor-formulario"> -->

<?php
    include 'inc/templates/footer.php';
?>
