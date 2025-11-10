<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
require_once 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $uName = trim($_POST['uName'] ?? '');
    $pw = trim($_POST['password'] ?? '');

    if (!$uName || !$pw) {
        die("Username or password missing.");
    }

    $conn = openDatabase();

    $check = $conn->prepare("SELECT * FROM users WHERE uName = :uName");
    $check->execute([':uName' => $uName]);

    if ($check->rowCount() > 0) {
        die(" Username already exists!");
    }

    $hash = password_hash($pw, PASSWORD_DEFAULT);

    $stmt = $conn->prepare("INSERT INTO users (uName, password) VALUES (:uName, :password)");
    $stmt->execute([
        ':uName' => $uName,
        ':password' => $hash
    ]);

    echo "Registration successful! You can now log in.";
}
?>
