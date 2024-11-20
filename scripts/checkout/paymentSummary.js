import { cart } from "../../data/cart.js";
import { getProducts } from "../../data/products.js";
import { getDeliveryDetails } from "../../data/deliveryDetails.js";
import { centsChangeMoney } from "../utils/money.js";


export function renderPaymentSummary(){
    let productPriceCents = 0;
    let shippingPriceCents = 0;
    cart.forEach((cartItem)=>{
        const product = getProducts(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity;

        const deliveryOption = getDeliveryDetails(cartItem.deliveryDetailsId);
        shippingPriceCents += deliveryOption.priceCents;
    });
    
    const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTaxCents*0.1;
    const totalCents = totalBeforeTaxCents + taxCents;

    let paymentSummaryHTML = `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cart.length}):</div>
            <div class="payment-summary-money">$${centsChangeMoney(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${centsChangeMoney(shippingPriceCents)}</div>
          </div>


          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${centsChangeMoney(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${centsChangeMoney(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${centsChangeMoney(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
        `;
        document.querySelector('.js-payment-summary')
          .innerHTML = paymentSummaryHTML;
}