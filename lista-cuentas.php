<?php
    include 'inc/funciones/sesiones.php';
    include 'inc/funciones/funciones.php';
    include 'inc/templates/header.php';
    include 'inc/templates/barra.php';
?>

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Listado de Administradores
        <small>GdlWebCamp</small>
      </h1>
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="row">
        <div class="col-xs-12">

          <div class="box">
            <div class="box-header">
              <h3 class="box-title">Maneja los usuarios en esta sección</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <table id="registros" class="table table-bordered table-striped">
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
                                <a href="editar-admin.php?id=<?php echo $usuario['id']; ?>" class="btn bg-orange btn-flat margin">
                                <i class="fa fa-pencil"></i> </a>
                                <a href="#" data-id="<?php echo $usuario['id'] ?>" data-tipo="admin" class="btn bg-maroon btn-flat margin borrar_registro"> <i class="fa fa-trash"></i> </a>
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
            <!-- /.box-body -->
          </div>
          <!-- /.box -->
        </div>
        <!-- /.col -->
      </div>
      <!-- /.row -->
    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->

  <?php
      include 'inc/templates/footer.php';
  ?>
