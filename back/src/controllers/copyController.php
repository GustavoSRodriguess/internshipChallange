<?php
require_once "../config/config.php";

header('Content-Type: application/json; charset=utf-8');

function copyCartItemsToOrder() {
    try {
        $conn = Connection::getConnection();
        $conn->beginTransaction();

        $stmt = $conn->prepare("INSERT INTO ORDERS (TOTAL, TAX) VALUES ((SELECT SUM(total) FROM CART), ?)");
        $stmt->execute([$_POST['tax']]);
        $orderCode = $conn->lastInsertId(); 
        
        $stmt = $conn->prepare("INSERT INTO ORDER_ITEM (ORDER_CODE, PRODUCT_CODE, AMOUNT, PRICE, TAX) SELECT ?, PROD, AMOUNT, PRICE, TAX FROM CART");
        $stmt->execute([$orderCode]);

        $conn->commit();
        echo json_encode(['success' => true]);
    } catch (PDOException $e) {
        $conn->rollBack();
        echo json_encode(["error" => $e->getMessage()]);
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['finish_order'])) {
    copyCartItemsToOrder();
} else {
    echo json_encode(["error" => "Invalid request method"]);
}
?>