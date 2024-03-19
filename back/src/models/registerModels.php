<?php

require_once "../config/config.php";

class Register extends Connection{
    public static function saveNewUser($data){
        try{
            $email = $data['email'];
            $stmt_email = 'SELECT * FROM USERS WHERE email = :email';
            $stmt_email = Connection::getConnection()->prepare($stmt_email);
            $stmt_email->bindParam(':email', $email);
            $stmt_email->execute();
            $user = $stmt_email->fetch(PDO::FETCH_ASSOC);
            if($user){
                return "Email alresy in use";
            }else{
                $sql = 'INSERT INTO USERS (username, email, pwd) VALUES (:username, :email, :pwd)';
                $stmt = COnnection::getConnection()->prepare($sql);
                $stmt->bindParam(':username', $data['username']);
                $stmt->bindParam(':email', $data['email']);
                $stmt->bindParam(':pwd', $data['pwd']);
                $stmt->execute();
                return true;
            }


        }catch(PDOException $th){
            echo $th->getMessage();
        }
    }
}

