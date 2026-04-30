<?php
session_start();
require 'db.php';

if (empty($_SESSION['user'])) {
    echo json_encode(['success' => false, 'message' => 'Not logged in.']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$userId = $_SESSION['user']['id'];

$required = ['raceId','raceName','raceDate','raceLocation','racePrice','prizePool',
             'firstName','lastName','age','gender','phone','address','city',
             'email','emergencyName','emergencyNumber','bikeCategory'];

foreach ($required as $field) {
    if (!isset($data[$field]) || $data[$field] === '') {
        echo json_encode(['success' => false, 'message' => "Missing field: $field"]);
        exit;
    }
}

$paymentDatetime = !empty($data['paymentDateTime']) ? date('Y-m-d H:i:s', strtotime($data['paymentDateTime'])) : null;

$stmt = $conn->prepare('INSERT INTO registrations
    (user_id, race_id, race_name, race_category, race_date, race_location, race_price, prize_pool,
     payment_status, payment_method, payment_datetime,
     firstname, lastname, age, gender, phone, address, city, email,
     emergency_name, emergency_number, bike_category, medical_conditions)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)');

$stmt->bind_param(
    'iissssiiissssssssssssss',
    $userId,
    $data['raceId'],
    $data['raceName'],
    $data['raceCategory'],
    $data['raceDate'],
    $data['raceLocation'],
    $data['racePrice'],
    $data['prizePool'],
    $data['paymentStatus'],
    $data['paymentMethod'],
    $paymentDatetime,
    $data['firstName'],
    $data['lastName'],
    $data['age'],
    $data['gender'],
    $data['phone'],
    $data['address'],
    $data['city'],
    $data['email'],
    $data['emergencyName'],
    $data['emergencyNumber'],
    $data['bikeCategory'],
    $data['medicalConditions']
);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Registration saved.', 'registration_id' => $stmt->insert_id]);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to save registration.']);
}

$stmt->close();
$conn->close();
