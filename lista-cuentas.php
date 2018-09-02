<?php
    include 'inc/funciones/sesiones.php';
    include 'inc/funciones/funciones.php';
    include 'inc/templates/header.php';
    include 'inc/templates/barra.php';
?>

<div class="listado-pendientes">

    <main class="contenido-principal">

        <h1>
            Listado de Usuarios
        </h1>

        <div class="">

          <table>
                <thead>
                    <tr>
                        <th>Usuario</th>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <?php

                // importar la conexión
                include "inc/funciones/conexion.php";

                try {

                    $sql = "SELECT id, usuario, nombre FROM usuarios";

                    $resultado = $conn->query($sql);

                }
                catch (\Exception $e) {
                    $error = $e->getMessage();
                    echo $error;
                }

                while($usuario = $resultado->fetch_assoc()) { ?>

                    <tr>
                        <td> <?php echo $usuario["usuario"]; ?> </td>
                        <td> <?php echo $usuario["nombre"]; ?> </td>
                        <td>
                            <!-- class="btn bg-orange btn-flat margin" es una clase de font awesome -->
                            <a href="editar-admin.php?id=<?php echo $usuario['id']; ?>">
                            <i class="fas fa-edit"></i> </a>
                            <a href="#" data-id="<?php echo $usuario['id'] ?>"> <i class="fas fa-trash"></i> </a>
                        </td>
                    </tr>

                <?php } ?>

                <?php
                /*
                // quita el while para imprimir esto
                echo "<pre>";
                var_dump($usuario);
                echo "</pre>";
                */
                ?>

                <tfoot>
                    <tr>
                        <th>Usuario</th>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </tfoot>
            </table>

        </div>

    </main> <!-- <main class="contenido-principal"> -->

</div> <!-- <div class="listado-pendientes"> -->

<?php
    include 'inc/templates/footer.php';
?>
