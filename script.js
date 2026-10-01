// =========================
// PRODUCT DATA
// =========================

const products = [

    {
        id: 1,
        name: "Classic Coffee",
        category: "Beverages",
        price: 4.99,
        icon: "☕",
        description: "Rich and smooth freshly brewed coffee."
    },

    {
        id: 2,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 49.99,
        icon: "🎧",
        description: "Comfortable headphones with clear sound."
    },

    {
        id: 3,
        name: "Canvas Backpack",
        category: "Accessories",
        price: 35.00,
        icon: "🎒",
        description: "A stylish everyday backpack."
    },

    {
        id: 4,
        name: "Smart Watch",
        category: "Electronics",
        price: 79.99,
        icon: "⌚",
        description: "Track your day with a modern smart watch."
    },

    {
        id: 5,
        name: "Ceramic Mug",
        category: "Home",
        price: 14.99,
        icon: "🍵",
        description: "Minimal ceramic mug for your favourite drink."
    },

    {
        id: 6,
        name: "Travel Camera",
        category: "Electronics",
        price: 129.99,
        icon: "📷",
        description: "Compact camera for everyday adventures."
    }

];


// =========================
// CART
// =========================

let cart = [];


// =========================
// HTML ELEMENTS
// =========================

const productContainer =
    document.getElementById("productContainer");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const summaryCount =
    document.getElementById("summaryCount");

const cartTotal =
    document.getElementById("cartTotal");

const checkoutButton =
    document.getElementById("checkoutButton");

const checkoutModal =
    document.getElementById("checkoutModal");

const checkoutItems =
    document.getElementById("checkoutItems");

const checkoutTotal =
    document.getElementById("checkoutTotal");

const closeModal =
    document.getElementById("closeModal");

const placeOrderButton =
    document.getElementById("placeOrderButton");

const cartButton =
    document.getElementById("cartButton");


// =========================
// FORMAT PRICE
// =========================

function formatPrice(price) {

    return `$${price.toFixed(2)}`;

}


// =========================
// RENDER PRODUCTS
// =========================

function renderProducts() {

    productContainer.innerHTML = "";


    products.forEach(product => {

        const card =
            document.createElement("article");


        card.className =
            "product-card";


        card.innerHTML = `

            <div class="product-image">
                ${product.icon}
            </div>

            <div class="product-info">

                <p class="product-category">
                    ${product.category}
                </p>

                <h3>
                    ${product.name}
                </h3>

                <p class="product-description">
                    ${product.description}
                </p>

                <div class="product-bottom">

                    <span class="product-price">
                        ${formatPrice(product.price)}
                    </span>

                    <button
                        class="add-button"
                        data-id="${product.id}"
                    >
                        Add to Cart
                    </button>

                </div>

            </div>

        `;


        productContainer.appendChild(card);

    });


    // Add click events to buttons
    const addButtons =
        document.querySelectorAll(".add-button");


    addButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const productId =
                    Number(button.dataset.id);

                addToCart(productId);

            }
        );

    });

}


// =========================
// ADD TO CART
// =========================

function addToCart(productId) {

    const product =
        products.find(
            item => item.id === productId
        );


    if (!product) {
        return;
    }


    const existingItem =
        cart.find(
            item => item.id === productId
        );


    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }


    renderCart();

}


// =========================
// REMOVE FROM CART
// =========================

function removeFromCart(productId) {

    cart =
        cart.filter(
            item => item.id !== productId
        );


    renderCart();

}


// =========================
// CHANGE QUANTITY
// =========================

function changeQuantity(
    productId,
    change
) {

    const item =
        cart.find(
            product => product.id === productId
        );


    if (!item) {
        return;
    }


    item.quantity += change;


    if (item.quantity <= 0) {

        removeFromCart(productId);

        return;

    }


    renderCart();

}


// =========================
// GET CART ITEM COUNT
// =========================

function getCartCount() {

    return cart.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );

}


// =========================
// GET CART TOTAL
// =========================

function getCartTotal() {

    return cart.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );

}


// =========================
// RENDER CART
// =========================

function renderCart() {

    const count =
        getCartCount();

    const total =
        getCartTotal();


    cartCount.textContent =
        count;

    summaryCount.textContent =
        count;

    cartTotal.textContent =
        formatPrice(total);


    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <p>
                    🛒 Your cart is empty.
                </p>

                <p>
                    Add some products to get started.
                </p>

            </div>

        `;

        checkoutButton.disabled =
            true;

        return;

    }


    checkoutButton.disabled =
        false;


    cartItems.innerHTML = "";


    cart.forEach(item => {

        const cartItem =
            document.createElement("div");


        cartItem.className =
            "cart-item";


        const itemTotal =
            item.price * item.quantity;


        cartItem.innerHTML = `

            <div class="cart-item-info">

                <div class="cart-item-icon">
                    ${item.icon}
                </div>

                <div>

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        ${formatPrice(item.price)}
                        × ${item.quantity}
                    </p>

                </div>

            </div>


            <div class="cart-item-right">

                <span class="cart-item-price">
                    ${formatPrice(itemTotal)}
                </span>

                <div>

                    <button
                        class="remove-button"
                        onclick="changeQuantity(${item.id}, -1)"
                    >
                        −
                    </button>

                    <button
                        class="remove-button"
                        onclick="changeQuantity(${item.id}, 1)"
                    >
                        +
                    </button>

                    <button
                        class="remove-button"
                        onclick="removeFromCart(${item.id})"
                    >
                        Remove
                    </button>

                </div>

            </div>

        `;


        cartItems.appendChild(cartItem);

    });

}


// =========================
// OPEN CHECKOUT MODAL
// =========================

function openCheckout() {

    if (cart.length === 0) {
        return;
    }


    checkoutItems.innerHTML = "";


    cart.forEach(item => {

        const row =
            document.createElement("div");


        row.className =
            "checkout-item";


        const itemTotal =
            item.price * item.quantity;


        row.innerHTML = `

            <span class="checkout-item-name">
                ${item.icon}
                ${item.name}
                × ${item.quantity}
            </span>

            <span class="checkout-item-price">
                ${formatPrice(itemTotal)}
            </span>

        `;


        checkoutItems.appendChild(row);

    });


    checkoutTotal.textContent =
        formatPrice(getCartTotal());


    checkoutModal.classList.add("show");

    checkoutModal.setAttribute(
        "aria-hidden",
        "false"
    );

}


// =========================
// CLOSE CHECKOUT MODAL
// =========================

function closeCheckout() {

    checkoutModal.classList.remove(
        "show"
    );

    checkoutModal.setAttribute(
        "aria-hidden",
        "true"
    );

}


// =========================
// PLACE ORDER
// =========================

function placeOrder() {

    alert(
        "🎉 Order placed successfully! Thank you for shopping with BloomCart."
    );


    cart = [];

    renderCart();

    closeCheckout();

}


// =========================
// EVENT LISTENERS
// =========================

checkoutButton.addEventListener(
    "click",
    openCheckout
);


closeModal.addEventListener(
    "click",
    closeCheckout
);


placeOrderButton.addEventListener(
    "click",
    placeOrder
);


cartButton.addEventListener(
    "click",
    () => {

        document
            .getElementById("cart")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);


// Close modal when clicking outside it

checkoutModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            checkoutModal
        ) {

            closeCheckout();

        }

    }
);


// Close modal with Escape

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeCheckout();

        }

    }
);


// =========================
// INITIALIZE APP
// =========================

renderProducts();

renderCart();