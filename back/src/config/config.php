<?php

header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Methods: GET, POST');

header("Access-Control-Allow-Headers: X-Requested-With");

class Connection{
    public $host = "pgsql_desafio";
    public $db = "applicationphp";
    public $user = "root";
    public $pw = "root";
    public $connect;
    public static function getConnection(){
        try{
            $connection = new Connection();
            $connection->connect = new PDO("pgsql:host={$connection->host};dbname={$connection->db}", $connection->user, $connection->pw);
            $connection->connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $connection->connect;
        }catch(PDOException $e){
            echo "Error".$e->getMessage();
            echo "deu ruim";
        }   
    }
}
Connection::getConnection();