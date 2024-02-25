describe("template spec", () => {
  it("Should search Google and display 5 celebrities born today on IMDb", () => {
    cy.visit("https://www.google.com/");

    // Accept Google cookies
    getCookiesPopup().then(($cookieBanner) => {
      if ($cookieBanner.length > 0) {
        getGoogleCookiesAcceptButton().click();
      }
    });

    // Search for "imdb" on Google
    getGoogleSearchBar().within(() => {
      getTextArea().click().type("imdb").type("{enter}");
    });

    //Navigate to IMDb
    cy.contains(
      "IMDb: Ratings, Reviews, and Where to Watch the Best Movies ..."
    ).click();
    cy.wait(3000);

    //Ensure IMDb page is loaded
    cy.url().should("include", "imdb.com");

    //Accept cookies
    getImdbCookiePopup().then(($cookieBanner) => {
      if ($cookieBanner.length > 0) {
        getImdbCookiesAcceptButton().click();
      }
    });

    // Open IMDb menu and navigate to "Born Today"
    getImdbMenu().click();
    getCategoryCelebs().click();
    cy.contains("Born Today").click();

    // Print the names of the first 5 celebrities born today
    getCelebsName().each(($el, index) => {
      if (index < 5) {
        cy.log($el.text());
      }
    });
    //Ensure at least 5 celebrities are displayed
    getCelebsName().should("have.length.greaterThan", 4);
  });
});

const getCookiesPopup = () => cy.get('[class="dbsFrd"]');
const getGoogleCookiesAcceptButton = () => cy.get('[id="L2AGLb"]');
const getGoogleSearchBar = () => cy.get('[class="SDkEP"]');
const getTextArea = () => cy.get('[class="gLFyf"]');
const getImdbCookiePopup = () => cy.get('[class="sc-kDvujY kUNdqF"]');
const getImdbCookiesAcceptButton = () =>
  cy.get('[data-testid="accept-button"]');
const getImdbMenu = () =>
  cy.get('[class="ipc-icon ipc-icon--menu ipc-responsive-button__icon"]');
const getCategoryCelebs = () => cy.get('[for="nav-link-categories-celebs"]');
const getCelebsName = () =>
  cy.get(
    '[class="ipc-title ipc-title--base ipc-title--title ipc-title-link-no-icon ipc-title--on-textPrimary sc-3b23f954-3 dWUUgk"]'
  );
