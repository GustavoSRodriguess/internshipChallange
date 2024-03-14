<?php

require_once "../models/categoryModels.php";

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $arrayCat = array('name' => htmlentities($_POST['name']), 'tax' => $_POST['tax']);
    echo json_encode(Category::saveData($arrayCat));
    
} elseif($_SERVER["REQUEST_METHOD"] === "DELETE") {
    if(isset($_GET['code'])){
        $code = $_GET['code'];
        echo json_encode(Category::delCat($code));
    }else{
        echo json_encode(array('error' => 'deu ruim aqui'));
    }

}else{
    echo json_encode(Category::showData());
}