<?php
include_once("./pdo.php");
include_once("./header.php");

$data = file_get_contents('php://input');
$_POST = json_decode($data, true);

// this file fetches all events in the database
try {
    $sql = "SELECT * FROM EVENT WHERE DATE>=CURDATE()";
    $stmt = $pdo->query($sql);
    $data = array();
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        array_push($data, $row);
    }
    $res = array("events" => $data, "message" => "Successfully fetched all events");
    echo json_encode($res);
} catch (Exception $e) {
    echo "An error has occurred";
}
