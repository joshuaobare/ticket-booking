<?php
include_once("./pdo.php");
include_once("./header.php");


$data = file_get_contents('php://input');
$_POST = json_decode($data, true);

try{
    $sql = "SELECT * FROM EVENT";
    $stmt = $pdo->query($sql);
    $data = array();
    while ($row = $stmt->fetch()) {
        array_push($data, $row);
    }
    $res = array("events"=> $data, "message" => "Successfully fetched all events");
    echo json_encode($res);
} catch (Exception $e) {
    echo "An error has occurred";
}
