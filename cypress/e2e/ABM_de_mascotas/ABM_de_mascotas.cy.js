import { petStoreApi } from "../../api/apiPets";
import generateRandomNumber from '../../support/randomNumberGenerator';


let petResponse;
let idCreateResponse;
let categoryIdResponse;
let nameCreate;
let nameUpdate;

describe("ABM de mascotas a los Microservicios de petstore.swagger.io", () => {
    it("Se realiza un test en cadena con la creacion de un user, consultar el user creado,  actualizar algunos datos y luego buscar el user por status validando los cambios realizados ", () => {
        cy.fixture('datos.json').then((data) => {
            const petName = data.petName;
            const categoryName = data.categoryName;
            const categoryId = generateRandomNumber(1000, 9999);
            const id = generateRandomNumber(1000, 9999);
            const nameUpdate = data.petNameUpdate;
            const statusSold = data.statusSold;

            const requestBody = {
                id: id,
                category: {
                    id: categoryId,
                    name: categoryName
                },
                name: petName,
                photoUrls: ["string"],
                tags: [{ id: 0, name: "string" }],
                status: "available"
            };
            petStoreApi.addPet(requestBody).then((response) => {
                petResponse = response;
                expect(petResponse.status).to.equal(200);
                idCreateResponse = petResponse.body.id;
                categoryIdResponse = petResponse.body.category.id;
                nameCreate = petResponse.body.name;
                expect(nameCreate).to.equal(petName);
            
                return petStoreApi.getPetByID(idCreateResponse);
            }).then((getResponse) => {
                const getPetByIDResponse = getResponse;
                expect(getResponse.status).to.equal(200);
                cy.log(idCreateResponse)

                const updatedData = `name=${nameUpdate}&status=${statusSold}`;
                return petStoreApi.updatePetById(idCreateResponse, updatedData);
            }).then((updateResponse) => {
                const bodyResponse = updateResponse;
                const idOnUpdate = bodyResponse.body.message;
                const idOnUpdateNumber = parseInt(idOnUpdate);
                expect(updateResponse.status).to.equal(200);
                expect(idOnUpdateNumber).to.equal(idCreateResponse);   
            
                return petStoreApi.findPetsByStatus(statusSold).then((findByStatusResponse) => {
                    const petsList = findByStatusResponse.body;
                    const idToFind = idCreateResponse;
                    const foundPet = petsList.find(pet => pet.id === idToFind);
                    cy.log(foundPet);
                    const foundName = foundPet.name;
                    const statusfinal = foundPet.status;
                    expect(findByStatusResponse.status).to.equal(200);
                    expect(foundName).to.equal(nameUpdate);
                    expect(statusfinal).to.equal(statusSold);
                    

                });
            });
        });
    });
});


