<?php

require_once "../models/registerModels.php";

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');

$arrUser = array('username' => $_POST['username'],'email' => $_POST['email'],
'pwd' => $_POST['pwd'] );

echo json_encode(Register::saveNewUser($arrUser));
