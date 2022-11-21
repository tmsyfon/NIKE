var cartObj = null; // global pointer to cart
var cartCI = -1;
var cartValueObj = 0;
window.addEventListener('load', (event) => {
    console.log('1page is fully loaded');
    cart_initCart();
});

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

function cart_removeCartRow_v2(rowid) {
	cartObj.splice(rowid, 1); // sign row as invalid
	cartCI--;
	setLocalData("USER_CART",JSON.stringify(cartObj));
	setLocalData("USER_CART_CI",cartCI);
	create_nav_cart();
	
}