<?php

include_once("./pdo.php");
include_once("./header.php");

// this file fetches a single event based on an id GET request
if (isset($_GET['id'])) {
    try {
        $sql = "SELECT * FROM EVENT WHERE EVENT_ID = :ID";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(
            array(
                ":ID" => $_GET["id"]
            )
        );
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $res = array("message" => "Event fetched successfully", "event" => $row);
        echo json_encode($res);
    } catch (Exception $e) {
        $res = array("error" => $e);
        echo json_encode($res);
    }

}