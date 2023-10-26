import 'cypress-xpath';

class cartPage {

    validateProducts(number) {
        cy.get('#tbodyid tr').should('have.length', number);
    }

    placeOrderButton() {
        cy.xpath(`//button[@type='button' and contains(text(), 'Place Order')]`).should('be.visible').click();
    }

    formCheckout() {
        this.getInput('name').should('be.visible');
        this.getInput('country').should('be.visible');
        this.getInput('city').should('be.visible');
        this.getInput('card').should('be.visible');
        this.getInput('month').should('be.visible');
        this.getInput('year').should('be.visible');
    }

    completeTheForm(name, country, city, card, month, year) {
        this.getInput('name').type(name);
        this.getInput('country').type(country);
        this.getInput('city').type(city);
        this.getInput('card').type(card);
        this.getInput('month').type(month);
        this.getInput('year').type(year);
    }

    getInput(id) {
        return cy.xpath(`//input[@id='${id}']`);
    }

    purchaseButton(){
        cy.xpath(`//button[@onclick='purchaseOrder()']`).should('be.visible').click();
    }

    textSuccessful(){
        cy.xpath(`//h2[contains(text(), 'Thank you for your purchase!')]`).should('be.visible');
    }
    
}

export default new cartPage();
