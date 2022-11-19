var cartObj = null; // global pointer to cart
var cartCI = -1;
function getLocalData(name)
{
    return localStorage.getItem(name)
}
function setLocalData(name,value)
{
    if (value!=null)
        localStorage.setItem(name,value);
    else
        localStorage.removeItem(name);
}
function cart_initCart() 
{
    cartObj = new Array();
    cartCI = 0;
    // Check in browser memory if there are a saved cart
    if (getLocalData("USER_CART")!=null)
    {
    // if previoys cart is present load it
        cartCI = getLocalData("USER_CART_CI");
        cartObj = JSON.parse(getLocalData("USER_CART"));
        console.log(cartObj);
    }
    else
    {
        console.log("Cart is empty!");
    }
}