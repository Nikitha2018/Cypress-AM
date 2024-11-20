/// <reference types="cypress" />
import loginPO from "./pageObjects/loginPO";
import { validateSession } from "./pageObjects/utilities";
const { MailSlurp } = require('mailslurp-client');

Cypress.Commands.add("login", (url, email, password) =>{
    const login = new loginPO
    cy.visit(url)
    login.getSuperusername().type(email)
    login.getSuperuserpassword().type(password)
    login.signin().click()
    cy.wait(9000)
    validateSession()
    cy.wait(3000)
    login.assertWorkQueue().invoke('text').then((text) =>{
        const normalizedText = text.replace(/\s+/g, ' ').trim();
        expect(normalizedText).to.include('My Work Queue')
    })
})

//Mailslurp Initialization
const apiKey = Cypress.env('MAILSLURP_API_KEY');
const mailslurp = new MailSlurp({ apiKey });

// Command to get a Mailslurp instance
Cypress.Commands.add('mailslurp', () => {
  return mailslurp; 
});

// Command to create a new inbox
Cypress.Commands.add('createInbox', () => {
  return mailslurp.createInbox();  
});

// Command to wait for the latest email for a given inbox ID
Cypress.Commands.add('waitForLatestEmail', (inboxId, timeout = 30000, unreadOnly = true) => {
  return mailslurp.waitForLatestEmail(inboxId, timeout, unreadOnly);
})
