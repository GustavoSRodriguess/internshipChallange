<?php
require_once "../models/productModels.php";

header('Content-Type: application/json; charset=utf-8');

if($_SERVER["REQUEST_METHOD"] === "POST"){
    if(isset($_POST['code'])){
        echo json_encode(Product::deleteProd($_POST['code']));
    }elseif(isset($_POST['name'])){
        $arrProd = array('name' => htmlentities($_POST['name']), 'price' => $_POST['price'],
        'amount' => $_POST['amount'], 'category_code' => $_POST['category_code']);
        echo json_encode(Product::saveProd($arrProd));
    }
}else{
    echo json_encode(Product::showData());
}