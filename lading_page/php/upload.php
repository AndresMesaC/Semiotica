<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Directorio donde se guardarán las imágenes
    $target_dir = "uploads/";

    // Nombre del archivo con un nombre único
    $target_file = $target_dir . basename($_FILES["imagen"]["name"]);

    // Mover el archivo subido al directorio deseado
    if (move_uploaded_file($_FILES["imagen"]["tmp_name"], $target_file)) {
        $response = [
            'nombre' => $_POST['nombre'],
            'email' => $_POST['email'],
            'asunto' => $_POST['asunto'],
            'mensaje' => $_POST['mensaje'],
            'imagen' => $target_file // Ruta de la imagen subida
        ];
        echo json_encode($response); // Devolver los datos en formato JSON
    } else {
        echo json_encode(['error' => 'Error al subir la imagen.']);
    }
}
?>