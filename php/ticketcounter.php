<?php
include_once("./pdo.php");
include_once("./header.php");

$vip_count = 0;
$reg_count = 0;

if (isset($_GET['event_id']) && isset($_GET['user_id'])) {
    try {
        $sql = "SELECT TICKET_TYPE, COUNT(*) AS 'TICKETS PURCHASED' FROM TICKETING WHERE EVENT_ID = :EVENT_ID AND USER_ID = :USER_ID GROUP BY TICKET_TYPE";
        $stmt = $pdo->prepare($sql);
        $stmt->execute((
            array(
                ":EVENT_ID" => $_GET['event_id'],
                ":USER_ID" => $_GET['user_id']
            )
        ));
        echo "start\n";
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            foreach ($row as $key => $value) {
                echo "$key + $value\n";
            }
        }
        echo $row;

    } catch (Exception $e) {
        echo $e;
    }
}