<html>
    <head>
        <meta charset="UTF-8">
        <title>Products</title>
        <link rel="stylesheet" href="../otherTabs/products/products.css">
        <link rel="stylesheet" href="../../index.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
    </head>
    <body>
        <div class="header">
            <h2>Suite Store</h2>
                <div class="links">
                    <a href="../index.html">Home</a> 
                    <a href="./products.php">Products</a>
                    <a href="../otherTabs/category/category.html">Categories</a>
                    <a href="../otherTabs/history/history.html">History</a>
                </div>
        </div>
        <div class="body">
            <div class="leftSide">
                <form action="javascript:void(0);" id="formProduct" onsubmit="prod.save()">
                    <input type="text" id="name" name="prodName" placeholder="Product Name"><br>

                    <input type="number" id="amountProd" name="amount" placeholder="Amount" min="1"><br>

                    <input type="number" id="priceProd" name="price" placeholder="Unit Price" min="1"><br>

                    <select name="category" id="category_code" class="required">
                        <option value=" " disabled selected>Category</option>
                    </select><br>

                    <input type="submit" value="Add Product" id="submitBtn">
                </form>
            </div>
            <div class="rightSide">
                <table id="tableCategory">
                    <tr>
                        <th>Code</th>
                        <th>Product</th>
                        <th>Amount</th>
                        <th>Unit Price</th>
                        <th>Categories</th>
                    </tr>
                    <tbody id='tbody'></tbody>
                </table>
            </div> 
        </div>
        <script src="../otherTabs/products/products.js"></script>
    </body>
</html>