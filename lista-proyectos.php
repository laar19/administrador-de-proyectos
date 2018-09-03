<?php
    include 'inc/funciones/sesiones.php';
    include 'inc/funciones/funciones.php';
    include 'inc/templates/header.php';
    include 'inc/templates/barra.php';
?>

<div class="contenedor">

    <?php
        include 'inc/templates/sidebar.php';
    ?>

    <main class="contenido-principal">

        <?php

            $proyecto = obtenerNombreProyecto($id_proyecto);

            if($proyecto):
        ?>

        <h1>Proyecto Actual:
            <?php foreach($proyecto as $nombre): ?>
                <span><?php echo $nombre['nombre']; ?></span>
            <?php endforeach;?>
        </h1>

        <form action="#" id="formulario">
            <div class="campo">
                <label for="tarea">Tarea:</label>
                <input type="text" placeholder="Nombre Tarea" class="nombre-tarea">
            </div> <!-- <div class="campo"> -->
            <div class="campo enviar">
                <input type="hidden" id="id_proyecto" value="<?php echo $id_proyecto; ?>">
                <input type="submit" class="boton nueva-tarea" value="Agregar">
            </div> <!-- <div class="campo enviar"> -->
        </form> <!-- <form action="#" id="formulario"> -->

        <?php
            else:
                // Si no hay proyectos seleccionados
                echo "<p>Selecciona un Proyecto a la izquierda</p>";
            endif;
        ?>

        <h2>Listado de Proyectos</h2>

        <div class="listado-proyectos">
            <ul>
                <?php
                    // importar la conexión
                    include "inc/funciones/conexion.php";

                    try {
                        $sql = "SELECT id, nombre FROM proyectos";
                        $proyectos = $conn->query($sql);
                    }
                    catch (\Exception $e) {
                        $error = $e->getMessage();
                        echo $error;
                    }

                    if($proyectos->num_rows > 0) {

                        foreach($proyectos as $proyecto): ?>
                            <li id="proyecto:<?php echo $proyecto['id'] ?>" class="proyecto">
                                <p><?php echo $proyecto['nombre'] ?></p>

                                    <div class="acciones">
                                        <input type="hidden" id="id_proyecto" name="id_proyecto" value="<?php echo $proyecto['id'] ?>">
                                        <input type="hidden" id="tipo" value="eliminar">
                                        <i class="fas fa-edit"></i>
                                        <i class="fa fa-trash"></i>
                                    </div> <!-- <div class="acciones"> -->
                                </li>

                        <?php endforeach;
                    }
                    else {
                        echo "<p class='lista-vacia'>Error</p>";
                    }
                ?>

            </ul>

        </div> <!-- <div class="listado-usuarios"> -->

    </main> <!-- <main class="contenido-principal"> -->

</div> <!-- <div class="contenedor"> -->

<?php
    include 'inc/templates/footer.php';
?>
