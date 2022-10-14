import '@testing-library/cypress/add-commands';
import { hash, compare } from 'bcryptjs';

declare global {
    namespace Cypress {
        interface Chainable<Subject> {
            login(): Cypress.Chainable<Element>;
            resetDB(): Cypress.Chainable<void>;
        }
    }
}

Cypress.Commands.add('resetDB', () => {
    cy.dropCollection('users', { failSilently: true }).then(
        async (res: any) => {
            cy.createCollection('users', { failSilently: true });

            const hashedPassword = await hash(
                Cypress.env('TEST_USER_PASSWORD'),
                12,
            );

            const user = {
                username: 'doni',
                email: Cypress.env('TEST_USER_EMAIL'),
                hashedPassword,
            };

            cy.insertOne(user, {
                collection: 'users',
                database: 'myFirstDatabase',
            }).then((res: any) => {
                cy.log(res);
            });
        },
    );
});

Cypress.Commands.add('login', () => {
    cy.findByLabelText(/email/i).clear().type('test@test.test');

    cy.findByLabelText(/password/i)
        .clear()
        .type('12345');

    cy.findByRole('button', { name: /login/i }).click();

    cy.findByRole('heading', { name: /welcome to insta share/i }).should(
        'exist',
    );
});

export {};
