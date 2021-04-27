class Requests {

    getPing() {
        return cy.request({
            method: 'GET',
            url: 'ping'
        })
    }

    getBooking(){
        return cy.request({
            method: 'GET',
            url: 'booking/17'
        })
    }

    postBooking(){
        return cy.request({
            method: 'POST',
            url: 'booking',
            body: {
                "firstname" : "Jim",
                "lastname" : "Brown",
                "totalprice" : 111,
                "depositpaid" : true,
                "bookingdates" : {
                    "checkin" : "2020-01-01",
                    "checkout" : "2020-01-02"
                },
                "additionalneeds" : "Breakfast"
            }
        })
    }

    updateBookingAbsent(response){
        const id = response.body.bookingid + 1

        return cy.request({
            method: 'PUT',
            url: `booking/${id}`,
            headers: {
                Cookie: `token=${Cypress.env('token')}`
            },
            body: {
                "firstname": "Jim",
                "lastname": "James",
                "totalprice": 111,
                "depositpaid": false,
                "bookingdates": {
                  "checkin": "2020-01-01",
                  "checkout": "2020-01-02"
                },
                "additionalneeds": "Lunch"
            },
            failOnStatusCode: false
        })
    }

    updateBookingWithoutToken(response){
        const id = response.body.bookingid

        return cy.request({
            method: 'PUT',
            url: `booking/${id}`,
            body: {
                "firstname": "Jim",
                "lastname": "James",
                "totalprice": 111,
                "depositpaid": false,
                "bookingdates": {
                  "checkin": "2020-01-01",
                  "checkout": "2020-01-02"
                },
                "additionalneeds": "Lunch"
            },
            failOnStatusCode: false
        })
    }

    updateBookingWithInvalidToken(response){
        const id = response.body.bookingid

        return cy.request({
            method: 'PUT',
            url: `booking/${id}`,
            headers: {
                Cookie: `token=dgfeagrfgfds`
            },
            body: {
                "firstname": "Jim",
                "lastname": "James",
                "totalprice": 111,
                "depositpaid": false,
                "bookingdates": {
                  "checkin": "2020-01-01",
                  "checkout": "2020-01-02"
                },
                "additionalneeds": "Lunch"
            },
            failOnStatusCode: false
        })
    }

    updateBooking(response){
        const id = response.body.bookingid

        return cy.request({
            method: 'PUT',
            url: `booking/${id}`,
            headers: {
                Cookie: `token=${Cypress.env('token')}`
            },
            body: {
                "firstname": "Jim",
                "lastname": "James",
                "totalprice": 111,
                "depositpaid": false,
                "bookingdates": {
                  "checkin": "2020-01-01",
                  "checkout": "2020-01-02"
                },
                "additionalneeds": "Lunch"
            },
            failOnStatusCode: false
        })
    }

    postAuth(){
        return cy.request({
            method: 'POST',
            url: 'auth',
            body: {
                "username" : "admin",
                "password" : "password123"
            }
        });
    }

    doAuth(){
        this.postAuth().then(authResponse => {
            const token = authResponse.body.token;

            Cypress.env('token', token);
        })
    }
    
    deleteBookingAbsent(response){

        const id = response.body.bookingid + 1

        return cy.request({
            method: 'DELETE',
            url: `booking/${id}`,
            headers: {
                Cookie: `token=${Cypress.env('token')}`
            },
            failOnStatusCode:false
        });
    }

    deleteBookingWithoutToken(response){

        const id = response.body.bookingid

        return cy.request({
            method: 'DELETE',
            url: `booking/${id}`,
            failOnStatusCode:false
        });
    }

    deleteBookingWithInvalidToken(response){

        const id = response.body.bookingid

        return cy.request({
            method: 'DELETE',
            url: `booking/${id}`,
            headers: {
                Cookie: `token=dgfeagrfgfds`
            },
            failOnStatusCode:false
        });
    }

    deleteBooking(response){

        const id = response.body.bookingid

        return cy.request({
            method: 'DELETE',
            url: `booking/${id}`,
            headers: {
                Cookie: `token=${Cypress.env('token')}`
            },
            failOnStatusCode:false
        });
    }

}

export default new Requests();