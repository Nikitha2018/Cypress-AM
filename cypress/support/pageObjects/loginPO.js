class loginPO{

    getSuperusername(){
        return cy.get('#platform_user_email')
    }

    getSuperuserpassword(){
        return cy.get('#platform_user_password')
    }

    signin(){
        return cy.xpath("//input[@name='commit']")
    }

    assertWorkQueue(){
        return cy.xpath("//a[normalize-space()='My Work Queue']")
    }

    profileIcon(){
        return cy.xpath("(//i)[3]")
    }

    logout(){
        return cy.xpath("//a[normalize-space()='Logout']")
    }
}

export default loginPO