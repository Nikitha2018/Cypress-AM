import authenticationPO from "../../support/pageObjects/authenticationPO";
import loginPO from "../../support/pageObjects/loginPO";
import { unique, logout, generateId, validateSession } from "../../support/pageObjects/utilities";

const auth = new authenticationPO();
const login = new loginPO();

let loginEmail = "";
let username = "";
let mailslurpEmail = "";
let Password = "";

describe("AM Plus User Creation, Mail Authentication and Password Reset", function() {

    beforeEach(function (){
        cy.viewport(1500,1200);
        var env = Cypress.env('environment');
        
        cy.fixture(env).then(function(data){
            cy.login(data.url, data.user_email, data.user_password);
            this.data = data;
        });
    });

    it("Verify user creation in AM plus and Validation",function(){
        auth.admin().click();
        auth.add().click();

        loginEmail = "ampuser." + unique() + "@example.com";
        cy.log(loginEmail);
        var firstName = loginEmail.substring(0, loginEmail.indexOf("."));
        cy.log(firstName);
        var last = loginEmail.substring(0, loginEmail.indexOf("@"));    
        var lastName = last.substring(last.lastIndexOf(".")+1);
        cy.log(lastName);
        username = firstName + " " + lastName;
        cy.log(username);

        auth.firstName().type(firstName);
        auth.lastName().type(lastName);
        auth.email().type(loginEmail);
        auth.accessLevel().select("Super User");
        cy.wait(2000);
        auth.activeToggle().click();
        auth.save().click();
        cy.wait(2000);
        auth.search().type(loginEmail);
        cy.wait(2000);
        auth.firstRecord(loginEmail).should('exist')
        logout();
    });

    it("User Edit and Update, Trigger Forgot Password, Reset Password and Validate", function() {

        cy.mailslurp().then(mailslurp => mailslurp.createInbox())
        .then(function (inbox) {
        cy.wrap(inbox.id).as('inboxId')
        cy.wrap(inbox.emailAddress).as('emailAddress')
        })         

        cy.then(function(){
        mailslurpEmail = this.emailAddress
        expect(mailslurpEmail).to.exist 
            auth.admin().click();
            auth.search().clear().type(loginEmail);
            cy.wait(5000);
            auth.userEdit(loginEmail).click();
            cy.wait(3000);
            auth.editEmail().clear().type(mailslurpEmail); 
            cy.wait(3000);
            auth.save().click();
            cy.wait(5000);
            logout();
        
            // Trigger forgot password process
            auth.forgotPassword().click();
            login.getSuperusername().type(mailslurpEmail);  
            auth.sendResetInstructions().click(); 
            cy.wait(120000)

            cy.then(function(){
                cy.mailslurp().then(mailslurp => mailslurp.waitForLatestEmail(this.inboxId, 30000, true))
                  .then(email => {
                      expect(email.subject).to.include('Reset password instructions')
                      const body = email.body
                      const links = body.match(/https?:\/\/\S+/g)
                      expect(links).to.exist;       
          
                        const resetLink = body.match(/href="([^"]+)"/)[1];
                        cy.log("Reset link:", resetLink);
                        cy.visit(resetLink);
        
                        // Set a new password
                        Password = "Cy@" + generateId();
                        auth.newpwd().type(Password);
                        auth.pwdConfirmation().type(Password);
                        auth.createPwd().click({ force: true });
                    });
            });
        });
        
    })    

    it("Verify LogIn with New Password Set and Inactivate User, Validate", function() {
        logout();
        var env = Cypress.env("environment");
        cy.fixture(env).then(function (data) {       
            this.data = data;
            cy.visit(this.data.url);
            cy.wait(2000);
            login.getSuperusername().type(mailslurpEmail);
            login.getSuperuserpassword().type(Password);
            login.signin().click();
            validateSession()
            cy.wait(2000);        
        });
        cy.wait(2000);
        login.assertWorkQueue().should("be.visible");
        auth.admin().click();
        auth.search().clear().type(mailslurpEmail);
        cy.wait(3000);
        auth.userEdit(mailslurpEmail).click();
        auth.activeToggle().click();
        cy.wait(2000);
        auth.save().click();
        cy.wait(5000)
        auth.search().clear().type(mailslurpEmail);
        cy.get('tbody tr[role="row"] td').should("contain.text", "Inactive");

    });

});
