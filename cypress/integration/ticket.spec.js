/*Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })*/

describe("Tickets", () => {
    beforeEach(() => cy.visit('https://ticket-box.s3.eu-central-1.amazonaws.com/index.html'));
 //it.only = testar apenas essa informação
 //const = criar variável 
 //.select = usar input do tipo select
//.check = selecionar radio e checkbox input
//.uncheck = desmarcar checkbox
//should = realizar verificações em campos da aplicação
//.click = mesma coisa do .check

    it("fills all the text input filds", () => {
        cy.viewport(1440, 900)
        cy.get("#first-name").type("Kauan");
        cy.get("#last-name").type("Rodrigues")
        cy.get("#email").type("kauanjetro@gmail.com");
        cy.get("#requests").type("Vegetarian");
        cy.get("#signature").type("Lucas Barros");
    });

    it("select two tickets", () => {
        cy.get("#ticket-quantity").select("2");
    });

    it("select 'vip' ticket type",() => {
        cy.get("#vip").check();
    });

    it("select 'social-media' checkbox", () =>{
        cy.get("#social-media").check();
    })

    it("select 'friend' and 'publication, then uncheck 'friend'", () =>{
        cy.get("#friend").check();
        cy.get("#publication").check();
        cy.get("#friend").uncheck();
    })

    it("has 'TICKETBOX' header's heading", () => {
        cy.get("header h1").should("contain", "TICKETBOX");
    });

    it("alerts on invalid email", () => {
        cy.get("#email")
        .as("email")
        .type("teste-gmail.com");

        cy.get("#email.invalid").should("exist");

        cy.get("@email")
            .clear()
            .type("teste@gmail.com");

        cy.get("#email.invalid").should("not.exist");
    });

    it("fills and reset the form", () => {
//teste e2e
const firstName = "Kauan";
const lastName = "Rodrigues";
const fullName = `${firstName} ${lastName}`
        // ^ variáveis

        cy.viewport(1440, 900)
        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName)
        cy.get("#email").type("kauanjetro@gmail.com");
        cy.get("#ticket-quantity").select("2");
        cy.get("#vip").check();
        cy.get("#friend").check();
        cy.get("#requests").type("Coca-Cola");

        cy.get(".agreement p").should(
            "contain",
            `I, ${fullName}, wish to buy 2 VIP tickets.`
        );
            cy.get("#agree").click();
            cy.get("#signature").type(fullName);

            cy.get("button[type='submit']")
                .as("submitButton")
                .should("not.be.disabled");

            cy.get("button[type='reset']").click();
            cy.get("@submitButton").should("be.disabled");
    });

//Criar comandos customizados

    it("fills mandatory fills using support command", () => {
        const customer = {
            firstName: "John",
            lastName: "Doe",
            email: "johndoe@example.com"
        };

        cy.fillMandatoryFields(customer);

        cy.get("button[type='submit']")
        .as("submitButton")
        .should("not.be.disabled");

        cy.get("#agree").uncheck();
        cy.get("@submitButton").should("be.disabled")

    });
});