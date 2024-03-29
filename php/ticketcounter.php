<?php
include_once("./pdo.php");
include_once("./header.php");

$vip_count = 0;
$reg_count = 0;

// this file counts vip and regular tickets purchased for a given event
if (isset($_GET['event_id']) && isset($_GET['user_id'])) {
    try {
        $sql = "SELECT COUNT(*) AS 'TICKETS PURCHASED' FROM TICKETING WHERE EVENT_ID = :EVENT_ID AND USER_ID = :USER_ID AND TICKET_TYPE= 'VIP'";
        $stmt = $pdo->prepare($sql);
        $stmt->execute((
            array(
                ":EVENT_ID" => $_GET['event_id'],
                ":USER_ID" => $_GET['user_id']
            )
        ));              
        
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            foreach ($row as $key => $value) {
                $vip_count = $value;
            }
        }

        $sql = "SELECT COUNT(*) AS 'TICKETS PURCHASED' FROM TICKETING WHERE EVENT_ID = :EVENT_ID AND USER_ID = :USER_ID AND TICKET_TYPE= 'REGULAR'";
        $stmt = $pdo->prepare($sql);
        $stmt->execute((
            array(
                ":EVENT_ID" => $_GET['event_id'],
                ":USER_ID" => $_GET['user_id']
            )
        ));              
        
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            foreach ($row as $key => $value) {
                $reg_count = $value;
            }
        }
        $res = array("vip_tickets"=> $vip_count, "regular_tickets"=> $reg_count, "message"=>"Counts successfully fetched");
        echo json_encode($res);

    } catch (Exception $e) {
        echo $e;
    }
}