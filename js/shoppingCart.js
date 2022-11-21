var cartObj = null; // global pointer to cart
var cartCI = -1;
var cartValueObj = 0;
window.addEventListener('load', (event) => {
    console.log('1page is fully loaded');
    cart_initCart();
});

function create_cart() {
	cart_getValue_v2();
	let boxcart = document.getElementById("boxcart");
	console.log(boxcart);
	let template = "";
	cartObj.forEach((item) => {
		template += `<div class="row mb-4 d-flex justify-content-between align-items-center">
                        <div class="col-md-2 col-lg-2 col-xl-2">
                            <img src="${item.pic}" class="img-fluid rounded-3">
                        </div>
                        <div class="col-md-3 col-lg-3 col-xl-3">
                            <h6 class="text-black mb-0"><b${item.name}</b></h6>
                            <h6 class="text-muted">${item.type}</h6>
                            <h6 class="text-muted">${item.color}</h6>
                            <h6 class="text-muted">ไซส์ -</h6>
                        </div>
                        <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                            <button class="btn btn-link px-2" 
                            onclick="this.parentNode.querySelector('input[type=number]').stepDown()"
                            cart_updateQtordInRow_v2(${cartObj.indexOf(item)},this.parentNode.querySelector('input[type=number]').value);
                            cart_updateprice(${cartObj.indexOf(item)});}">
                                <i class="fa-solid fa-minus"></i>
                            </button>
                            <input id="form1" min="0" name="quantity" value="1" type="number" class="form-control form-control-sm" />
                            <button class="btn btn-link px-2" 
                            onclick="this.parentNode.querySelector('input[type=number]').stepUp()"
                            cart_updateQtordInRow_v2(${cartObj.indexOf(item)},this.parentNode.querySelector('input[type=number]').value);
                            cart_updateprice(${cartObj.indexOf(item)});}">
                                <i class="fa-solid fa-plus"></i>
                            </button>
                        </div>
                        <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                            <h6 class="mb-0" id="priceitem">${item.total}</h6>
                        </div>
                        <div class="col-md-1 col-lg-1 col-xl-1 text-start">
                            <i class="fa-regular fa-trash-can" id="trash" onclick="cart_removeCartRow_v3(${cartObj.indexOf(item)})"></i>
                        </div>
                    </div>
                    <hr class="my-4">`;
	  
	  });
	  boxcart.innerHTML = template;
}

function create_nav_cart() {
	cart_initCart();
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
                            <h6 class="text-muted mt-2">ไซส์ US 7</h6>
                            <h6 class="text-muted">x${item.QTORD}</h6>
                        </div>
                        <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                            <h6 class="mb-5">${item.price}</h6>
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

function cart_initCart() {
	cartObj = new Array();
	cartCI = 0;
	// Check in browser memory if there are a saved cart
	if (getLocalData("USER_CART")!=null) {
    // if previoys cart is present load it
		cartCI = getLocalData("USER_CART_CI");
		cartObj = JSON.parse(getLocalData("USER_CART"));
		console.log(cartObj);
	}
	else {
		console.log("Cart is empty!");
	}
}

function addItemInCart(prod_id,qtord,price,name,pic,type,color) {
    // qtord is quantity to order
    // prod_id is the sku or other prod_id
   // price is the unitary price
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

		// add new item to cart
		cartObj[cartCI++] = newRow;
	}
	
   //save cart in localStorage
	setLocalData("USER_CART",JSON.stringify(cartObj));
	setLocalData("USER_CART_CI",cartCI);
	//create cart
	cart_initCart();

}

function cart_getValue_v2() {

	cart_initCart();
	var totRowWithVAT = 0;
	for (var r of cartObj) // iterate all the item
	{
	    if (r==null) continue; // Removed ROW - ignore it

	    var price = parseFloat(r["total"]);
		
	    totRowWithVAT = totRowWithVAT + (price);
	}

	cartValueObj = totRowWithVAT;
	let product = document.getElementById("smallprice");
	product.innerHTML = cartValueObj;
	if (cartCI == 0){
	let total = document.getElementById("sumprice");
	total.innerHTML = cartValueObj;
	}
	else{
		let total = document.getElementById("sumprice");
	total.innerHTML = cartValueObj+100;
	}

}

function cart_removeCartRow_v2(rowid) {
	cartObj.splice(rowid, 1); // sign row as invalid
	cartCI--;
	setLocalData("USER_CART",JSON.stringify(cartObj));
	setLocalData("USER_CART_CI",cartCI);
	create_nav_cart();
}

function cart_removeCartRow_v3(rowid) {
	cartObj.splice(rowid, 1); // sign row as invalid
	cartCI--;
	setLocalData("USER_CART",JSON.stringify(cartObj));
	setLocalData("USER_CART_CI",cartCI);
    create_cart();
}

function cart_updateQtordInRow_v2(rowIndex,newQtord) {
   // like add item this function fail if qtord is not valid
    	newQtord = parseFloat(newQtord);
	if (!(newQtord > 0)) {
             alert('insert positive value' );
  
	    return -1;
	}
	
  	// update cart
	    cartObj[rowIndex]["QTORD"] = newQtord;
		cartObj[rowIndex]["total"] = newQtord*cartObj[rowIndex]["price"];
     
	 // update memory
	setLocalData("USER_CART",JSON.stringify(cartObj));
	cart_getValue_v2();
}

function cart_updateprice(rowid) {

	let price_id = document.getElementById("priceitem"+rowid);
	price_id.innerHTML = cartObj[rowid]["total"];
	
}
