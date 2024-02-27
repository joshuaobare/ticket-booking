<?php
include_once("./pdo.php");
include_once("./header.php");

$data = file_get_contents('php://input');
$_POST = json_decode($data, true);
$res = array();

function insertBooking($pdo, $event_id, $user_id, $ticket_price, $ticket_type) {  
    try {
       $sql = "INSERT INTO TICKETING (EVENT_ID, USER_ID, TICKET_PRICE, TICKET_TYPE) VALUES (:EVENT_ID, :USER_ID, :TICKET_PRICE, :TICKET_TYPE)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute((
        array(
            ":EVENT_ID" =>$event_id, 
            ":USER_ID" =>$user_id, 
            ":TICKET_PRICE" =>$ticket_price, 
            ":TICKET_TYPE" =>$ticket_type
        ) 
        ));
    $data = array("res" => "Booking made successfully"); 
    array_push($res, $data);    
    #echo json_encode($data);
    } catch (Exception $e) {
        #array_push($res, $data);
        echo json_encode(array("error" => $e));
    }
}

function decrementAvailableTickets() {

}

if (isset($_POST["event_id"]) && isset($_POST["user_id"]) && isset($_POST['regular_ticket_price']) && isset($_POST['vip_ticket_price']) && (isset($_POST["vip_tickets"])  ||(isset($_POST["regular_tickets"]) ))){
    if (isset($_POST["vip_tickets"])) {
        try {
            for ($x = 0 ; $x < $_POST["vip_tickets"]; $x++){  
                insertBooking($pdo, $_POST["event_id"],$_POST["user_id"],$_POST['vip_ticket_price'], 'vip');
            }
        } catch (Exception $e) {
            echo json_encode(array("error" => $e));
        }
        
    }
    if (isset($_POST["regular_tickets"])) {
        try {
            for ($x = 0 ; $x < $_POST["regular_tickets"]; $x++){  
                insertBooking($pdo, $_POST["event_id"],$_POST["user_id"],$_POST['regular_ticket_price'], 'regular');
            }
        } catch (Exception $e) {
            echo json_encode(array("error" => $e));
        }       
        
    }
    echo json_encode($res);
    
}