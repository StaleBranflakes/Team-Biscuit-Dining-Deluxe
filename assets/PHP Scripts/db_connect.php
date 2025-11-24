<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
function openDatabase(){
    $host = "localhost";
    $port = "5432";
    $dbname = "BiscuitDB";
    $user = "pgadmin";
    $password = "pgadmin";

    try{
        $conn = new PDO("pgsql:host=$host;port=$port;dbname=$dbname", $user, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $conn;

    }catch(PDOException $e){
        die("Could not connect to database: " .$e->getMessage());

    }
} 


?>