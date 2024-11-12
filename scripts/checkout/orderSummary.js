import { cart, deleteCart, totalQuantity, updateDeliveryOption} from '../../data/cart.js';
import { products } from '../../data/products.js'
import { centsChangeMoney } from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryDetails } from '../../data/deliveryDetails.js';

export function render()
{
let cartSummaryHTML = '';
cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let matchingProduct;

    products.forEach((product) => {
        if (product.id === productId) {
            matchingProduct = product;
        }
    });

    let deliveryOptionDetails;
    const deliveryOptionId = cartItem.deliveryDetailsId;
    deliveryDetails.forEach((option) => {
        if (option.id === deliveryOptionId) {
            deliveryOptionDetails = option;
        }
    });
    const today = dayjs();
    const deliveryDate = today.add(deliveryOptionDetails.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');


    cartSummaryHTML += `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
            Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${matchingProduct.image}">

            <div class="cart-item-details">
            <div class="product-name">
                ${matchingProduct.name}
            </div>
            <div class="product-price">
                $${centsChangeMoney(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
                <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">
                Update
                </span>
                <span class="delete-quantity-link link-primary js-delete-quantity" data-product-id="${matchingProduct.id}">
                Delete
                </span>
            </div>
            ${deliveryOptionHTML(matchingProduct, cartItem)}
            </div>
            </div>
        </div>
        </div>`;
});


function deliveryOptionHTML(matchingProduct, cartItem) {
    let html = '';
    deliveryDetails.forEach((deliveryOption) => {
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D');
        const priceString = deliveryOption.priceCents === 0 ?
            'FREE' : centsChangeMoney(deliveryOption.priceCents);
        console.log(deliveryOption.id);
        console.log(cartItem.deliveryDetailsId);
        const isChecked = deliveryOption.id === cartItem.deliveryDetailsId;
        html += `
    <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
                <input type="radio"
                ${isChecked ? 'checked' : ''}
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    ${dateString}
                </div>
                <div class="delivery-option-price">
                    $${priceString} - Shipping
                </div>
                </div>
     </div>
    `
    });
    return html;
}

document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-quantity')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            deleteCart(productId);
            const removeHTML = document.querySelector(`.js-cart-item-container-${productId}`);
            removeHTML.remove();
        }
        );
    });
totalQuantity();

document.querySelectorAll('.js-delivery-option')
  .forEach((element)=>{
    element.addEventListener('click',()=>{
        const {productId, deliveryOptionId} = element.dataset;
        console.log(productId);
        updateDeliveryOption(productId, deliveryOptionId);
        render();
    });
  });
}