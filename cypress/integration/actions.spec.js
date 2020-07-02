context('Actions', () => {
    before(() => {
        const allure = Cypress.Allure.reporter.getInterface();
        const today = new Date();
        const currentHour = today.getHours();

        allure.writeEnvironmentInfo({
            someEnvInfo: 'envInfo',
            githubRepo:
                'https://github.com/Shelex/cypress-allure-historical-example'
        });

        allure.writeCategoriesDefinitions([
            {
                name: 'Not to have class tests',
                messageRegex: /.*not to have class.*/,
                matchedStatuses: ['failed']
            }
        ]);
    });

    beforeEach(() => {
        cy.visit('https://example.cypress.io/commands/actions');
        const allure = Cypress.Allure.reporter.getInterface();
        allure.feature('Actions Feature');
        allure.epic('Plain js tests');
        allure.tms('docs', 'https://on.cypress.io/interacting-with-elements');
        allure.label('tag', 'this is tag');
        allure.label('owner', 'Me, lol');
    });

    afterEach(() => {
        cy.log(`this is after each hook`);
    });

    it('.focus() - focus on a DOM element', () => {
        cy.allure()
            .tms('docs', 'https://on.cypress.io/focus')
            .severity('minor');
        cy.get('.action-focus')
            .focus()
            .should('have.class', 'focus')
            .prev()
            .should('have.attr', 'style', 'color: orange;');
    });

    it('.blur() - blur off a DOM element', () => {
        cy.allure().tms('docs', 'https://on.cypress.io/blur');
        cy.get('.action-blur')
            .type('About to blur')
            .blur()
            .should('have.class', 'error')
            .prev()
            .should('have.attr', 'style', 'color: red;');
    });

    it('.clear() - clears an input or textarea element', () => {
        cy.allure().tms('docs', 'https://on.cypress.io/clear');
        cy.get('.action-clear')
            .type('Clear this text')
            .should('have.value', 'Clear this text')
            .clear()
            .should('have.value', '');
    });
});
