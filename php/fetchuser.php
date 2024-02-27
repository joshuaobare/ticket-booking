<?php
include_once("./pdo.php");
include_once("./header.php");

if (isset($_GET['id'])) {
    try {
        $sql = "SELECT * FROM USER WHERE USER_ID=:USER_ID";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(
            array(
                ":USER_ID" => $_GET['id']
            )
        );
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode(array( "message"=> "User found", "user" => array("user_id" => $row["user_id"], "first_name" => $row["first_name"], "last_name" => $row["last_name"], "email" => $row["email"], "is_admin" => $row["is_admin"])));
    } catch (Exception $e) {
        echo json_encode(array("error" => $e));
    }
}


