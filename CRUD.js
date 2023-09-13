var productsContainer = [];
if (localStorage.getItem("ourProducts") != null) {
    productsContainer = JSON.parse(localStorage.getItem("ourProducts"))
    displayProducts();
}
var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDecsriptionInput = document.getElementById("productDescription");

function addProduct() {
    if (validate() == true) {
        if (document.getElementById("mainBtn").innerHTML == "addProduct") {


            var product = {
                name: productNameInput.value,
                price: productPriceInput.value,
                category: productCategoryInput.value,
                description: productDecsriptionInput.value
            }
            productsContainer.push(product)
        }
        else if (document.getElementById("mainBtn").innerHTML == "updateProduct") {
            productsContainer[selectedProductIndex].name = productNameInput.value;
            productsContainer[selectedProductIndex].price = productPriceInput.value;
            productsContainer[selectedProductIndex].category = productCategoryInput.value;
            productsContainer[selectedProductIndex].description = productDecsriptionInput.value;

        }
        //store data as string by using json.stringify()=>from array to string;
        localStorage.setItem("ourProducts", JSON.stringify(productsContainer));
        console.log(productsContainer);
        clearForm();
        displayProducts();

    }
    else {
        alert("productName should start with capital char");
    }

}
function clearForm() {
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDecsriptionInput.value = "";
}
function displayProducts() {

    var cartoona = ``;
    for (var i = 0; i < productsContainer.length; i++) {


        cartoona += `   <tr>
<td>${i}</td>
<td>${productsContainer[i].name}</td>
<td>${productsContainer[i].price}</td>
<td>${productsContainer[i].category}</td>
<td>${productsContainer[i].description}</td>
<td><button  onclick="updateProduct(${i});" class="btn btn-outline-info">Update</button></td>
<td><button onclick="deleteProduct(${i});"class="btn btn-outline-danger">Delete</button></td>
</tr>`;

    }
    document.getElementById("tableBody").innerHTML = cartoona;

}
function deleteProduct(index) {
    productsContainer.splice(index, 1)
    displayProducts();
    localStorage.setItem("ourProducts", JSON.stringify(productsContainer));
}
function searchProduct(term) {
    var cartoona = ``;
    for (var i = 0; i < productsContainer.length; i++) {
        if (productsContainer[i].name.toLowerCase().includes(term.toLowerCase()) == true) {
            cartoona += `   <tr>
<td>${i}</td>
<td>${productsContainer[i].name}</td>
<td>${productsContainer[i].price}</td>
<td>${productsContainer[i].category}</td>
<td>${productsContainer[i].description}</td>
<td><button onclick="updateProduct(${i});"class="btn btn-outline-info">Update</button></td>
<td><button onclick="deleteProduct(${i});"class="btn btn-outline-danger">Delete</button></td>
</tr>`;
        }
    }
    document.getElementById("tableBody").innerHTML = cartoona;
}
function updateProduct(index) {
    productNameInput.value = productsContainer[index].name;
    productPriceInput.value = productsContainer[index].price;
    productCategoryInput.value = productsContainer[index].category;
    productDecsriptionInput.value = productsContainer[index].description;
    localStorage.setItem("ourProducts", JSON.stringify(productsContainer));
    document.getElementById("mainBtn").innerHTML = "updateProduct";
    selectedProductIndex = index;
    document.getElementById("mainBtn").addEventListener("click", function () {
        document.getElementById("mainBtn").innerHTML = "Add Product";
    });
}
function validate() {

    var regex = /[A-Z]/;
    if (regex.test(productNameInput.value) == true) {
        return true;
    }
    else {

        return false;
    }
}
