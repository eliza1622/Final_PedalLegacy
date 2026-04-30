<?php
session_start();
require 'db.php';

if (empty($_SESSION['user'])) {
    echo json_encode(['success' => false, 'message' => 'Not logged in.']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$userId = $_SESSION['user']['id'];

if (empty($data['registrationId']) || empty($data['paymentMethod'])) {
    echo json_encode(['success' => false, 'message' => 'Missing required payment fields.']);
    exit;
}

$paymentDatetime = !empty($data['paymentDateTime']) ? date('Y-m-d H:i:s', strtotime($data['paymentDateTime'])) : null;
$method = $data['paymentMethod'];

$ccName   = $method === 'Credit Card' ? ($data['ccName'] ?? null) : null;
$ccMasked = $method === 'Credit Card' ? ($data['ccNumberMasked'] ?? null) : null;
$ccExpiry = $method === 'Credit Card' ? ($data['ccExpiry'] ?? null) : null;
$gcashName   = $method === 'GCash' ? ($data['gcashName'] ?? null) : null;
$gcashNumber = $method === 'GCash' ? ($data['gcashNumber'] ?? null) : null;
$paypalEmail = $method === 'PayPal' ? ($data['paypalEmail'] ?? null) : null;
$paypalName  = $method === 'PayPal' ? ($data['paypalName'] ?? null) : null;

$stmt = $conn->prepare('INSERT INTO payments
    (registration_id, user_id, payment_method, payment_status, amount,
     cc_cardholder_name, cc_number_masked, cc_expiry,
     gcash_name, gcash_number,
     paypal_email, paypal_name, payment_datetime)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)');

$stmt->bind_param(
    'iissississsss',
    $data['registrationId'],
    $userId,
    $method,
    $data['paymentStatus'],
    $data['amount'],
    $ccName,
    $ccMasked,
    $ccExpiry,
    $gcashName,
    $gcashNumber,
    $paypalEmail,
    $paypalName,
    $paymentDatetime
);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Payment saved.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to save payment.']);
}

$stmt->close();
$conn->close();
