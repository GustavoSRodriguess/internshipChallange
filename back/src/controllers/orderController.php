<?php
require_once "../models/orderModel.php";

header('Content-Type: application/json; charset=utf-8');

if($_SERVER["REQUEST_METHOD"] === "POST"){
    if(isset($_POST['update'])){
        echo json_encode(Order::updateStockRetrieve());
    }else{
    $arrOrder = array('tax' => $_POST['tax']);
    echo json_encode(Order::saveOrder($arrOrder));
    }
}elseif($_SERVER["REQUEST_METHOD"] === "UPDATE"){
    echo json_encode(Order::updateStock());
}else{
    echo json_encode(Order::deleteCart());
}