<?php
session_start();
require 'db.php';

$data = json_decode(file_get_contents('php://input'), true);

if (empty($data['email']) || empty($data['password'])) {
    echo json_encode(['success' => false, 'message' => 'Email and password are required.']);
    exit;
}

$email = strtolower(trim($data['email']));
$stmt = $conn->prepare('SELECT id, firstname, lastname, age, gender, phone, address, city, email, password_hash FROM users WHERE email = ?');
$stmt->bind_param('s', $email);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();
$stmt->close();

if (!$user || !password_verify($data['password'], $user['password_hash'])) {
    echo json_encode(['success' => false, 'message' => 'Invalid credentials.']);
    exit;
}

unset($user['password_hash']);
$_SESSION['user'] = $user;

echo json_encode(['success' => true, 'user' => $user]);
$conn->close();
