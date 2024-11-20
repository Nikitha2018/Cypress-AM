/// <reference types="cypress-xpath" />

class authenticationPO {

    admin(){
        return cy.xpath("//span[normalize-space()='Admin']")
    }

    add(){
        return cy.xpath("//span[normalize-space()='Add']")
    }

    firstName(){
        return cy.xpath("//label[@for='user_fname']")
    }

    lastName(){
        return cy.xpath("//label[@for='user_lname']")
    }

    email(){
        return cy.xpath("//label[@for='user_email']")
    }

    accessLevel(){
        return cy.xpath("//select[@id='user_role_id']")
    }

    activeToggle(){
        return cy.xpath("//label[normalize-space()='Active User']")
    }

    save(){
        return cy.xpath("//input[@id='save']")
    }

    filter(){
        return cy.xpath("//div[@id='example_wrapper']//div//div//a//span//i")
    }

    filterEmail(){
        return cy.xpath("//span[normalize-space()='Email']")
    }
    filterEmailTyper(){
        return cy.xpath("//body/div/div/div/input[1]")
    }
    emailLabel(){
        return cy.xpath("//label[normalize-space()= '" + value + "']");
    }

    forgotPassword(){
        return cy.xpath("//a[normalize-space()='Forgot Password']")
    }

    sendResetInstructions(){
        return cy.xpath("//input[@name='commit']")
    }

    search(){
        return cy.xpath("//input[@type='search']")
    }
    userEdit(value){
        return cy.xpath("(//tbody//tr[@role='row'][.//td[contains(., '" + value +"')]])[1]//i[contains(@class, 'icon-edit')]")

    }
    firstRecord(value){
        return cy.xpath("//tbody//tr[@role='row']//td[contains(., '" + value + "')]")
    }
    newpwd(){
        return cy.xpath("//input[@id='platform_user_password']")
    }
    pwdConfirmation(){
        return cy.xpath("//input[@id='platform_user_password_confirmation']")
    }
    createPwd(){
        return cy.xpath("//input[@name='commit']")
    }
    editEmail(){
        return cy.xpath("//input[@id='user_email']")
    }

}
export default authenticationPO