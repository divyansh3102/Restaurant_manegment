let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addItemToCart() {
    const tableselct = document.getElementById('table-select');
    const vegSelect = document.getElementById('veg-select');
    const nonvegSelect = document.getElementById('nonveg-select');
    let selectedItem;
        if(tableselct.value){
    selectedItem=tableselct.value;
    tableselct.selectedIndex=0;
    }
   else if (vegSelect.value) {
        selectedItem = vegSelect.value.split('|');
        vegSelect.selectedIndex = 0; // Reset selection
    } else if (nonvegSelect.value) {
        selectedItem = nonvegSelect.value.split('|');
        nonvegSelect.selectedIndex = 0; // Reset selection
    } else {
        alert('Please select an item.');
        return;
    }
    const tableno = selectedItem[0];
    const itemName = selectedItem[0];
    const itemPrice = parseFloat(selectedItem[1]);
    const itemIndex = cart.findIndex(item => item.name === itemName);

    if (itemIndex > -1) {
        cart[itemIndex].quantity += 1;
    } else {
        cart.push({table :tableno , name: itemName, price: itemPrice, quantity: 1 });
        console.log(cart);
        localStorage.setItem("cart",JSON.stringify(cart));
    }
    // useEffect(() => {
    // localStorage.setItem("theCart", JSON.stringify(state.cart));
    // }, [state.cart]);
}

function updateCartView() {

    const cartContent = document.querySelector('#cart-items tbody');
    const cartTotal = document.getElementById('total-price');
    let totalPrice = 0;

    cartContent.innerHTML = '';

    if (cart.length === 0) {
        cartContent.innerHTML = '<tr><td colspan="5">Your cart is empty.</td></tr>';
        cartTotal.textContent = '0.00';
        return;
    }

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td> ${item.table}</td>
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>
                <button onclick="updateQuantity(${index}, 'decrease')">-</button>
                ${item.quantity}
                <button onclick="updateQuantity(${index}, 'increase')">+</button>
            </td>
            <td>$${itemTotal.toFixed(2)}</td>
            <td><button onclick="removeItem(${index})">Remove</button></td>
        `;
        cartContent.appendChild(row);
    });

    cartTotal.textContent = totalPrice.toFixed(2);
}

function updateQuantity(index, action) {
    if (action == 'increase') {
        cart[index].quantity += 1;
    } else if (action == 'decrease' && cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        removeItem(index);
        return;
    }
    // localStorage.setItem('theCart', JSON.stringify(state.cart));
    updateCartView();
}

function removeItem(index) {
    cart.splice(index, 1);
    // localStorage.setItem('theCart', JSON.stringify(state.cart));
    updateCartView();
}

function placeOrder() {
    if (cart.length === 0) {
        alert('Your cart is empty.');
        return;
    }

    alert('Order placed successfully!');
    cart = [];
    // localStorage.setItem('theCart', JSON.stringify(state.cart));
    updateCartView();
}

window.addEventListener('load', updateCartView);