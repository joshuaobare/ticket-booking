<?php
include_once("./pdo.php");
include_once("./header.php");


$data = file_get_contents('php://input');
$_POST = json_decode($data, true);

try{
    $sql = "SELECT * FROM EVENT";
    $stmt = $pdo->query($sql);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    $res = array("events"=> $row, "message" => "Successfully fetched all events");
    echo json_encode($res);
} catch (Exception $e) {
    echo "An error has occurred";
}
