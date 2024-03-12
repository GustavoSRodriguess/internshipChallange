<?php
require_once "../models/historyModel.php";

header('Content-Type: application/json; charset=utf-8');

if(isset($_GET['orderId'])){
    $orderId = $_GET['orderId'];
    echo json_encode(History::showDetails($orderId));
}else{
    json_encode([]);
}