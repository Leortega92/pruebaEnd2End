/// <reference types="cypress" />
class PetStoreApi {

    constructor() {
        this.baseUrl = "https://petstore.swagger.io/v2";
    }

    addPet(data) {
        return cy.request({
            method: "POST",
            url: `${this.baseUrl}/pet`,
            body: data,
            headers:{
                accept: "application/json",
                "Content-Type": "application/json"
            }
        });
    }

    getPetByID(idCreateResponse) {
        return cy.request({
            method: "GET",
            url: `${this.baseUrl}/pet/${idCreateResponse}`,
            headers: {
                Accept: "application/json"
            }
        });
    }

   
    updatePetById(idCreateResponse, data) {
        return cy.request({
            method: "POST",
            url: `${this.baseUrl}/pet/${idCreateResponse}`,
            body: data,
            headers: {
                accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
    }

    findPetsByStatus(status) {
        return cy.request({
            method: "GET",
            url: `${this.baseUrl}/pet/findByStatus`,
            qs: {
                status: status
            },
            headers: {
                accept: "application/json"
            }
        });
    }

}


export const petStoreApi = new PetStoreApi();