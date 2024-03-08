<?php

require_once "../models/categoryModels.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (isset($_POST['code'])) {
        echo json_encode(Category::delCat($_POST['code']));
    } elseif (isset($_POST['name']) && isset($_POST['tax'])) {
        $arrayCat = array('name' => htmlentities($_POST['name']), 'tax' => $_POST['tax']);
        echo json_encode(Category::saveData($arrayCat));
    }
} else {
    echo json_encode(Category::showData());
}