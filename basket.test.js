const {
    testAdd,
    testRemove,
    testAddRemove,
    testPayBasket,
    testAppECommerce,
} = require('./basket');

const { Basket, addToBasket, removeFromBasket, payBasket, transactionAllowed } = require('./basket');

describe('testAdd', () => {
    test('Ajout d\'un article au panier et vérifie le montant total correct', () => {
        const basket = new Basket();
        const item = { name: "Carte mère", price: 100 };
        addToBasket(basket, item);
        expect(basket.items.length).toBe(1);
        expect(basket.totalPrice).toBe(100);
    });

});

describe('testRemove', () => {
    test('Retrait d\'un article du panier et vérifie le montant total correct', () => {
        const basket = new Basket();
        const item = { name: "Carte mère", price: 100 };
        addToBasket(basket, item);
        removeFromBasket(basket, item);
        expect(basket.items.length).toBe(0);
        expect(basket.totalPrice).toBe(0);
    });
});

describe('testAddRemove', () => {
    test('Ajout puis retrait d\'un article du panier et vérifie le montant total correct', () => {
        const basket = new Basket();
        const item = { name: "Carte mère", price: 100 };
        addToBasket(basket, item);
        expect(basket.items.length).toBe(1);
        expect(basket.totalPrice).toBe(100);
        removeFromBasket(basket, item);
        expect(basket.items.length).toBe(0);
        expect(basket.totalPrice).toBe(0);
    });
});

describe('testTransactionAllowed', () => {
    test('Teste le paiement du panier avec un solde suffisant', () => {
        const basket = new Basket();
        const item = { name: "Carte mère", price: 400 };
        addToBasket(basket, item);
        const userAccount = { balance: 500 };
        expect(transactionAllowed(userAccount, basket.totalPrice)).toBe(true);
        payBasket(userAccount, basket);
        expect(userAccount.balance).toBe(100);
    });
    test('Teste le paiement du panier avec un solde insuffisant', () => {
        const basket = new Basket();
        const item = { name: "Carte mère", price: 600 };
        addToBasket(basket, item);
        const userAccount = { balance: 500 };
        expect(transactionAllowed(userAccount, basket.totalPrice)).toBe(false);
        payBasket(userAccount, basket);
        expect(userAccount.balance).toBe(500);
    });
});

describe('testPayBasket', () => {
    test('Teste le paiement du panier avec un solde suffisant puis un solde insuffisant', () => {
        const basket = new Basket();
        const item = { name: "Carte mère", price: 300 };
        addToBasket(basket, item);
        const userAccount = { balance: 500 };
        expect(transactionAllowed(userAccount, basket.totalPrice)).toBe(true);
        payBasket(userAccount, basket);
        expect(userAccount.balance).toBe(200);
        addToBasket(basket, item);
        expect(transactionAllowed(userAccount, basket.totalPrice)).toBe(false);
        payBasket(userAccount, basket);
        expect(userAccount.balance).toBe(200);
    });
});
