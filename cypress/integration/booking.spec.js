/// <reference types="cypress" />


import req from '../support/api/requests'
import schemas from '../support/api/schemas'
import assertions from '../support/api/assertions'

context('Booking', () => {

    before(() => {
        req.doAuth()
    });
    it('Validar o contrato do GET Booking @contract', () => {
        req.getBooking().then(getBookingResponse => {
            assertions.validateContractOf(getBookingResponse, schemas.getBookingSchema())
        })
    });

    it('Criar um reserva com sucesso @functional', () => {
        req.postBooking().then(postBookingResponse => {
            assertions.shouldHaveStatus(postBookingResponse, 200)

            assertions.bookingIdBePresent(postBookingResponse);
            assertions.shouldHaveDefaultHeaders(postBookingResponse);
            assertions.shouldHaveContentTypeAppJson(postBookingResponse);
            assertions.shouldDurationBeFast(postBookingResponse);
        })
    });

    // Tentar alterar uma reserva inexistente - 404
    // Tentar alterar uma reserva sem token -> 403
    // Tentar alterar uma reserva com token inválido -> 403
    // Alterar uma reserva com sucesso -> 200

    it('Tentar alterar uma reserva inexistente @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.updateBookingAbsent(postBookingResponse).then(putBookingResponse => {
                assertions.shouldHaveStatus(putBookingResponse, 405)
                assertions.bookingIdBePresent(postBookingResponse)
            })
        })
    });

    it('Tentar alterar uma reserva sem token @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.updateBookingWithoutToken(postBookingResponse).then(putBookingResponse => {
                assertions.shouldHaveStatus(putBookingResponse, 403)
            })
        })
    });

    it('Tentar alterar uma reserva com token inválido @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.updateBookingWithInvalidToken(postBookingResponse).then(putBookingResponse => {
                assertions.shouldHaveStatus(putBookingResponse, 403)
            })
        })
    });

    it('Alterar uma reserva com sucesso @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.updateBooking(postBookingResponse).then(putBookingResponse => {
                assertions.shouldHaveStatus(putBookingResponse, 200)
            })
        })
    }); 

    //Tentar excluir uma reserva inexistente -> 405
    //Tentar excluir uma reserva sem token -> 403
    //Tentar excluir uma reserva com token inválido -> 403
    //Excluir uma reserva com sucesso

    it('Excluir uma reserva inexistente @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.deleteBookingAbsent(postBookingResponse).then(deleteBookingResponse => {
                assertions.shouldHaveStatus(deleteBookingResponse, 405)
                assertions.bookingIdBePresent(postBookingResponse)
            })
        })
    });

    it('Excluir uma reserva sem token @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.deleteBookingWithoutToken(postBookingResponse).then(deleteBookingResponse => {
                assertions.shouldHaveStatus(deleteBookingResponse, 403)
            })
        })
    });

    it('Excluir uma reserva com token inválido @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.deleteBookingWithInvalidToken(postBookingResponse).then(deleteBookingResponse => {
                assertions.shouldHaveStatus(deleteBookingResponse, 403)
            })
        })
    });

    it('Excluir uma reserva com sucesso @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.deleteBooking(postBookingResponse).then(deleteBookingResponse => {
                assertions.shouldHaveStatus(deleteBookingResponse, 201)
            })
        })
    });
}); 
