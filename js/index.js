var productName=document.getElementById('productname');
var productPrice=document.getElementById('productprice');
var productcategory=document.getElementById('productcategory');
var productDesc=document.getElementById('productdescription');
var inputs=document.getElementsByClassName('form-control');
var btn=document.getElementById('btn1');
var searchinput=document.getElementById('searchinput');
var alertName=document.getElementById('alertName');
var alertPrice=document.getElementById('alertPrice');



var products=[];
var currentindex=0;

if(JSON.parse(localStorage.getItem('productlist'))!=null){
    products=JSON.parse(localStorage.getItem('productlist'));
    showProduct();
}

btn.onclick=function (){
    if(btn.innerHTML=='Add product'){
        addProduct();
    }else{
        updateproduct();
    }
    
    showProduct();
    Clear();
    
}



//func to add product
function addProduct(){
    var product={
        name:productName.value,
        price:productPrice.value,
        category:productcategory.value,
        desc:productDesc.value
    }
    products.push(product);
    localStorage.setItem('productlist',JSON.stringify(products));
    alert('Data Add Successfuly')
}



function showProduct(){
    var cartona= '';
    for(var i = 0;i < products.length;i++){
        cartona+=`
        <tr>
             <td>${products[i].name}</td>
             <td>${products[i].price}</td>
             <td>${products[i].category}</td>
             <td style="max-width: 250px;white-space: normal;word-wrap: break-word;overflow: hidden;text-overflow: ellipsis;">${products[i].desc}</td>
             <td><button onclick=getproductinfo(${i}) class="btn btn-warning" >Update</td>
             <td><button onclick=deleteproduct(${i}) class="btn btn-danger">Delete</td>
        </tr>        
        `
    }
    document.getElementById('tbody').innerHTML=cartona;
}

function Clear(){
    for(i=0;i<inputs.length;i++){
        inputs[i].value='';
    }
    
}

function deleteproduct(index){
    products.splice(index,1);
    showProduct();
    localStorage.setItem('productlist',JSON.stringify(products));
    alert('Data Deleted Successfuly');
}


searchinput.onkeyup=function(){
  

     var cartona= '';
    for(var i = 0;i < products.length;i++)
        if(products[i].name.toLowerCase().includes(searchinput.value.toLowerCase()))
        {
        cartona+=`
        <tr>
             <td>${products[i].name}</td>
             <td>${products[i].price}</td>
             <td>${products[i].category}</td>
             <td>${products[i].desc}</td>
             <td><button onclick=getproductinfo(${i}) class="btn btn-warning" >Update</td>
             <td><button onclick=deleteproduct(${i}) class="btn btn-danger">Delete</td>
        </tr>        
        `
    }
    document.getElementById('tbody').innerHTML=cartona;
}


function getproductinfo(index){

    currentindex=index;

    var currentproduct=products[index];
    productName.value=currentproduct.name
    productPrice.value=currentproduct.price
    productcategory.value=currentproduct.category
    productDesc.value=currentproduct.desc
    btn.innerHTML='Update Product';

}

function updateproduct(){
    var product={
        name:productName.value,
        price:productPrice.value,
        category:productcategory.value,
        desc:productDesc.value
    }
    products[currentindex]=product;
    localStorage.setItem('productlist',JSON.stringify(products));
    btn.innerHTML='Add Product';
    alert('Data Updated Successfuly');
}


function isvalid(product,alert){
        btn.removeAttribute('disabled');
        product.classList.add('is-valid');
        product.classList.remove('is-invalid');
        alert.classList.add('d-none');
        alert.classList.remove('d-block');
}


function isinvalid(product,alert){
        btn.setAttribute('disabled',true);
        product.classList.remove('is-valid');
        product.classList.add('is-invalid');
        alert.classList.remove('d-none');
        alert.classList.add('d-block');
}


productName.onkeyup=function(){
    var regexName=/(^[A-Z][A-Za-z\s0-90-9]{3,100})$/ ;
    if(regexName.test(productName.value)){
        isvalid(productName,alertName);
    }
    else{
        isinvalid(productName,alertName); 
    }
}


productPrice.onkeyup=function(){
    var regexPrice=/(^[1-90-9]{3,60})$/;
    if(regexPrice.test(productPrice.value)){
        isvalid(productPrice,alertPrice);
    }else{
        isinvalid(productPrice,alertPrice);
    }
}



productcategory.onkeyup=function(){
    var regexCategory=/[A-Za-z0-90-9]{5,50}/;
    if(regexCategory.test(productcategory.value)){
        isvalid(productcategory,alertcategory);
    }else{
        isinvalid(productcategory,alertcategory);
    }
}




productDesc.onkeyup=function(){
    var regexDesc=/[A-Za-z0-9]{10,}/;
    if(regexDesc.test(productDesc.value)){
        isvalid(productDesc,alertDesc);
    }else{
        isinvalid(productDesc,alertDesc);
    }
}








