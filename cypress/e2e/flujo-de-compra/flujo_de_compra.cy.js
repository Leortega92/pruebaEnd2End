import 'cypress-xpath';
import homePage from '../../support/pages/homePage';
import productoPage from '../../support/pages/productPage';
import cartPage from '../../support/pages/cartPage';

describe('prueba End2End del flujo de compra', () => {
    it('realizar la compra completa de 2 productos', () => {
        cy.fixture('datos.json').then((data) => {
            const producto1 = data.producto1;
            const producto2 = data.producto2;

            const quantityOfProducts = 2;

            const name = data.name;
            const country = data.country;
            const city = data.city;
            const card = data.card;
            const month = data.month;
            const year = data.year;
         
            homePage.visit();
            homePage.selectProduct(producto1);
            productoPage.addToCart();
            homePage.logoBlaze()

            homePage.selectProduct(producto2);
            productoPage.addToCart();
            homePage.logoBlaze()

            productoPage.viewCart();
            cartPage.validateProducts(quantityOfProducts);
            
            cartPage.placeOrderButton();
            cartPage.completeTheForm(name, country, city, card, month, year)
            cartPage.purchaseButton();
            cartPage.textSuccessful();

        });
    });
});