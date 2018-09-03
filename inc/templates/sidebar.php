<aside class="contenedor-proyectos">

    <div class="panel crear-proyecto">
        <a href="#" class="boton">Nuevo Proyecto <i class="fas fa-plus"></i> </a>
    </div> <!-- <div class="panel crear-proyecto"> -->

    <div class="panel lista-proyectos">

        <h2>Proyectos</h2>

        <ul id="proyectos">
            <?php
                $proyectos = obtenerProyectos();
                if($proyectos) {
                    foreach($proyectos as $proyecto) {
                        /*
                        echo <pre>;
                        var_dump($proyecto);
                        echo </pre>;
                        */
            ?>
                        <li>
                            <a href="index.php?id_proyecto=<?php echo $proyecto['id'] ?>" id="proyecto:<?php echo $proyecto['id'] ?>">
                                <?php echo $proyecto['nombre'] ?>
                            </a>
                        </li>
            <?php   }
                }
            ?>
        </ul>

    </div> <!-- <div class="panel lista-proyectos"> -->

</aside> <!-- <aside class="contenedor-proyectos"> -->
