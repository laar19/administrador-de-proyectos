
        <script src="js/plugins/sweetalert2.all.min.js"></script>

        <?php
            $actual = obtenerPaginaActual();
            if($actual === 'login') {
                echo '<script src="js/usuarios.js"></script>';
            }
            else if($actual === 'crear-usuario' || $actual === 'lista-usuarios') {
                // este script sólo se ejecuta si se está en la sección de usuarios
                echo '<script src="js/jquery.min.js"></script>';
                echo '<script src="js/usuarios.js"></script>';
                echo '<script src="js/proyectos.js"></script>';
            }
            else {
                // este script sólo se ejecuta si se está en la sección de proyectos
                echo '<script src="js/proyectos.js"></script>';
                echo '<script src="js/tareas.js"></script>';
            }
        ?>

    </body> <!-- <body class="< ?php echo obtenerPaginaActual(); ?>"> -->

</html>
