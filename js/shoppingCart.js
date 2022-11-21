var cartObj = null; // global pointer to cart
var cartItemNum = -1;
var cartTotal = 0;
window.addEventListener('load', (event) => {
    console.log('1page is fully loaded');
    cartLocalCreate();
});

function cartCreate() {
	cartGetValue();
	let boxcart = document.getElementById("boxcart");
	console.log(boxcart);
	let template = "";
	cartObj.forEach((item) => {
        console.log(item)
		template += `<div class="row mb-4 d-flex justify-content-between align-items-center">
                        <div class="col-md-2 col-lg-2 col-xl-2">
                            <img src="${item.pic}" class="img-fluid rounded-3">
                        </div>
                        <div class="col-md-3 col-lg-3 col-xl-3">
                            <h6 class="text-black mb-0"><b>${item.name}</b></h6>
                            <h6 class="text-muted">${item.type}</h6>
                            <h6 class="text-muted">${item.color}</h6>
                            <h6 class="text-muted">ไซส์ US ${item.size}</h6>
                        </div>
                        <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                            <h6 class="text-muted">x${item.QTORD}</h6>
                        </div>
                        <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                            <h6 class="mb-0" id="priceitem${cartObj.indexOf(item)}">฿ ${item.total}</h6>
                        </div>
                        <div class="col-md-1 col-lg-1 col-xl-1 text-start">
                            <i class="fa-regular fa-trash-can" id="maintrash" onclick="cart_removeCartRow_v3(${cartObj.indexOf(item)})"></i>
                        </div>
                    </div>
                    <hr class="my-4">`;
	  
	  });
	  boxcart.innerHTML = template;
}

function createNavCart() {
	cartLocalCreate();
	let cartNavbar = document.getElementById("cart-navbar");
	console.log(cartNavbar);

	let template = "";
	cartObj.forEach((item) => {
		template += `<div class="row d-flex align-items-center">
                        <div class="col-md-4 col-lg-4 col-xl-4">
                            <img src="${item.pic}" class="img-fluid">
                        </div>
                        <div class="col-md-5 col-lg-5 col-xl-5 p-0">
                            <h6 class="text-black mb-0"><b>${item.name}</b></h6>
                            <h6 class="text-muted m-0">${item.type}</h6>
                            <h6 class="text-muted m-0" id="cartnavcolor">${item.color}</h6>
                            <h6 class="text-muted mt-2">ไซส์ US ${item.size}</h6>
                            <h6 class="text-muted">x${item.QTORD}</h6>
                        </div>
                        <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                            <h6 class="mb-5">฿${item.price}</h6>
                            <i class="fa-regular fa-trash-can" id="trash" onclick="cart_removeCartRow_v2(${cartObj.indexOf(item)})"></i>
                        </div>
                    </div>
                    <hr class="divider">`;
	  });
	  cartNavbar.innerHTML = template;
}

function getLocalData(name) {
	return localStorage.getItem(name)
}

function setLocalData(name,value) {
	if (value!=null)
		localStorage.setItem(name,value);
	else
		localStorage.removeItem(name);
}

function cartLocalCreate() {
	cartObj = new Array();
	cartItemNum = 0;
	// Check in browser memory if there are a saved cart
	if (getLocalData("userCart")!=null) {
    // if previoys cart is present load it
		cartItemNum = getLocalData("userCartItemNum");
		cartObj = JSON.parse(getLocalData("userCart"));
		console.log(cartObj);
	}
	else {
		console.log("Cart is empty!");
	}
}

function addItemInCart(prod_id,qtord,price,name,pic,type,color) {
    let temp = new Array()
	cartObj.forEach((item) => {
		temp.push(item.product);
	});
	if (temp.includes(prod_id)){
		cartObj.forEach((item) => {
			if (item.product == prod_id){
				item.QTORD++;
				item.total += item.price;
			}
		});
	}
	else{
		// make new row
		var newRow = new Object();
		newRow["product"] = prod_id;
		newRow["QTORD"] = qtord;
		newRow["price"] = price;
		newRow["name"] = name;
		newRow["pic"] = pic;
		newRow["type"] = type;
        newRow["color"] = color;
		newRow["total"] = qtord*price;
        newRow["size"] = size;

		// add new item to cart
		cartObj[cartItemNum++] = newRow;
	}
	
   //save cart in localStorage
	setLocalData("userCart",JSON.stringify(cartObj));
	setLocalData("userCartItemNum",cartItemNum);
	//create cart
	cartLocalCreate();

}

function cartGetValue() {

	cartLocalCreate();
	var totRowWithVAT = 0;
	for (var r of cartObj)
	{
	    if (r==null) continue;

	    var price = parseFloat(r["total"]);
		
	    totRowWithVAT = totRowWithVAT + (price);
	}

	cartTotal = totRowWithVAT;
	let product = document.getElementById("smallprice");
	product.innerHTML = "฿ " + cartTotal;
	if (cartItemNum == 0) {
        let total = document.getElementById("sumprice");
        total.innerHTML = "฿ " + cartTotal;
	}
	else {
		let total = document.getElementById("sumprice");
        total.innerHTML = "฿ " + (cartTotal + 100);
	}

}

function cart_removeCartRow_v2(rowid) {
	cartObj.splice(rowid, 1);
	cartItemNum--;
	setLocalData("userCart",JSON.stringify(cartObj));
	setLocalData("userCartItemNum",cartItemNum);
	createNavCart();
}

function cart_removeCartRow_v3(rowid) {
	cartObj.splice(rowid, 1);
	cartItemNum--;
	setLocalData("userCart",JSON.stringify(cartObj));
	setLocalData("userCartItemNum",cartItemNum);
    cartCreate();
}

let size = "";
function selectSize(n) {
    size = n;
}
