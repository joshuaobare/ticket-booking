<?php
include_once("./pdo.php");
include_once("./header.php");

$data = file_get_contents('php://input');
$_POST = json_decode($data, true);

function insertBooking() {
    

}

if (isset($_POST["event_id"]) && isset($_POST["user_id"]) && (isset($_POST["vip_tickets"]) ||(isset($_POST["regular_tickets"]) ))){
    if (isset($_POST["vip_tickets"])) {

    }
    if (isset($_POST["regular_tickets"])) {
        
    }

    if (isset($_POST["regular_tickets"]) && isset($_POST["vip_tickets"])) {

    }
}