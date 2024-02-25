<?php
include_once("./pdo.php");
include_once("./header.php");

$user_id = $_GET['id'];

if (!$user_id){
    try{
        $sql = "SELECT * FROM EVENT";
        $stmt = $pdo->query($sql);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $res = array("events"=> $row, "message" => "Successfully fetched all events");
        echo json_encode($res);
    }
}