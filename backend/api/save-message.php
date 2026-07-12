<?php
require_once 'config.php';

$input = json_decode(file_get_contents('php://input'), true);
$response = ['success' => false, 'message' => ''];

if (!$input) {
    $response['message'] = 'Data tidak valid';
    echo json_encode($response);
    exit;
}

if (empty($input['name']) || empty($input['email']) || empty($input['message'])) {
    $response['message'] = 'Nama, Email, dan Pesan wajib diisi';
    echo json_encode($response);
    exit;
}

$message = [
    'id' => time(),
    'name' => trim($input['name']),
    'email' => trim($input['email']),
    'message' => trim($input['message']),
    'timestamp' => date('Y-m-d H:i:s')
];

if (saveMessage($message)) {
    $response['success'] = true;
    $response['message'] = 'Pesan berhasil dikirim!';
    $response['data'] = $message;
} else {
    $response['message'] = 'Gagal menyimpan pesan';
}

echo json_encode($response);
?>