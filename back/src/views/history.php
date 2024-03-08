<?php
require_once "../config/config.php";
$sql = "SELECT * FROM ORDERS";
$stmt = Connection::getConnection()->prepare($sql);
$stmt->execute();
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

$sql = 'SELECT * FROM ORDER_ITEM WHERE '
?>
<html>
    <head>
        <meta charset="UTF-8">
        <title>History</title>
        <link rel="stylesheet" href="../otherTabs/history/history.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <link rel="stylesheet" href="../index.css">
        
    </head>
    <body>
        <div class="header">
            <h2>Suite Store</h2>
                <div class="links">
                    <a href="../index.html">Home</a> 
                    <a href="../otherTabs/products/products.html" >Products</a>
                    <a href="../otherTabs/category/category.html">Categories</a>
                    <a href="../otherTabs/history/history.html">History</a>
                </div>    
        </div>
        <div class='modal' id='modal'>
            <div class="modal-header">
                <div class="title">Details</div>
                <button data-close-button class="closeBtn">&times;</button>
            </div>
            <div class="modal-body">

            </div>
        </div>
        <div id='overlay'></div>
        <div class="bodyHistory">
            <table id="historyTable">
                <tr>
                    <th>Code</th>
                    <th>Tax</th>
                    <th>Total</th>
                    <th></th>
                </tr>
            <?php
            //resoli dar uma mudada pra n ficar só no js 
            //quis me desafiar e tentar fazer alguma coisa difernete

            if($result){
                foreach($result as $row){
                    echo "
                <tr>
                    <td>{$row['code']}</td>
                    <td>$ {$row['tax']}</td>
                    <td>$ {$row['total']}</td>
                    <td><button data-modal-target='#modal' href='javascript:;'>Testeee</button></td>
                </tr>
                ";
                }
            }else{
                echo "<tr><td colspan='4'>No data found</td></tr>";
            }
            ?>
            </table>
        </div>
        <!-- <script src="../../index.js"></script> -->
        <script src="../otherTabs/history/history.js"></script>
    </body>
</html>