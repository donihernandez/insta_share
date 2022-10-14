describe('Auth Suite', () => {
    it('runs auth flow for successful login to protected home page', () => {
        cy.resetDB();

        cy.visit('/');

        cy.findByRole('heading', { name: /login/i }).should('exist');

        cy.findByRole('heading', { name: /welcome to insta share/i }).should(
            'not.exist',
        );

        cy.findByLabelText(/email/i).clear().type('test@test.test');

        cy.findByLabelText(/password/i)
            .clear()
            .type('12345');

        cy.findByRole('button', { name: /login/i }).click();

        cy.findByRole('heading', { name: /login/i }).should('not.exist');

        cy.findByRole('heading', { name: /welcome to insta share/i }).should(
            'exist',
        );
    });
    it('redirects to sign-in for protected pages', () => {
        cy.fixture('protected-pages.json').then(urls => {
            urls.forEach((url: string) => {
                cy.visit(url);
                cy.findByLabelText(/email/i).should('exist');
                cy.findByLabelText(/password/i).should('exist');
            });
        });
    });
    it('does not show sign-in page when already signed in', () => {
        cy.resetDB();

        cy.login();

        cy.visit('/');

        cy.findByRole('heading', { name: /login/i }).should('not.exist');

        cy.findByRole('heading', { name: /welcome to insta share/i }).should(
            'exist',
        );
    });
});

export {};
