<?php

include_once("./pdo.php");
include_once("./header.php");

$res = array("message" => array());
if (isset($_GET['user_id'])) {
    try {
        $sql = "SELECT EVENT.DATE, EVENT.EVENT_DESC, EVENT.EVENT_LOCATION, EVENT.EVENT_NAME, EVENT.IMAGE,TICKETING.TICKET_PRICE, TICKETING.TICKET_TYPE, TICKETING.TIMESTAMP 
        FROM TICKETING 
        INNER JOIN EVENT 
        ON TICKETING.EVENT_ID = EVENT.EVENT_ID 
        WHERE USER_ID = :USER_ID";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(
            array(
                ":USER_ID" => $_GET['user_id'],
            )
        );

        global $res;
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            array_push($res["message"], $row);
        }
        echo json_encode($res);
    } catch (Exception $e) {
        echo json_encode(array("error" => $e));
    }


}