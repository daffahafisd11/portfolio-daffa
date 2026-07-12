<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

define('DATA_FILE', __DIR__ . '/../data/messages.json');

$dataDir = __DIR__ . '/../data';
if (!is_dir($dataDir)) {
    mkdir($dataDir, 0777, true);
}

if (!file_exists(DATA_FILE)) {
    file_put_contents(DATA_FILE, json_encode([], JSON_PRETTY_PRINT));
}

function saveMessage($data) {
    $messages = json_decode(file_get_contents(DATA_FILE), true) ?: [];
    $messages[] = $data;
    return file_put_contents(DATA_FILE, json_encode($messages, JSON_PRETTY_PRINT));
}
?>