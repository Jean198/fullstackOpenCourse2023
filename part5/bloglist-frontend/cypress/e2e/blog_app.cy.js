describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    cy.visit('http://localhost:3000');

    const user = {
      name: 'jean',
      username: 'jean6891',
      password: 'admin12345',
    };
    cy.request('POST', 'http://localhost:3003/api/users/createuser', user);
  });

  it('Login form is shown by default', function () {
    cy.contains('blogs');
    cy.get('button').contains('login').click();
  });

  describe('Login', function () {
    it('"succeeds with correct credentials"', function () {
      cy.contains('login').click();
      cy.get('#username').type('jean6891');
      cy.get('#password').type('admin12345');
      cy.get('#login-button').click();
      cy.contains('jean logged in');
    });

    it('"Fails with wrong credentials"', function () {
      cy.contains('login').click();
      cy.get('#username').type('jean6891');
      cy.get('#password').type('wrong');
      cy.get('#login-button').click();
      cy.should('not.contain', 'jean logged in');
    });
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.contains('login').click();
      cy.get('#username').type('jean6891');
      cy.get('#password').type('admin12345');
      cy.get('#login-button').click();
    });

    it('a new blog can be created', function () {
      cy.contains('create blog').click();
      cy.get('#title').type('a blog created by cypress');
      cy.get('#create-button').click({ force: true });
      cy.contains('a blog created by cypress');
    });

    describe('Users can do many operations on blogs', function () {
      beforeEach(function () {
        cy.contains('create blog').click();
        cy.get('#title').type('third blog');
        cy.get('#create-button').click({ force: true });
        cy.contains('third blog');
      });

      it('user can like a blog', function () {
        cy.get('#view').click();
        cy.contains('Like').click();
        cy.contains('1');
      });

      it('user can remove his created blog', function () {
        cy.get('#view').click();
        cy.get('#remove').click();
        cy.should('not.contain', 'third blog');
      });
    });
  });
});
