<?php

    $accion = $_POST["accion"];
    $id_proyecto = (int) $_POST["id_proyecto"];
    $tarea = $_POST["tarea"];
    $estado = $_POST["estado"];
    $id_tarea = (int) $_POST["id"];

    // crear una tarea
    if($accion === "crear") {
        // importar la conexión
        include "../funciones/conexion.php";

        try {
            // Realizar la consulta a la base de datos
            $stmt = $conn->prepare("INSERT INTO tareas (nombre_tarea, id_proyecto) VALUES (?, ?) ");
            $stmt->bind_param("si", $tarea, $id_proyecto);
            $stmt->execute();

            if($stmt->affected_rows > 0) {
                $respuesta = array(
                    "respuesta" => "correcto",
                    "id_insertado" => $stmt->insert_id,
                    "tipo" => $accion,
                    "tarea" => $tarea
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

    // eliminar una tarea
    if($accion === "eliminar") {
        // importar la conexion
        include "../funciones/conexion.php";

        try {
            // Realizar la consulta a la base de datos
            $stmt = $conn->prepare("DELETE from tareas WHERE id = ? ");
            $stmt->bind_param("i", $id_tarea);
            $stmt->execute();

            if($stmt->affected_rows > 0) {
                $respuesta = array(
                    "respuesta" => "correcto"
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

?>
