<?php
session_start();
require 'db.php';

if (empty($_SESSION['user'])) {
    echo json_encode(['success' => false, 'message' => 'Not logged in.']);
    exit;
}

$userId = $_SESSION['user']['id'];
$stmt = $conn->prepare('SELECT * FROM registrations WHERE user_id = ? ORDER BY registered_at DESC');
$stmt->bind_param('i', $userId);
$stmt->execute();
$result = $stmt->get_result();

$rows = [];
while ($row = $result->fetch_assoc()) {
    $rows[] = [
        'raceName'         => $row['race_name'],
        'raceCategory'     => $row['race_category'],
        'raceDate'         => $row['race_date'],
        'raceLocation'     => $row['race_location'],
        'racePrice'        => (int)$row['race_price'],
        'prizePool'        => (int)$row['prize_pool'],
        'paymentStatus'    => $row['payment_status'],
        'paymentMethod'    => $row['payment_method'],
        'firstName'        => $row['firstname'],
        'lastName'         => $row['lastname'],
        'age'              => (int)$row['age'],
        'gender'           => $row['gender'],
        'phone'            => $row['phone'],
        'address'          => $row['address'],
        'city'             => $row['city'],
        'email'            => $row['email'],
        'emergencyName'    => $row['emergency_name'],
        'emergencyNumber'  => $row['emergency_number'],
        'bikeCategory'     => $row['bike_category'],
        'medicalConditions'=> $row['medical_conditions'],
        'registrationDateTime' => date('F j, Y, g:i A', strtotime($row['registered_at']))
    ];
}

echo json_encode(['success' => true, 'registrations' => $rows]);
$stmt->close();
$conn->close();
