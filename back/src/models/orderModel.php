<?php
require_once "../config/config.php";

class Order extends Connection{
    public static function saveOrder($data){
        try{
            $sql = "INSERT INTO ORDERS (total, tax) VALUES ((SELECT SUM(total) FROM CART), :tax)";
            $stmt = Connection::getConnection()->prepare($sql);
            //$stmt->bindParam(':total', $data['total']);
            $stmt->bindParam(':tax', $data['tax']);
            $stmt->execute();
            //$orderCode = Connection::getConnection()->lastInsertId();

           /*  $sql = "INSERT INTO ORDER_ITEM (ORDER_CODE, PRODUCT_CODE, AMOUNT, PRICE, TAX) SELECT ?, PROD, AMOUNT, PRICE, TAX FROM CART";
            $stmt = Connection::getConnection()->prepare($sql);
            $stmt->execute([$orderCode]); */
 
            return true;
        }catch(PDOException $th){
            echo $th->getMessage();
        }
    }

    public static function deleteCart(){
        try{
            $sql = "DELETE FROM CART";
            $stmt = Connection::getConnection()->prepare($sql);
            $stmt->execute();
            return true;
        }catch(PDOException $th){
            echo $th->getMessage();
        }
    }

    public static function updateStock(){
        try{
            $sql = "UPDATE PRODUCTS p SET amount = p.amount - c.amount 
            FROM CART c WHERE p.code = c.prod;";
            $stmt = Connection::getConnection()->prepare($sql);
            $stmt->execute();
            return true;
        }catch(PDOException $th){
            $th->getMessage();
        }
    }

    public static function updateStockRetrieve(){
        try{
            $sql = "UPDATE PRODUCTS p SET amount = p.amount + c.amount 
            FROM CART c WHERE p.code = c.prod;";
            $stmt = Connection::getConnection()->prepare($sql);
            $stmt->execute();
            return true;
        }catch(PDOException $th){
            $th->getMessage();
        }
    }
}