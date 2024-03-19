<?php
require_once "../models/orderModel.php";

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE, UPDATE');

if($_SERVER["REQUEST_METHOD"] === "POST"){
    if(isset($_POST['update'])){
        echo json_encode(Order::updateStockRetrieve());
    }else{
    $arrOrder = array('tax' => $_POST['tax']);
    echo json_encode(Order::saveOrder($arrOrder));
    }
}elseif($_SERVER["REQUEST_METHOD"] === "UPDATE"){
    echo json_encode(Order::updateStock());
}elseif($_SERVER["REQUEST_METHOD"] === "DELETE"){
    echo json_encode(Order::deleteCart());
}