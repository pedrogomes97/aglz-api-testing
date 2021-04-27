/// <reference types="cypress" />

import req from '../support/api/requests'
import assertions from '../support/api/assertions'

context('Ping', () => {
    it('Validar que a aplicação no ar @healthcheck', () => {
        // GET https://treinamento-api.herokuapp.com/ping

        req.getPing().then(getPingResponse => {
            assertions.shouldHaveStatus(getPingResponse, 201)
        }) 

        //cy.request -> response -> body, status, headers
        // .its ->  
    });
});