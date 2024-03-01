<?php
$dsn = "mysql:host=localhost;dbname=ticket_booking";
$user = "root";
$password = "";

try {
    $pdo = new PDO($dsn , $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
} catch(PDOException $e) {
    echo json_encode(array("message"=>"Connection attempt failed successfully" .$e->getMessage()));
}

