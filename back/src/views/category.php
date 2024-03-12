
<html>
    <head>
        <meta charset="UTF-8">
        <title>Categories</title>
        <link rel="stylesheet" href="../../index.css">
        <link rel="stylesheet" href="../otherTabs/category/category.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
        
    </head>
    <body>
        <div class="header">
            <h2>Suite Store</h2>
                <div class="links">
                    <a href="../../index.html">Home</a>
                    <a href="../otherTabs/products/products.html" >Products</a>
                    <a href="./category.php">Categories</a>
                    <a href="../otherTabs/history/history.html">History</a>
                </div>
        </div>
        <div class="body">
            <div class="leftSide">
                <form action="javascript:void(0);" id="formCategory" onsubmit="app.save();">

                    <!-- <input type="hidden" id="code"><br> -->
                    
                    <input type="text" id="name" name="name" placeholder="Category Name"><br>

                    <input type="number" id="tax" name="tax" placeholder="Tax (%)" step="0.1" min="0"><br>

                    <input type="submit" value="Add Category" id="submitBtn">
                </form>
            </div>
            <div class="rightSide">
                <div class="classTable">
                    <table id="tableCategory">
                        <tr>
                            <th>Code</th>
                            <th>Category</th>
                            <th>Tax (%)</th>
                            <th></th>
                        </tr>
                        <!--
                        <tr id="tableRows">
                            <td>Teste</td>
                            <td>Teste</td>
                            <td>Teste</td>
                        </tr>
                    -->
                    <tbody id="tbody">
                        <tr>
                          
                        </tr>
                    </tbody>
                    </table>
                    <!--<script>
                        showData()
                    </script>-->
                </div>
            </div>
        </div>
        <script src="../otherTabs/category/category.js"></script>
    </body>
</html>