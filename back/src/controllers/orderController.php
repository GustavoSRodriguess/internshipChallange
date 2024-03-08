<?php
require_once "../models/orderModel.php";

if($_SERVER["REQUEST_METHOD"] === "POST"){
    $arrOrder = array('tax' => $_POST['tax']);
    echo json_encode(Order::saveOrder($arrOrder));
}elseif($_SERVER["REQUEST_METHOD"] === "UPDATE"){
   echo json_encode(Order::updateStock()); 
}else{
    echo json_encode(Order::deleteCart());
}