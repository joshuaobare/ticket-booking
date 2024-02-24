<?php
include_once("./pdo.php");

if (
    isset($_POST["event_name"]) && isset($_POST["date"]) && isset($_POST["event_location"]) && isset($_POST["vip_ticket_price"]) && isset($_POST["regular_ticket_price"])
    && isset($_POST["max_attendees"]) && isset($_POST["event_desc"])
) {
    try {
        $sql = "INSERT INTO EVENT (event_name, date, event_location, vip_ticket_price,regular_ticket_price,max_attendees,event_desc) 
				VALUES(:event_name, :date, :event_location, :vip_ticket_price,:regular_ticket_price,:max_attendees,:event_desc)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(
            array(
                ":event_name" => $_POST["event_name"] , 
                ":date" => $_POST["date"] , 
                ":event_location" => $_POST["event_location"], 
                ":vip_ticket_price" => $_POST["vip_ticket_price"] ,
                ":regular_ticket_price" => $_POST["regular_ticket_price"],
                ":max_attendees" => $_POST["max_attendees"],
                ":event_desc" => $_POST["event_desc"]
            )
        );
    } catch (Exception $e) {
        echo "An error has occurred";
    }
}
