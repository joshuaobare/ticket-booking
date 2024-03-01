<?php
include_once("./pdo.php");
include_once("./header.php");

$data = file_get_contents('php://input');
$_POST = json_decode($data, true);

if (
    isset($_POST["email"]) && isset($_POST["password"])
) {
    try {
        $sql = "SELECT * FROM USER WHERE EMAIL = :EMAIL";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(
            array(
                ":EMAIL" => $_POST["email"]
            )
        );
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row) {
            $password_verification = password_verify($_POST['password'], $row['password']);

            if ($password_verification) {
                $res = array("user" => $row, "message" => "You are now logged in!");
                echo json_encode($res);
            } else {
                $res = array("error" => "Unsuccessful login");
                echo json_encode($res);
            }
        }

    } catch (Exception $e) {
        $res = array("error" => $e . getMessage());
        echo json_encode($res);
    }
}