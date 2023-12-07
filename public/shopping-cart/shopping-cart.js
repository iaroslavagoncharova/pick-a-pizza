import {addUserDataToDom, removeUserDataFromDom} from "../dom.js";
import { logUserOut } from "../logout.js";

window.onload = () => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user, token);

  if (token) {
    addUserDataToDom(user);
    logUserOut();
    const userButton = document.getElementById('user-account');
    if (user.user_level_id === 1) {
      userButton.href = '/my-account/admin';
    } else if (user.user_level_id === 2) {
      userButton.href = '/my-account';
    }
  } else {
    removeUserDataFromDom();
  }
};

const usualNames = [
  'Tasty Tornado',
  'Sizzling Symphony',
  'Funky Fusion',
  'Blissful Bites',
  'Gourmet Galaxy'
];

const glutenfreeNames = [
  'Gluten Guardian',
  'Wheatless Wonder',
  'Purely Parchment',
  'Grainless Gourmet'
];

const ketoNames = [ 
  'Carb Conqueror',
  'Ketogenic Knight',
  'Low-Carb Legend',
  'Keto Crunch',
  'High-Fat Hero'
];


document.addEventListener('DOMContentLoaded', async function () {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await fetch(`/pizzas/${user.user_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(user.user_id);
    const result = await response.json();

  const generatePizzaName = (pizza) => {
    if (pizza.name && pizza.prompt_id !== null) {
      return pizza.name;
    } else {
      if (pizza.dough === 'usual') {
        return usualNames[Math.floor(Math.random() * usualNames.length)];
      } else if (pizza.dough === 'gluten-free') {
        return glutenfreeNames[Math.floor(Math.random() * glutenfreeNames.length)];
      } else if (pizza.dough === 'keto') {
        return ketoNames[Math.floor(Math.random() * ketoNames.length)];
      }
    } 
  };

    const tableBody = document.querySelector('#selected-products tbody');

    console.log(result);

    result.rows.forEach(pizza => {
      const pizzaName = generatePizzaName(pizza);
      console.log(pizza);
      localStorage.setItem('pizzaData', JSON.stringify(pizza));
      const newRow = document.createElement('tr');
      const productCell = document.createElement('td');
      productCell.classList.add('product');
      const productDetails = document.createElement('div');
      productDetails.classList.add('product-details');
      productDetails.innerHTML = `
        <img class="pizza-img" src="../images/pizza-img.png" alt="Pizza Image">
        <div>
          <h4>${pizzaName}</h4>
          <p>${pizza.size.toUpperCase()}-sized pizza with ${pizza.dough} dough</p>
          <p>${result.result4.map(ingredient => ingredient.name).join(', ')}</p>
        </div>`;
      productCell.appendChild(productDetails);

      const quantityCell = document.createElement('td');
      quantityCell.classList.add('quantity');
      const quantitySelection = document.createElement('div');
      quantitySelection.classList.add('quantity-selection');
      quantitySelection.innerHTML = `
        <button id="minus">-</button>
        <p>${pizza.quantity}</p>
        <button id="plus">+</button>`;
      quantityCell.appendChild(quantitySelection);

      const totalCell = document.createElement('td');
      totalCell.classList.add('total');
      totalCell.innerHTML = `<p>${parseFloat(pizza.price) * parseInt(pizza.quantity)}€</p>`;

      const removeCell = document.createElement('td');
      removeCell.classList.add('remove');
      removeCell.innerHTML = `<i class="fa-solid fa-trash remove"></i>`;
      removeCell.addEventListener('click', async function () {
        try {
          const response = await fetch(`/shopping-cart/${pizza.pizza_id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          window.location.reload();
        } catch (error) {
          console.error('Error deleting pizza:', error.message);
        }
      });
      
      newRow.appendChild(productCell);
      newRow.appendChild(quantityCell);
      newRow.appendChild(totalCell);
      newRow.appendChild(removeCell);

      tableBody.appendChild(newRow);
    });

    const receiptTable = document.getElementById('receipt-table');
    const shippingFeeCell = receiptTable.querySelector('.shipping-fee.align-right');
    const paymentFeeCell = receiptTable.querySelector('.payment-fee.align-right');
    const totalCell = receiptTable.querySelector('.total.align-right');

    let totalPizzasPrice = 0;
    result.rows.forEach(pizza => {
      totalPizzasPrice += parseFloat(pizza.price) * parseInt(pizza.quantity);
    });
    const shippingFee = 0;
    const paymentFee = 0.5;

    const totalPrice = totalPizzasPrice + shippingFee + paymentFee;
    shippingFeeCell.textContent = `${shippingFee}€`;
    paymentFeeCell.textContent = `${paymentFee}€`;
    totalCell.textContent = `${totalPrice}€`;
    
    
    
    const openModalBtn = document.getElementById('checkout-btn');
    openModalBtn.addEventListener('click', () => {
      const modal = document.getElementById('paymentModal');
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    });
    const closeModalBtn = document.getElementById('closeModal');
    closeModalBtn.addEventListener('click', () => {
      const modal = document.getElementById('paymentModal');
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
    
    const payButton = document.getElementById("pay-button");
    const paymentStatusElement = document.getElementById("payment-status");
    payButton.addEventListener("click", async function () {
      try {
        const paymentResponse = await simulatePayment();
        
        if (paymentResponse.success) {
          window.location.href = "/checkout";
        } else {
          paymentStatusElement.textContent = "Payment failed. Please try again.";
        }
      } catch (error) {
        console.error("Error processing payment:", error.message);
        paymentStatusElement.textContent = "Please check given info"
      }
    });
    const totalAmountElement = document.getElementById('total-amount');
    totalAmountElement.textContent = `${totalPrice}€`;
    
    async function simulatePayment() {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            const success = Math.random() > 0.95;
      
            if (success) {
              resolve({ success: true });
            } else {

              reject(new Error('Payment failed'));

            }
          }, 500); 
        });
      }
    


    const minusButtons = document.querySelectorAll('#minus');
    const plusButtons = document.querySelectorAll('#plus');

    minusButtons.forEach(button => {
      button.addEventListener('click', async function () {
        try {
          const quantity = button.nextElementSibling.textContent;
          const newQuantity = parseInt(quantity) - 1;
          const response = await fetch(`/shopping-cart/${result.rows[0].pizza_id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({quantity: newQuantity}),
          });
          window.location.reload();
        } catch {
          console.error('Error changing quantity:', error.message);
        }
      })
    });
    plusButtons.forEach(button => {
      button.addEventListener('click', async function () {
        try {
          const quantity = button.previousElementSibling.textContent;
          const newQuantity = parseInt(quantity) + 1;
          const response = await fetch(`/shopping-cart/${result.rows[0].pizza_id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({quantity: newQuantity}),
          });
          window.location.reload();
        } catch {
          console.error('Error changing quantity:', error.message);
        }
      })
    });
    } catch (error) {
    console.error('Error fetching pizzas:', error.message);
  }
});
