<?php
    include 'inc/funciones/sesiones.php';
    include 'inc/funciones/funciones.php';
    include 'inc/templates/header.php';
    include 'inc/templates/barra.php';
?>

    <div class="contenedor-formulario">

        <h1>UpTask <span>Crear Cuenta</span></h1>

        <form id="formulario" class="caja-login" method="post">

            <div class="campo">
                <label for="usuario">Usuario: </label>
                <input type="text" name="usuario" id="usuario" placeholder="Usuario">
            </div>

            <div class="campo">
                <label for="nombre">Nombre: </label>
                <input type="text" name="nombre" id="nombre" placeholder="Nombre">
            </div>

            <div class="campo">
                <label for="clave">Clave: </label>
                <input type="password" name="clave" id="clave" placeholder="Contraseña">
            </div>

            <div class="campo">
                <label for="password">Repita la clave: </label>
                <input type="password" name="repetir_clave" id="repetir_clave" placeholder="Repita la contraseña">
            </div>

            <div class="campo enviar">
                <input type="hidden" id="tipo" value="crear">
                <input type="submit" class="boton" value="Crear cuenta">
            </div>

        </form>

    </div>

<?php
    include 'inc/templates/footer.php';
?>
