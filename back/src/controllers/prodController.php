<?php
require_once "../models/productModels.php";

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');

if($_SERVER["REQUEST_METHOD"] === "POST"){
    $arrProd = array('name' => htmlentities($_POST['name']), 'price' => $_POST['price'],
    'amount' => $_POST['amount'], 'category_code' => $_POST['category_code']);
    echo json_encode(Product::saveProd($arrProd));
    
}elseif($_SERVER["REQUEST_METHOD"] === 'DELETE'){
    $code = $_GET['code'];
    echo json_encode(Product::deleteProd($code));
}else{
    echo json_encode(Product::showData());
}