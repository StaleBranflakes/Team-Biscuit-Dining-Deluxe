<?php
    error_reporting(E_ALL);
    ini_set('display_errors', 1);

    $uName1  = $_POST['uName'] ?? '';
    $pw1     = $_POST['password'] ?? '';

    if (!$uName1 || !$pw1) {
        header("Location: Login.html?msg=" . urlencode("Missing username or password"));
        exit;
    }
function openDatabase(&$conID, &$dbname){
    $host = "localhost";
    $dbname = "BiscuitDB";
    $usr = "root";
    $pw = "";

    $conID = new mysqli($host, $usr, $pw, $dbname);

    if ($conID->connect_error) {
        die("Connection failed: " . $conID->connect_error);
    }
}
    //main execution of functions
    openDatabase($conID, $dbname);


    $uName1 = $conID->real_escape_string($uName1);
    $pw1    = $conID->real_escape_string($pw1);

    $sql = "SELECT * FROM users WHERE uName = '$uName1' AND password = 'XXXX'";
    $result = $conID->query($sql);
    $conID->close();
    
    
?>