// On définit une classe représentant un panier
class Basket {
  constructor(items = [], totalPrice = 0) {
    this.items = items;
    this.totalPrice = totalPrice;
  }
}
function addToBasket(basket, item) {
  basket.items.push(item);
  basket.totalPrice = basket.totalPrice + item.price;
}
function removeFromBasket(basket, item) {
  for (let i = 0; i < basket.items.length; i++) {
    if (JSON.stringify(item) === JSON.stringify(basket.items[i])) {
      basket.items.splice(i, 1);
      basket.totalPrice = basket.totalPrice - item.price;
      break;
    }
  }
}

function transactionAllowed(userAccount, priceToPay) {
  if (userAccount.balance >= priceToPay) {
    return true;
  }
  return false;
}
function payBasket(userAccount, basket) {
  if (transactionAllowed(userAccount, basket.totalPrice)) {
    userAccount.balance = userAccount.balance - basket.totalPrice;
    console.log("Paiement du panier réussi");
  } else {
    console.log("Paiement du panier échoué");
  }
}

// Exports for use in tests
module.exports = {
  Basket,
  addToBasket,
  removeFromBasket,
  transactionAllowed,
  payBasket
};  

  