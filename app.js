let totalAmount = 0;
let totalQuantity = 0; 

const addToCartButtons = document.querySelectorAll('.add-btn');
addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
});


function addToCart(event) {
    const button = event.target;
    const itemCard = button.closest('.item-card');

    const title = itemCard.querySelector('.item-title').textContent;
    const description = itemCard.querySelector('.item-description').textContent;
    const imageSource = itemCard.querySelector('.item-img-src').src;
    const price = itemCard.querySelector('.item-price').textContent;

    const cartItem = { title: title, description: description, imageSource: imageSource, price: price};
    addItem(cartItem.title,cartItem.description, cartItem.imageSource, cartItem.price);
}


const listContainer = document.querySelector('.cart-list-container');

function addItem(title, description, imageSource, price) {
    const cartItemContainer = document.createElement('li');
    cartItemContainer.classList.add('cart-item-container');

    const imgContainer = document.createElement('img');
    imgContainer.classList.add('min-img');
    imgContainer.src = imageSource;

    const itemTitle = document.createElement('div');
    itemTitle.classList.add('item-title');
    itemTitle.innerText = title;

    const minusIcon = document.createElement('i');
    minusIcon.classList.add('fa-solid', 'fa-minus');

    const quantity = document.createElement('div');
    quantity.classList.add('item-quantity');
    quantity.innerText = 1;

    const plusIcon = document.createElement('i');
    plusIcon.classList.add('fa-sharp', 'fa-solid', 'fa-plus');

    const itemPrice = document.createElement('div');
    itemPrice.classList.add('item-price');
    itemPrice.innerText = price;

    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fas', 'fa-trash');

    cartItemContainer.append(imgContainer, itemTitle, minusIcon, quantity, plusIcon, itemPrice, deleteIcon);
    listContainer.appendChild(cartItemContainer);

    totalAmount = totalAmount + parseInt(price.slice(1));
    document.getElementById('total-price').innerText = `P${totalAmount}`;

    totalQuantity = totalQuantity + 1;
    document.getElementById('item-count').innerText = `${totalQuantity} items`;
}


listContainer.addEventListener('click', deleteItem);
function deleteItem(e) {
    const item = e.target;
    if (item.classList.contains("fa-trash")) {
        const priceElement = item.closest('.cart-item-container').querySelector('.item-price');
        const priceValue = priceElement.textContent;
        const qtyElement = item.closest('.cart-item-container').querySelector('.item-quantity');
        const qtyValue = qtyElement.textContent;
        totalAmount = totalAmount - parseInt(priceValue.slice(1));
        totalQuantity = totalQuantity - qtyValue;
        document.getElementById('total-price').innerText = `P${totalAmount}`;
        document.getElementById('item-count').innerText = `${totalQuantity} items`;        
        const parent = item.parentElement;
        parent.remove();
    }
}


listContainer.addEventListener('click', plusItem);
function plusItem(e) {
const item = e.target;
    if (item.classList.contains("fa-plus")) {
        const priceElement = item.closest('.cart-item-container').querySelector('.item-price');
        const priceValue = priceElement.textContent;
        const qtyElement = item.closest('.cart-item-container').querySelector('.item-quantity');
        const qtyValue = qtyElement.textContent;
        basePrice = parseInt(priceValue.slice(1)) /qtyValue;
        item.closest('.cart-item-container').querySelector('.item-price').innerText = `P${parseInt(priceValue.slice(1)) + basePrice}`;
        item.closest('.cart-item-container').querySelector('.item-quantity').innerText = `${parseInt(qtyValue) + 1}`;
        totalAmount = totalAmount + basePrice;
        document.getElementById('total-price').innerText = `P${totalAmount}`;
        totalQuantity++;
        document.getElementById('item-count').innerText = `${totalQuantity} items`;
    }
}


listContainer.addEventListener('click', minusItem);
function minusItem(e) {
const item = e.target;
    if (item.classList.contains("fa-minus")) {
        const priceElement = item.closest('.cart-item-container').querySelector('.item-price');
        const priceValue = priceElement.textContent;
        const qtyElement = item.closest('.cart-item-container').querySelector('.item-quantity');
        const qtyValue = qtyElement.textContent;
        basePrice = parseInt(priceValue.slice(1)) / qtyValue;
        item.closest('.cart-item-container').querySelector('.item-price').innerText = `P${parseInt(priceValue.slice(1)) - basePrice}`;
        item.closest('.cart-item-container').querySelector('.item-quantity').innerText = `${parseInt(qtyValue) - 1}`;
        totalAmount = totalAmount - basePrice;
        document.getElementById('total-price').innerText = `P${totalAmount}`;
        totalQuantity--;
        document.getElementById('item-count').innerText = `${totalQuantity} items`;
        if (qtyValue == 1) {
            const parent = item.parentElement;
            parent.remove();      
        } 
    }
}