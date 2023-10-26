import 'cypress-xpath';

class homePage {
    visit(){
     cy.visit('https://www.demoblaze.com/');
    }
   
    selectProduct(producto) {
        const titleOfProduct = () => cy.xpath(`//a[@class='hrefch' and contains(text(), '${producto}')]`);
        titleOfProduct().click();
    }

    logoBlaze(){
        cy.xpath(`//a[@id='nava']`).should('be.visible').click();
    }
}


export default new homePage();