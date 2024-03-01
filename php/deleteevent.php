<?php

include_once("./pdo.php");
include_once("./header.php");

$data = file_get_contents('php://input');
$_DELETE = json_decode($data, true);

// this file deletes an event
if (isset($_DELETE['event_id'])) {
    try {
        $sql = "DELETE FROM EVENT WHERE EVENT_ID = :EVENT_ID";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(
            array(
                ":EVENT_ID" => $_DELETE['event_id']
            )
        );
        echo json_encode(array("message" => "Event successfully deleted"));
    } catch (Exception $e) {
        echo json_encode(array("error" => $e));
    }
}