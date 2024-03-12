<?php
require_once "../config/config.php";

header('Content-Type: application/json; charset=utf-8');

header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Methods: GET, POST');

header("Access-Control-Allow-Headers: X-Requested-With");

function testeFunction() {
    try{
        $conn = Connection::getConnection();
        $conn->beginTransaction();

        $stmt = $conn->prepare("SELECT * FROM PRODUCTS");
        $stmt->execute();

        $conn->commit();
        $result = $stmt->fetchAll();
        
        //echo json_encode(['sucess' => true]);
        return $result;
    }catch(PDOException $e) {
        $conn->rollBack();
        echo json_encode(['error' => $e->getMessage()]);
    }
}

if($_SERVER["REQUEST_METHOD"] == "GET"){
    testeFunction();
}else{
    echo json_encode(['error' => 'invalid sex']);
}
?>