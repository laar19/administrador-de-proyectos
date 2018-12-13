<?php
    $conn = new mysqli('localhost', 'usuario', 'usuario', 'proyectos');

    /*
    echo "<pre>";
      var_dump($conn);
    echo "</pre>";
    */

    if($conn->connect_error){
        echo $conn->connect_error;
    }

    //para imprimir caracteres especiales
    $conn->set_charset('utf8');
?>
