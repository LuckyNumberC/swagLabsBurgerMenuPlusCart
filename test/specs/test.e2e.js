import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/pageLogin.js'
import ProductsPage from '../pageobjects/pageProducts.js'
import YourCartPage from '../pageobjects/pageYourCart.js'

describe('Your Cart', () => {

    beforeEach(async() => {
        await LoginPage.open()
        await LoginPage.startLogin('standard_user', 'secret_sauce')
        await expect(ProductsPage.titleProducts).toBeDisplayed()
        await expect(ProductsPage.buttonBurgerMenu).toBeDisplayed()
    })

//YC01
    it('should navigate to the Your Cart page when the cart icon is clicked', async() => {
        await ProductsPage.startCart()
        await expect(YourCartPage.titleYourCart).toBeDisplayed()
    })

//YC02
    it('should navigate to the Products page', async() => {
        await ProductsPage.startCart()
        await expect(YourCartPage.titleYourCart).toBeDisplayed()
        await YourCartPage.startContinueShopping()
        await expect(ProductsPage.titleProducts).toBeDisplayed()
    })

//YC03
    it('should navigate to the Checkout: Your Information page', async() => {
        await ProductsPage.startCart()
        await expect(YourCartPage.titleYourCart).toBeDisplayed()
        await YourCartPage.startCheckout()
        await expect(browser).toHaveUrl(expect.stringContaining('checkout-step-one'))
    })

//YC04
    it('should be able to add each product to the cart when all Add to Cart buttons are clicked', async() => {
        await expect(ProductsPage.visualCartBadge).not.toBeDisplayed()
        for (let i = 0; i < ProductsPage.listProducts.length; i++) {
            await ProductsPage.startAddToCart(ProductsPage.listProducts[i])
            await expect(ProductsPage.buttonAddToCart(ProductsPage.listProducts[i])).not.toBeDisplayed()
            await expect(ProductsPage.buttonRemove(ProductsPage.listProducts[i])).toBeDisplayed()
            await expect(ProductsPage.visualCartBadge).toHaveText(`${i + 1}`)
        }
        await ProductsPage.startCart()
        await expect(YourCartPage.cardProduct).toBeDisplayed()
        await ProductsPage.viewBurgerMenu()
        await ProductsPage.startResetAppState()
        await expect(ProductsPage.visualCartBadge).not.toBeDisplayed()
    })

//YC05
    it('should remove two of three products from the cart', async() => {
        await ProductsPage.startAddToCart(ProductsPage.listProducts[0])
        await ProductsPage.startAddToCart(ProductsPage.listProducts[1])
        await ProductsPage.startAddToCart(ProductsPage.listProducts[2])
        await expect(ProductsPage.visualCartBadge).toHaveText(`3`)
        await ProductsPage.startCart()
        await expect(YourCartPage.titleYourCart).toBeDisplayed()
        await expect(YourCartPage.cardProduct).toBeDisplayed()
        await YourCartPage.startRemoveFromCart(YourCartPage.listProducts[0])
        await expect(YourCartPage.buttonRemove(YourCartPage.listProducts[0])).not.toBeDisplayed()
        await expect(YourCartPage.visualCartBadge).toHaveText(`2`)
        await YourCartPage.startRemoveFromCart(YourCartPage.listProducts[2])
        await expect(YourCartPage.buttonRemove(YourCartPage.listProducts[2])).not.toBeDisplayed()
        await expect(YourCartPage.visualCartBadge).toHaveText(`1`)
        await expect(YourCartPage.buttonRemove(YourCartPage.listProducts[1])).toBeDisplayed()
        await YourCartPage.viewBurgerMenu()
        await YourCartPage.startResetAppState()
        await expect(YourCartPage.visualCartBadge).not.toBeDisplayed()
    })

//YC06
    it('should remove all products from the cart when all Remove buttons are clicked', async() => {
            for (let i = 0; i < ProductsPage.listProducts.length; i++) {
                await ProductsPage.startAddToCart(ProductsPage.listProducts[i])
                await expect(ProductsPage.buttonAddToCart(ProductsPage.listProducts[i])).not.toBeDisplayed()
            }
            await ProductsPage.startCart()
            await expect(YourCartPage.cardProduct).toBeDisplayed()
            for (let i = ProductsPage.listProducts.length - 1; i > -1; i--) {
                await YourCartPage.startRemoveFromCart(ProductsPage.listProducts[i])
                await expect(YourCartPage.buttonRemove(YourCartPage.listProducts[i])).not.toBeDisplayed()
                if (i > 0) {
                    await expect(YourCartPage.visualCartBadge).toHaveText(`${i}`)
                }
            }
            await expect(YourCartPage.visualCartBadge).not.toBeDisplayed()
            await expect(YourCartPage.cardProduct).not.toBeDisplayed()
    })
})

describe('Burger Menu', () => {

    beforeEach(async() => {
        await LoginPage.open()
        await LoginPage.startLogin('standard_user', 'secret_sauce')
        await expect(ProductsPage.titleProducts).toBeDisplayed()
        await expect(ProductsPage.buttonBurgerMenu).toBeDisplayed()
    })

//BM01
    it('should display all menu buttons when clicked', async () => {
        await ProductsPage.viewBurgerMenu()
        await expect(ProductsPage.cardMenu).toBeDisplayed()
        await expect(ProductsPage.buttonBurgerMenuExit).toBeDisplayed()
        await expect(ProductsPage.buttonAllItems).toBeDisplayed()
        await expect(ProductsPage.buttonAbout).toBeDisplayed()
        await expect(ProductsPage.buttonLogout).toBeDisplayed()
        await expect(ProductsPage.buttonResetAppState).toBeDisplayed()
    })

//BM04
    it('should navigate to the Products page when All Items is clicked', async() => {
        await ProductsPage.startCart()
        await expect(YourCartPage.titleYourCart).toBeDisplayed()
        await YourCartPage.viewBurgerMenu()
        await expect(YourCartPage.cardMenu).toBeDisplayed()
        await YourCartPage.startAllItems()
        await expect(ProductsPage.titleProducts).toBeDisplayed()
    })

//BM07
    it('should clear all cart items when Reset App State is clicked', async() => {
        await ProductsPage.startAddToCart(ProductsPage.listProducts[0])
        await expect(YourCartPage.visualCartBadge).toBeDisplayed()
        await ProductsPage.startCart()
        await expect(YourCartPage.titleYourCart).toBeDisplayed()
        await YourCartPage.viewBurgerMenu()
        await expect(YourCartPage.cardMenu).toBeDisplayed()
        await YourCartPage.startResetAppState()
        await expect(YourCartPage.visualCartBadge).not.toBeDisplayed()
    })

    describe('When menu is open', () => {

        beforeEach(async() => {
            await ProductsPage.viewBurgerMenu()
            await expect(ProductsPage.cardMenu).toBeDisplayed()
        })

//BM02
        it('should not close when empty space outside the menu is clicked', async() => {
            await ProductsPage.startLogo()
            await expect(ProductsPage.cardMenu).toBeDisplayed()
        })
//BM03
        it('should close when a link outside the menu is clicked', async() => {
            await ProductsPage.startCart()
            await expect(YourCartPage.titleYourCart).toBeDisplayed()
            await expect(ProductsPage.cardMenu).not.toBeDisplayed()
        })

//BM06
        it('should navigate to the Login page when Logout is clicked', async() => {
            await ProductsPage.startLogout()
            await expect(LoginPage.buttonLogin).toExist()
        })

//BM08
        it('should dismiss the menu when the X is clicked', async () => {
            await ProductsPage.startBurgerMenuExit()
            await browser.pause(1000)
            await expect(ProductsPage.cardMenu).not.toBeDisplayed()
        })

//BM05
        it('should navigate to saucelabs.com when About is clicked', async() => {
            await ProductsPage.startAbout()
            await expect(browser).toHaveUrl(expect.stringContaining('saucelabs.com'))
        })

    })

})

// describe('Login application', () => {

//     for (const user of LoginPage.listUsernamesAccepted) {

//         if (user !== 'locked_out_user') {
//             it(`should log in with "${user}" and then logout`, async () => {
//                 await LoginPage.open()
//                 await LoginPage.startLogin(user, 'secret_sauce')
//                 await expect(ProductsPage.titleProducts).toExist()
//                 await ProductsPage.startLogout()
//                 await expect(LoginPage.fieldUsername).toExist()
//             })
//         }
        
//         if (user !== 'locked_out_user') {
//             it(`should fail to log in with "${user}" using a wrong password`, async () => {
//                 await LoginPage.open()
//                 await LoginPage.startLogin(user, 'nasty_sauce')
//                 await expect(ProductsPage.titleProducts).not.toExist()
//                 await expect(LoginPage.errorLockedOutUser).toExist()
//             })
//         }
//     }

//     it('should fail to log in as locked_out_user', async () => {
//         await LoginPage.open()
//         await LoginPage.startLogin('locked_out_user', 'secret_sauce')
//         await expect(ProductsPage.titleProducts).not.toExist()
//         await expect(LoginPage.errorLockedOutUser).toExist()
//     })

//     it('should fail to log in with empty fields', async () => {
//         await LoginPage.open()
//         await LoginPage.startLogin('', '')
//         await expect(ProductsPage.titleProducts).not.toExist()
//         await expect(LoginPage.errorLockedOutUser).toExist()
//     })

//     it('should fail to log in with a new username', async () => {
//         await LoginPage.open()
//         await LoginPage.startLogin('unregistered_user', 'secret_sauce')
//         await expect(ProductsPage.titleProducts).not.toExist()
//         await expect(LoginPage.errorLockedOutUser).toExist()
//     })
// })