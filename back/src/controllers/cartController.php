<?php
require_once "../models/cartModels.php";

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');

//cara oq n faz switch case de uma vez? tu é doente? arruma essa bagaceira 
//antes de mandar plmds
if($_SERVER["REQUEST_METHOD"] === "POST"){   
    $arrCart = array('prod' => $_POST['prod'], 'price' => $_POST['price'],
    'amount' => $_POST['amount'], 'total' => $_POST['total'],
    'tax' => $_POST['tax']);
    echo json_encode(Cart::addCart($arrCart));
}elseif($_SERVER["REQUEST_METHOD"] === "DELETE"){
    $code = $_GET['code'];;
    echo json_encode(Cart::delItem($code));
}else{
    echo json_encode(Cart::showCart());
}
 
 /* $arrCart = array('prod' => $_POST['prod'], 'price' => $_POST['price'],
    'amount' => $_POST['amount'], 'total' => ['total']);
    echo json_encode(Cart::addCart($arrCart)); 
    $arrCart = array('prod' => $_POST['prod'], 'price' => $_POST['price'],
    'amount' => $_POST['amount'], 'total' => $_POST['total']);
    echo json_encode(Cart::addCart($arrCart));*/