import 'cypress-xpath';

class productoPage {
    
    addToCart() {
        cy.xpath(`//div//a[contains(text(), 'Add to cart')]`).should('be.visible').click();
    }

    viewCart(){
        cy.xpath(`//a[@id='cartur']`).should('be.visible').click()
    }
}

export default new productoPage();
