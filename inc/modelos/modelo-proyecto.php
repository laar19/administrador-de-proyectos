<?php

    if(isset($_POST["accion"])){
        $accion = $_POST["accion"];
    }
    if(isset($_POST["proyecto"])){
        $proyecto = $_POST["proyecto"];
    }
    if(isset($_POST["id_proyecto"])){
        $id_proyecto = (int) $_POST["id_proyecto"];
    }

    //echo json_encode($_POST);

    // crear un proyecto
    if($accion === "crear") {
        // importar la conexion
        include "../funciones/conexion.php";

        try {
            // Realizar la consulta a la base de datos
            $stmt = $conn->prepare("INSERT INTO proyectos (nombre) VALUES (?) ");
            $stmt->bind_param("s", $proyecto);
            $stmt->execute();

            if($stmt->affected_rows > 0) {
                $respuesta = array(
                    "respuesta" => "correcto",
                    "id_insertado" => $stmt->insert_id,
                    "tipo" => $accion,
                    "nombre_proyecto" => $proyecto
                );
            }
            else {
                $respuesta = array(
                    "respuesta" => "error",
                    "error" => error_get_last()
                );
            }

            $stmt->close();
            $conn->close();

        }
        catch(Exception $e) {
            // En caso de un error, tomar la exepcion
            $respuesta = array(
                "error" => $e->getMessage(),
                "error" => error_get_last()
            );
        }

        echo json_encode($respuesta);
    }

    // eliminar un proyecto
    if($accion === "eliminar") {

        // importar la conexion
        include "../funciones/conexion.php";

        try {

            $stmt = $conn->prepare("DELETE from proyectos WHERE id = ? ");
            $stmt->bind_param("i", $id_proyecto);
            $stmt->execute();

            if($stmt->affected_rows > 0) {
                $respuesta = array(
                    "respuesta" => "correcto",
                    "id_eliminado" => $id_proyecto,
                    "tipo" => $accion
                );
            }
            else {
                $respuesta = array(
                    "respuesta" => "error",
                    "id_eliminado" => $id_proyecto,
                    "tipo" => $accion,
                    "error" => error_get_last()
                );
            }

            $stmt->close();
            $conn->close();

        }
        catch(Exception $e) {
            // En caso de un error, tomar la exepcion
            $respuesta = array(
                "error" => $e->getMessage(),
                "error" => error_get_last()
            );
        }

        echo json_encode($respuesta);
    }

?>
