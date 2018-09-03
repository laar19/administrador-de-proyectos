
<script src="js/sweetalert2.all.min.js"></script>
<?php
    $actual = obtenerPaginaActual();
    if($actual === 'crear-usuario' || $actual === 'login' || $actual === 'lista-usuarios') {
        echo '<script src="js/usuario.js"></script>';
    }
    else {
        // este script sólo se ejecuta si el usuario inicia sesión
        echo '<script src="js/scripts.js"></script>';
    }
?>


</body>
</html>
