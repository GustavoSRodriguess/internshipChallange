<?php
require_once "../models/loginModels.php";

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE, UPDATE');

$arrLogin = array('email' => $_POST['email'], 'pwd' => $_POST['pwd']);
echo json_encode(Login::login($arrLogin));