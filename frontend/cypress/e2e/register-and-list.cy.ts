describe("Parcours inscription et liste", () => {
  const data = {
    email: `test-${Date.now()}@mondomaine.com`, //je génère un email dynamiquement pour le test, pour m'éviter d'avoir des doublons
    password: "motdepasse",
  };

  it("Test d'inscription", () => {
    cy.visit("http://localhost:3000/auth/register");
    cy.get('input[name="email"]').type(data.email); // On tape l'email prédéfini dans le champs d'email
    cy.get('input[name="password"]').type(data.password); // On tape le password prédéfini dans le champs d'password

    cy.get('input[type="submit"]').click();

    cy.url().should("eq", "http://localhost:3000/auth/login");
  });

  it("Test de connexion et affichage liste", () => {
    cy.visit("http://localhost:3000/auth/login");
    cy.get('input[name="email"]').type(data.email); // On tape l'email prédéfini dans le champs d'email
    cy.get('input[name="password"]').type(data.password); // On tape le password prédéfini dans le champs d'password

    cy.get('input[type="submit"]').click();

    cy.contains(`Bienvenue!`);
    cy.url().should("eq", "http://localhost:3000/");

    cy.contains(`Quête JWT ${data.email}`);

    cy.visit("http://localhost:3000/books/list");
    cy.url().should("eq", "http://localhost:3000/books/list");

    cy.get('a[href="/auth/logout"]')
      .should("be.visible")
      .click({ force: true });
      
    cy.url().should("eq", "http://localhost:3000/auth/logout");
    cy.url().should("eq", "http://localhost:3000/auth/login");
  });
});