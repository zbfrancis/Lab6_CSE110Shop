// Script.js


window.addEventListener('DOMContentLoaded', () => {
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => storeData(data));
});

function storeData(data) {
    localStorage.setItem('data', JSON.stringify(data));
}

function getCartCount() {
    let cartCount = localStorage.getItem('cartCount');
    if (cartCount != null) {
        document.getElementById('cart-count').textContent = cartCount;
        return Number(cartCount);
    } else {
        document.getElementById('cart-count').textContent = "0";
        return 0;
    }
}

function updateCartCount(num) {
    localStorage.setItem('cartCount', String(num));
}

function getCart() {
    let cart = localStorage.getItem('cart');
    if(cart != null){
        cart = JSON.parse(cart);

        for(i in cart) {
            document.getElementById(String(cart[i])).shadowRoot.getElementById('button')
                .textContent = 'Remove from Cart';
        }
        return cart;
    } else {
        return [];
    }
}

function addToCart(id) {
    cart.push(id);
    localStorage.setItem('cart', JSON.stringify(cart));
}

function removeFromCart(id) {
    let oldCart = JSON.parse(localStorage.getItem('cart'));
    let pos = oldCart.indexOf(id);
    oldCart.splice(pos,1);
    localStorage.setItem('cart', JSON.stringify(oldCart));
    cart = oldCart;
}

function loadAndDisplay(data) {
    for(item in data) {
        let product = document.createElement('product-item');
        product.id = String(item);
        product.shadowRoot.getElementById('image').src = data[item]['image'];
        product.shadowRoot.getElementById('image').alt = data[item]['title'];
        product.shadowRoot.getElementById('price').appendChild(document
            .createTextNode('$'+String(data[item]['price'])));
        product.shadowRoot.getElementById('title').appendChild(document
            .createTextNode(data[item]['title']));
        let btn = product.shadowRoot.getElementById('button');
        btn.addEventListener('click', event => {
            event.preventDefault();
            if(btn.textContent == 'Add to Cart') {
                btn.textContent = 'Remove from Cart';
                updateCartCount(cartCount+1);
                addToCart(product.id);
            } else {
                btn.textContent = 'Add to Cart';
                updateCartCount(cartCount-1);
                removeFromCart(product.id);
            }
            cartCount = getCartCount();
        });
        document.getElementById('product-list').append(product);
    }
}

loadAndDisplay(JSON.parse(localStorage.getItem('data')));
let cartCount = getCartCount();
let cart = getCart();
