<?php
include_once("./pdo.php");
include_once("./header.php");

$data = file_get_contents('php://input');
$_POST = json_decode($data, true);


// this file adds users to the database
if (
    isset($_POST["first_name"]) && isset($_POST["last_name"]) && isset($_POST["email"]) && isset($_POST["password"]) && isset($_POST["is_admin"])){
        try {
            $sql = "INSERT INTO USER (first_name, last_name, email, password, is_admin) 
                    VALUES(:first_name, :last_name, :email, :password, :is_admin)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute(
                array(
                    ":first_name" => $_POST["first_name"] , 
                    ":last_name" => $_POST["last_name"] , 
                    ":email" => $_POST["email"], 
                    ":password" => password_hash($_POST["password"], PASSWORD_DEFAULT),
                    ":is_admin" => $_POST["is_admin"] 
                )
            );
            $data = array("res" => "User created successfully");        
            echo json_encode($data);
        } catch (Exception $e) {
            echo "An error has occurred";
        }
}