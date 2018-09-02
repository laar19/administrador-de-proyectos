
<script src="js/sweetalert2.all.min.js"></script>
<?php
    $actual = obtenerPaginaActual();
    if($actual === 'crear-cuenta' || $actual === 'login' || $actual === 'lista-cuentas') {
        echo '<script src="js/formulario.js"></script>';
    }
    else {
        // este script sólo se ejecuta si el usuario inicia sesión
        echo '<script src="js/scripts.js"></script>';
    }
?>


</body>
</html>
