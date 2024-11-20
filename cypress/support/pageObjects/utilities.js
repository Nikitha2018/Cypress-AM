// This file contains methods that are common and can be exported.

import loginPO from "./loginPO";

const login = new loginPO

export const unique = () => {
    var uniq = Date.now();
    return uniq;
  };

export const logout = () => {
    login.profileIcon().click({force:true})
    login.logout().click({force:true})
}

export const generateId = () => {
  return Math.floor(Math.random() * 1000000000);
};

export const validateSession = () => {
  cy.get('body').then(($body) => {
      // Check if the session announcement exists
      const announcementElement = $body.find('div.login-main.announcement');
      if (announcementElement.length > 0) {
          cy.wrap(announcementElement)  // Wrap the element with Cypress commands
              .invoke('text')          // Now you can use Cypress commands
              .then((announcementText) => {
                  // Log the announcement text for debugging
                  cy.log('Announcement Text:', announcementText);
                  
                  // Match the announcement text in a more flexible way (case-insensitive, trimmed)
                  const announcementNormalized = announcementText.trim().toLowerCase();
                  if (announcementNormalized.includes('you are currently logged in under another session')) {
                      cy.log('Starting new session');
                      cy.get('.primary-button').click();
                  } else {
                      cy.log('Session validation not required');
                  }
              });
      } else {
          cy.log('Announcement element not found, skipping validation');
      }
  });
};


