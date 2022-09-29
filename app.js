/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { boughtItem, createItem } from './fetch-utils.js';
import { renderItem } from './render-utils.js';
import { getItem } from './fetch-utils.js';

/* Get DOM Elements */
const shoppingList = document.getElementById('shopping-list');
const errorDisplay = document.getElementById('error-display');
const addItemForm = document.getElementById('add-item-form');

/* State */
let items = [];
let error = null;

/* Events */
addItemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(addItemForm);
    const newItem = {
        item: formData.get('item'),
        quantity: formData.get('quantity'),
    };

    const response = await createItem(newItem);
    error = response.error;
    const item = response.data;

    if (error) {
        displayError();
    } else {
        items.push(item);
        displayItems();
        addItemForm.reset();
    }
});

window.addEventListener('load', async () => {
    const response = await getItem();
    error = response.error;
    items = response.data;

    if (error) {
        displayError();
    }
    if (items) {
        displayItems();
    }
});

/* Display Functions */
function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}

function displayItems() {
    shoppingList.innerHTML = '';

    for (const item of items) {
        const itemEl = renderItem(item);
        shoppingList.append(itemEl);

        itemEl.addEventListener('click', async () => {
            const response = await boughtItem(item.id);
            error = response.error;
            const updatedItem = response.data;

            if (error) {
                displayError();
            } else {
                const index = items.indexOf(item);
                items[index] = updatedItem;
                displayItems();
            }
        });
    }
}
