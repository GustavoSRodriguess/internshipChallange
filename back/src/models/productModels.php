<?php
require_once "../config/config.php";

class Product extends Connection{
    public static function showData(){
        try{
            $sql = "SELECT p.*, c.name as category_name, c.tax as category_tax FROM PRODUCTS p JOIN CATEGORIES c ON p.category_code = c.code ORDER BY code";
            $stmt = Connection::getConnection()->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchAll();
            return $result;
        }catch(PDOException $th){
            echo $th->getMessage();
        }
    }

    public static function saveProd($data){
        try{
            $sql = "INSERT INTO PRODUCTS (name, price,amount, category_code) VALUES (:name, :price, :amount,:category_code)";
            $stmt = Connection::getConnection()->prepare($sql);
            $stmt->bindParam(':name', $data['name']);
            $stmt->bindParam(':price', $data['price']);
            $stmt->bindParam(':amount', $data['amount']);
            $stmt->bindParam(':category_code', $data['category_code']);
            $stmt->execute();
            return true;
        }catch(PDOException $th){
            echo $th->getMessage();
        }
    }

    public static function deleteProd($code){
        try{
            $sql = "DELETE FROM PRODUCTS WHERE code = :code";
            $stmt = Connection::getConnection()->prepare($sql);
            $stmt->bindParam(':code', $code);
            $stmt->execute();
            return true;
        }catch(PDOException $th){
            echo $th->getMessage();
        }
    }
}