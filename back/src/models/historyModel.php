<?php
require_once "../config/config.php";

class History extends Connection{
    public static function showDetails($orderId){
        try{
            $sql = 'SELECT oi.*, p.NAME 
            FROM ORDER_ITEM oi 
            JOIN PRODUCTS p ON oi.PRODUCT_CODE = p.CODE 
            WHERE ORDER_CODE = :order_id';
            $stmt = COnnection::getConnection()->prepare($sql);
            $stmt->bindParam(':order_id', $orderId);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            return $result;
        }catch(PDOException $th){
            echo $th->getMessage();
        }

        
    }
}