
<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
require_once 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $uName = trim($_POST['uName'] ?? '');
    $pw = trim($_POST['password'] ?? '');

    if (!$uName || !$pw) {
        header("Location: Login.html?msg=" . urlencode("Missing username or password"));
        exit;
    }

    $conn = openDatabase();

    $stmt = $conn->prepare("SELECT * FROM users WHERE uName = :uName");
    $stmt->execute([':uName' => $uName]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($pw, $user['password'])) {
        // Optional: start a session
        session_start();
        $_SESSION['username'] = $user['uName'];

        echo " Login successful! Welcome, " . htmlspecialchars($user['uName']);
    } else {
        echo "Invalid username or password.";
    }
}
?>

