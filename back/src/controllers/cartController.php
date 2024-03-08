<?php
require_once "../models/cartModels.php";

if($_SERVER["REQUEST_METHOD"] === "POST"){
    if(isset($_POST['code'])){
        echo json_encode(Cart::delItem($_POST['code']));
    }else{
        $arrCart = array('prod' => $_POST['prod'], 'price' => $_POST['price'],
        'amount' => $_POST['amount'], 'total' => $_POST['total'],
        'tax' => $_POST['tax']);
        echo json_encode(Cart::addCart($arrCart));
    }

}else{
    echo json_encode(Cart::showCart());
}

 /* $arrCart = array('prod' => $_POST['prod'], 'price' => $_POST['price'],
    'amount' => $_POST['amount'], 'total' => ['total']);
    echo json_encode(Cart::addCart($arrCart)); 
    $arrCart = array('prod' => $_POST['prod'], 'price' => $_POST['price'],
    'amount' => $_POST['amount'], 'total' => $_POST['total']);
    echo json_encode(Cart::addCart($arrCart));*/