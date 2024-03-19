<?php
require_once "../config/config.php";

class Login extends Connection{
    public static function login($data){
        try{

            $sql = 'SELECT * FROM users WHERE email = :email';
            $stmt = Connection::getConnection()->prepare($sql);
            $stmt->bindParam(':email', $data['email']);
            $stmt->execute();

            $rowCount = $stmt->rowCount(); 

            if($rowCount == 0){
                // na vdd acho q isso nao seria mt seguro né? 
                return "Email não cadastrado";
            }

            $sql = 'SELECT * FROM users WHERE email = :email AND pwd = :pwd';
            $stmt = Connection::getConnection()->prepare($sql);

            $stmt->bindParam(':email', $data['email']);
            $stmt->bindParam(':pwd', $data['pwd']);
            $stmt->execute();
            

            $rowCount = $stmt->rowCount();

            if($rowCount == 0){
                return "Senha ou email incorreto";
            }else{
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                return $result;
            }

        }catch(PDOException $th){
            echo $th->getMessage();
        }
    }
}