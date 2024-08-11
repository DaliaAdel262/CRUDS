var productName = document.getElementById("ProductName");
var productPrice = document.getElementById("ProductPrice");
var productDesc = document.getElementById("ProductDesc");
var productCat = document.getElementById("ProductCat");
var productTable = document.getElementById("productTable");
var buttonChange = document.getElementById("ButtonChange");
var cancelButton = document.getElementById("CancelButton");
var productToUpdate
var regexSatisfied = false
var Products = []

//TODO Displaying items from local storage
if(localStorage.getItem("Products")!=null){
    Products=JSON.parse(localStorage.getItem("Products"));
    displayProducts(Products);
}

//TODO toggles button action and changes action based on user's choice
function buttonAction(){
    if (regexSatisfied){

        productName.classList.remove("is-valid");
        productPrice.classList.remove("is-valid");
        productDesc.classList.remove("is-valid");
        productCat.classList.remove("is-valid");

        if(buttonChange.textContent=="Update Product"){
            updateProduct(productToUpdate);
            clearProduct();
            buttonChange.textContent="Add Product";
            cancelButton.classList.replace("d-inline","d-none");
        }
        else{
            addProduct();
        }
    }
    else{
        alert("Please enter input correctly");
    }
}

//TODO cancels update action
function cancelUpdate(){
    clearProduct();
    cancelButton.classList.replace("d-inline","d-none");
    buttonChange.textContent="Add Product";
}

//TODO clears input values
function clearProduct(){
    productName.value="";
    productPrice.value="";
    productDesc.value="";
    productCat.value="";
}

//TODO adds product to local storage
function addProduct(){
    var product = {
        name : productName.value,
        price : productPrice.value,
        desc : productDesc.value,
        cat : productCat.value
    }
    Products.push(product);
    localStorage.setItem("Products",JSON.stringify(Products));
    displayProducts(Products);
    clearProduct();
}

//TODO displays products 
function displayProducts(arrayOfItems){
    var box=``;
    for(var i=0;i<arrayOfItems.length;i++){
        box+= `<tr>
               <td>${i+1}</td>
               <td>${arrayOfItems[i].name}</td>
               <td>${arrayOfItems[i].price}</td>
               <td>${arrayOfItems[i].desc}</td>
               <td>${arrayOfItems[i].cat}</td>
               <td><button class="btn" onclick="deleteProduct(${i})"><i class="fa-solid fa-trash"></i></button>
               <button class="btn" onclick="autoFill(${i})"><i class="fa-solid fa-pencil"></i></button></td>
              </tr>`
    }
    
    productTable.innerHTML = box; 
}

//TODO deletes products
function deleteProduct(index){
    Products.splice(index,1);
    localStorage.setItem("Products",JSON.stringify(Products));
    displayProducts(Products);
}

//TODO autofills form for update
function autoFill(index){
    productName.value = Products[index].name;
    productPrice.value = Products[index].price;
    productDesc.value = Products[index].desc;
    productCat.value = Products[index].cat;
    buttonChange.textContent = "Update Product";
    cancelButton.classList.replace("d-none","d-inline");
    productToUpdate = index;
}

//TODO updates selected product
function updateProduct(index){
    Products[index].name = productName.value;
    Products[index].price = productPrice.value;
    Products[index].desc = productDesc.value;
    Products[index].cat = productCat.value;
    localStorage.setItem("Products",JSON.stringify(Products));
    displayProducts(Products);
}

//TODO searches for product
function searchProduct(term){
    var matchingProducts=[]
    for(var i=0;i<Products.length;i++){
        if(Products[i].name.toLowerCase().includes(term.toLowerCase())){
            matchingProducts.push(Products[i]);
        }
    }
    displayProducts(matchingProducts);
}

//TODO checks regex
function checkRegex(inputType){
    var regx;
    var regxCorrection = inputType.nextElementSibling;
    console.log(regxCorrection);
    if(inputType==productName || inputType==productDesc || inputType==productCat){
        regx = /^([A-Z]|[a-z]){1,20}$/
    }
    else if (inputType==productPrice){
        regx = /^([1-9][0-9][0-9]|1[0-4][0-9][0-9]|1500)$/
    }

    if(regx.test(inputType.value)){
        regxCorrection.innerHTML = '';
        inputType.classList.remove("is-invalid");
        inputType.classList.add("is-valid");
        regexSatisfied = true;
    }
    else{
        if(inputType==productPrice){
            regxCorrection.innerHTML = "Please enter a number from 100-1500";
        }
        else{
            regxCorrection.innerHTML = "Please enter alphabetical letters only";
        }

        inputType.classList.remove("is-valid");
        inputType.classList.add("is-invalid");
        regexSatisfied = false;
    }
    
}