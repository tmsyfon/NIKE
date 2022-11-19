var cartObj = null; // global pointer to cart
var cartCI = -1;
var cartValueObj = 0;
window.addEventListener('load', (event) => {
    console.log('1page is fully loaded');
    cart_initCart();
});

function create_nav_cart() {
	cart_initCart();
	let rightcart = document.getElementById("rightcart");
	console.log(rightcart);
	let template = "";
	cartObj.forEach((item) => {
		template += `<div class="row d-flex align-items-center">
                        <div class="col-md-4 col-lg-4 col-xl-4">
                            <img src="${item.pic[0]}" class="img-fluid">
                        </div>
                        <div class="col-md-5 col-lg-5 col-xl-5 p-0">
                            <h6 class="text-black mb-0"><b>${item.name}</b></h6>
                            <h6 class="text-muted m-0">รองเท้าผู้ชาย</h6>
                            <h6 class="text-muted">White/Black/Dark Powder Blue</h6>
                            <h6 class="text-muted">ไซส์</h6>
                        </div>
                        <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                            <h6 class="mb-5">฿6,490</h6>
                            <i class="fa-regular fa-trash-can" id="trash"></i>
                        </div>
                    </div>
                    <hr class="divider">`;
	  
	  });
	  rightcart.innerHTML = template;
}