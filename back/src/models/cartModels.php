<?php
require_once "../config/config.php";

class Cart extends Connection{
    public static function showCart(){
        try{
            $sql = "SELECT c.*, p.name as prod_name FROM CART c JOIN PRODUCTS p
            ON c.prod = p.code ORDER BY code";
            $stmt = Connection::getConnection()->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchAll();
            return $result;
        }catch(PDOException $th){
            echo $th->getMessage();
        }
        
    }
    public static function addCart($data){
        try{
            $sql = "INSERT INTO CART (prod, price, amount, total, tax) VALUES (:prod,
            :price, :amount, :total, :tax)";
            $stmt = Connection::getConnection()->prepare($sql);
            $stmt->bindParam(':prod', $data['prod']);
            $stmt->bindParam(':price', $data['price']);
            $stmt->bindParam(':amount', $data['amount']);
            $stmt->bindParam(':total', $data['total']);
            $stmt->bindParam(':tax', $data['tax']);
            $stmt->execute();
            return true;
        }catch(PDOException $th){
            echo $th->getMessage();
        }
    }

    public static function delItem($code){
        try{
            $sql = "DELETE FROM CART WHERE code = :code";
            $stmt = Connection::getConnection()->prepare($sql);
            $stmt->bindParam(':code', $code);
            $stmt->execute();
            return true;
        }catch(PDOException $th){
            $th->getMessage();
        }
       
    }
}