
        <script src="js/sweetalert2.all.min.js"></script>

        <?php
            $actual = obtenerPaginaActual();
            if($actual === 'login') {
                echo '<script src="js/usuario.js"></script>';
            }
            else if($actual === 'crear-usuario' || $actual === 'lista-usuarios') {
                // este script sólo se ejecuta si el usuario inicia sesión
                echo '<script src="js/usuario.js"></script>';
                echo '<script src="js/proyecto.js"></script>';
            }
            else {
                // este script sólo se ejecuta si el usuario inicia sesión
                echo '<script src="js/proyecto.js"></script>';
                echo '<script src="js/tareas.js"></script>';
            }
        ?>

    </body> <!-- <body class="< ?php echo obtenerPaginaActual(); ?>"> -->

</html>
