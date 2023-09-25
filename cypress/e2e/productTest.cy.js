import HomePage from "../page_objects/homePage";
import LoginPage from "../page_objects/loginPage";
import ProductPage from "../page_objects/productDetailsPage";
import CartPage from "../page_objects/cartPage";
import CheckoutPage from "../page_objects/checkoutPage";

describe(' Product Tests', () => {
    it('Oredering Product Test', () => {
        cy.fixture("productData").then(productData => {

            LoginPage
                .open()
                .loginAsStandardUser();

            HomePage.findAndOpenProductByName(productData.name);

            ProductPage.checkProductDetailsPageOpened()
                .addProductToCart()
                .goToCart();

            CartPage.checkCartPageOpened()
                .checkNumberProductsInCart(1)
                .checkFirstProductPrice(productData.price)
                .submitCart();

            CheckoutPage.checkCheckoutPageOpened()
                .fillAllFieldsWithValidValuesAndContinue()
                .checkNumberProductsOnPage(1)
                .checkNameFirstProduct(productData.name)
                .checkPriceFirstProduct(productData.price)
                .clickFinishButton();
        })

    })
}) 