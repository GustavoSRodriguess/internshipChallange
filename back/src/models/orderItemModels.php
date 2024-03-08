<?php
require_once "../config/config.php";
class Order extends Connection{
    public static function showCart(){
        try{
            $sql = "SELECT oi.*, p.name AS prod_name FROM ORDER_ITEMS oi JOIN PRODUCTS p ON oi.product_code = p.code";
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
            $sql = "INSERT INTO ORDER_ITEM (order_code, product_code, amount, price, tax) VALUES (:order_code,
            :product_code, :amount, :price, :tax)";
            $stmt = Connection::getConnection()->prepare($sql);
            $stmt->bindParam(':order_code', $data['oder_code']);
            $stmt->bindParam(':product_code', $data['product_code']);
            $stmt->bindParam(':amount', $data['amount']);
            $stmt->bindParam(':price', $data['price']);
            $stmt->bindParam(':tax', $data['tax']);
            $stmt->execute();
            return true;
        }catch(PDOException $th){
            echo $th->getMessage();
        }
    }
    
    public static function delItem($code){
        try{
            $sql = "DELETE FROM ORDER_ITEM WHERE code = :code";
            $stmt = Connection::getConnection()->prepare($sql);
            $stmt->bindParam(':code', $code);
            $stmt->execute();
            return true;
        }catch(PDOException $th){
            echo $th->getMessage();
        }
    }
}  