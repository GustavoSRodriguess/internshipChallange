<?php
header("Cache-Control: no-cache, must-revalidate");
?>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Suite Store</title>
        <link rel="stylesheet" href="../index.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
        
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
        <div class="body">
            <div class="leftSide">
                <form action="javascript:void(0);" id="shopForm" onsubmit="cart.saveOrder()">
                    <select name="product" id="prod" required onchange="cart.autoComplete()">
                        <option value=" " disabled selected>Product</option>
                    </select><br>

                    <div class="bottonInputs">
                        <input type="number" id="amount" placeholder="Amount" required min="1"><br>

                        <input type="number" id="tax" placeholder="Tax" disabled required><br>

                        <input type="number" id="price" placeholder="Price" disabled required><br>
 
                    </div> 
                    <input type="submit" value="Add Product" id="submitBtn">
                </form>
            </div>

            <!-- acho q vai ser melhor colocar td com a mesma id pro css mas dps vejo isso -->
            <div class="rightSide">
                <table id="productTable">
                    <tr>
                        <th>Product</th>
                        <th>Unite Price</th>
                        <th>Amount</th>
                        <th>Total</th>
                        <th class="btnHead"></th>
                    </tr>
                    <tbody id="tbody"></tbody>
                    <!-- Tem q botar o botao, mas isso da pra fazer quando for fazer ele funcional de uma vez -->
                </table>
                <p id="taxTxt">Tax: </p>
                <p id='totalTxt'>Total: </p>
            <div class="buttons">
                <button class="btnCancell" onclick="cart.clearCart()">Cancel</button>
                <button class="btnFinish" onclick="cart.placeOrder()" name="btnFinish">Finish</button>
            </div>
        </div>
    </div>
    <script src="../index.js"></script>
    
    </body>
</html>