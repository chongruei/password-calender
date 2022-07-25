describe("Navigation", () => {
  it("should navigate to the index page", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");
  });

  it("render date input correctly", () => {
    cy.getByTestId("date-input")
      .should("have.css", "border-color")
      .and("eq", "rgb(229, 231, 235)");

    cy.getByTestId("date-input")
      .invoke("attr", "placeholder")
      .should("contain", "mm/dd/yyyy");
  });

  it("render calendar correctly", () => {
    cy.getByTestId("date-input").click();

    expect(cy.getByTestId("calendar")).to.not.be.null;
  });

  it("pick today correctly", () => {
    const date = new Date();
    const yyyy = date.getFullYear();
    const mm = date.getMonth() + 1;
    const dd = date.getDate();

    cy.getByTestId("calendar");
    cy.getByTestId("calendar-confirm").click();

    cy.getByTestId("date-input")
      .invoke("val")
      .should(
        "eq",
        `${dd.toString().padStart(2, "0")}/${mm
          .toString()
          .padStart(2, "0")}/${yyyy}`
      );
  });
});

export {};
