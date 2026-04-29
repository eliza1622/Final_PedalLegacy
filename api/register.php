<?php
session_start();
require 'db.php';

$data = json_decode(file_get_contents('php://input'), true);

$required = ['firstname','lastname','age','gender','phone','address','city','email','password'];
foreach ($required as $field) {
    if (empty($data[$field])) {
        echo json_encode(['success' => false, 'message' => "Missing field: $field"]);
        exit;
    }
}

$email = strtolower(trim($data['email']));
$stmt = $conn->prepare('SELECT id FROM users WHERE email = ?');
$stmt->bind_param('s', $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'Email already exists.']);
    $stmt->close();
    exit;
}
$stmt->close();

$hash = password_hash($data['password'], PASSWORD_BCRYPT);
$stmt = $conn->prepare('INSERT INTO users (firstname, lastname, age, gender, phone, address, city, email, password_hash) VALUES (?,?,?,?,?,?,?,?,?)');
$stmt->bind_param(
    'ssissssss',
    $data['firstname'],
    $data['lastname'],
    $data['age'],
    $data['gender'],
    $data['phone'],
    $data['address'],
    $data['city'],
    $email,
    $hash
);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Account created successfully.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Registration failed.']);
}

$stmt->close();
$conn->close();
