<?php
require_once "../config/config.php";
class Category extends Connection{
    public static function showData(){
        try{
            $sql = "SELECT * FROM CATEGORIES";
            $stmt = Connection::getConnection()->prepare($sql);
            $stmt->execute();
            $result = $stmt->fetchAll();
            return $result;
        }catch(PDOException $th){
            echo $th->getMessage();
        }
    }
    public static function getCategoryCode($CODE){
        try{
            $sql = "SELECT * FROM CATEGORIES WHERE CODE = :CODE";
            $stmt = Connection::getConnection()->prepare($sql);
            $stmt->bindParam(':CODE', $CODE);
            $stmt->execute();
            $result = $stmt->fetch();
            return $result;
        }catch(PDOException $th){
            echo $th->getMessage();
        }
    }
    public static function saveData($data){
        try{
            $sql = "INSERT INTO CATEGORIES (name, tax) VALUES (:name, :tax)";
            $stmt = Connection::getConnection()->prepare($sql);
            $stmt->bindParam(':name', $data['name']);
            $stmt->bindParam(':tax', $data['tax']);
            $stmt->execute();
            return true;
        }catch(PDOException $th){
            echo $th->getMessage();
        }
    }
    //i guesss i wont ues this, but just in case i will write it 
    public static function updateData($data){
        try{
            $sql = "UPDATE CATEGORIES SET name = :name, tax = :tax WHERE code = :code";
            $stmt = Connection::getConnection()->prepare($sql);
            $stmt->bindParam(':name', $data['catName']);
            $stmt->bindParam(':tax', $data['tax']);
            $stmt->bindParam(':code', $data['code']);
            $stmt->execute();
            return true;
        }catch(PDOException $th){
            echo $th->getMessage();
        }
    }
    public static function delCat($code){
        try{
            $sql = "DELETE FROM CATEGORIES WHERE code = :code";
            $stmt = Connection::getConnection()->prepare($sql);
            $stmt->bindParam(':code', $code);
            $stmt->execute();
            return true;
        }catch(PDOException $th){
            echo $th->getMessage();
        }
    }
}