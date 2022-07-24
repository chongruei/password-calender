describe("Navigation", () => {
  it("should navigate to the index page", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");
  });

  it("find password correctly", () => {
    expect(cy.getByTestId("password")).to.not.be.null;
  });

  it("render password correctly", () => {
    cy.getByTestId("password")
      .should("have.css", "border-color")
      .and("eq", "rgba(255, 255, 255, 0.5)");

    cy.getByTestId("password-input")
      .invoke("attr", "placeholder")
      .should("contain", "Password");
  });

  it("render vaidators correctly", () => {
    cy.getByTestId("password-input").click();

    cy.getByTestId("password")
      .should("have.css", "border-color")
      .and("eq", "rgb(0, 163, 255)");

    expect(cy.getByTestId("validator")).to.not.be.null;
  });

  it("validate password correctly", () => {
    const trueColor = "#00D1FF";
    const falseColor = "#565656";

    cy.getByTestId("validator-UpperCase")
      .children()
      .invoke("attr", "fill")
      .and("eq", falseColor);

    cy.getByTestId("validator-LowerCase")
      .children()
      .invoke("attr", "fill")
      .and("eq", falseColor);

    cy.getByTestId("validator-Number")
      .children()
      .invoke("attr", "fill")
      .and("eq", falseColor);

    cy.getByTestId("validator-Special")
      .children()
      .invoke("attr", "fill")
      .and("eq", falseColor);

    cy.getByTestId("validator-LongerThen8Characters")
      .children()
      .invoke("attr", "fill")
      .and("eq", falseColor);

    cy.getByTestId("password-input").type("Hello, World!");

    cy.getByTestId("validator-UpperCase")
      .children()
      .invoke("attr", "fill")
      .and("eq", trueColor);

    cy.getByTestId("validator-LowerCase")
      .children()
      .invoke("attr", "fill")
      .and("eq", trueColor);

    cy.getByTestId("validator-Number")
      .children()
      .invoke("attr", "fill")
      .and("eq", falseColor);

    cy.getByTestId("validator-Special")
      .children()
      .invoke("attr", "fill")
      .and("eq", trueColor);

    cy.getByTestId("validator-LongerThen8Characters")
      .children()
      .invoke("attr", "fill")
      .and("eq", trueColor);

    cy.getByTestId("password-input").clear().type("Hello, World! 123");

    cy.getByTestId("validator-Number")
      .children()
      .invoke("attr", "fill")
      .and("eq", trueColor);
  });
});

export {};
