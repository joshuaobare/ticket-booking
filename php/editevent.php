<?php

include_once("./pdo.php");
include_once("./header.php");

$data = file_get_contents('php://input');
$_PUT = json_decode($data, true);

if (
    isset($_PUT["event_name"]) && isset($_PUT["date"]) && isset($_PUT["event_location"]) && isset($_PUT["vip_ticket_price"]) && isset($_PUT["regular_ticket_price"])
    && isset($_PUT["max_attendees"]) && isset($_PUT["event_id"])&& isset($_PUT["event_desc"]) && isset($_PUT["image"])
) {
    try {
        $sql = "UPDATE EVENT SET event_name = :event_name, date = :date, event_location=:event_location, vip_ticket_price=:vip_ticket_price ,regular_ticket_price=:regular_ticket_price ,max_attendees = :max_attendees,event_desc =:event_desc, image = :image WHERE event_id = :event_id";
        $stmt = $pdo->prepare($sql);
        
        $stmt->execute(
            array(
                ":event_id" => $_PUT["event_id"] ,
                ":event_name" => $_PUT["event_name"] , 
                ":date" => $_PUT["date"] , 
                ":event_location" => $_PUT["event_location"], 
                ":vip_ticket_price" => $_PUT["vip_ticket_price"] ,
                ":regular_ticket_price" => $_PUT["regular_ticket_price"],
                ":max_attendees" => $_PUT["max_attendees"],
                ":event_desc" => $_PUT["event_desc"],
                ":image" => $_PUT['image']
            )
        );
        $data = array("message" => "Event edited successfully");        
        echo json_encode($data);
    } catch (Exception $e) {
        echo json_encode(array("error" => $e));
    }
}
