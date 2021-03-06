window.onload = function DomContent (){
    // Remove Button
    var removeButtons = document.getElementsByClassName ('remove');
    for (var button of removeButtons){
        button.addEventListener ('click',removeItem);
    }
    //  Quantity
    var quantityElements = document.getElementsByClassName ('quantity');
    for (var quantityElem of quantityElements){
        quantityElem.addEventListener ('change',function (e){
            updateTotal ();
        });
    }
    // add button 
    var addButtons = document.getElementsByClassName ('add-btn');
    for (var addButton of addButtons){
        addButton.addEventListener ('click',function (e){
            var addbtn = e.target;
            var shopItem = addbtn.parentElement.parentElement;
            var prix = shopItem.getElementsByClassName ('item-price')[0].innerText;
            var imgSrc = shopItem.getElementsByClassName ('item-img')[0].src;
            addItem (prix, imgSrc);
        })
    }
    // purshase button
    document.getElementsByClassName ("purchase-btn")[0].addEventListener('click', function (){
        alert ("Thank you");
        var cartItems = document.getElementsByClassName ("cart-items")[0];
        while (cartItems.hasChildNodes()){
            cartItems.removeChild (cartItems.firstChild);
        }
    })

}
    // Add to card
function addItem (prix, imgSrc){
    var newCartItem = document.createElement ('div');
    newCartItem.setAttribute("class", "cart-row");
    var curentCartItems = document.getElementsByClassName ("cart-img");
    for (var curentCartItem of curentCartItems){
        var testSrc = curentCartItem.src;
        if (testSrc == imgSrc){
            alert ("This item already added");
            return;
        }
    }
     //cart content
    var newCartItemContent = `
        <img class="cart-img" src="${imgSrc}" alt="">
        <span class="price">${prix}</span>
        <div>
            <input class="quantity" type="number" value="1" min="1">
            <button class="remove">Remove</button>
            
        </div>
    `;
    newCartItem.innerHTML = newCartItemContent;
    var cart = document.getElementsByClassName ('cart-items')[0];
    cart.append (newCartItem);
    newCartItem.getElementsByClassName("remove")[0].addEventListener ('click',removeItem);
    updateTotal ();
    newCartItem.getElementsByClassName("quantity")[0].addEventListener ('change',updateTotal);
}


function removeItem (e){
    var removeClicked = e.target;
    removeClicked.parentElement.parentElement.remove();
    updateTotal ();
}

// total price 
function updateTotal (){
    var cartItems = document.getElementsByClassName ('cart-items')[0];
    var cartRows = cartItems .getElementsByClassName ('cart-row');
    var total = 0;
    for (var cartRow of cartRows){
        var priceElement = cartRow.getElementsByClassName ('price')[0];
        var quantity = cartRow.getElementsByClassName ('quantity')[0];
        var price = parseFloat (priceElement.innerText.replace ('$', ''))*quantity.value
        total += price;
    }
    document.getElementsByClassName ('total')[0].innerText = '$' + total;
}