import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/pageLogin.js'
import ProductsPage from '../pageobjects/pageProducts.js'
import YourCartPage from '../pageobjects/pageYourCart.js'

describe('Burger Menu', () => {
    //Open and login
    beforeEach(async() => {
        await LoginPage.open()
        await LoginPage.startLogin('standard_user', 'secret_sauce')
        await expect(ProductsPage.titleProducts).toBeDisplayed()
        await expect(ProductsPage.buttonBurgerMenu).toBeDisplayed()
    })

// //BM01
//     it('should display all menu buttons when clicked', async () => {
//         await ProductsPage.viewBurgerMenu()
//         await expect(ProductsPage.cardMenu).toBeDisplayed()
//         await expect(ProductsPage.buttonBurgerMenuExit).toBeDisplayed()
//         await expect(ProductsPage.buttonAllItems).toBeDisplayed()
//         await expect(ProductsPage.buttonAbout).toBeDisplayed()
//         await expect(ProductsPage.buttonLogout).toBeDisplayed()
//         await expect(ProductsPage.buttonResetAppState).toBeDisplayed()
//     })

// //BM04
//     it('should navigate to the Products page when All Items is clicked', async() => {
//         await ProductsPage.startCart()
//         await expect(YourCartPage.titleYourCart).toBeDisplayed()
//         await YourCartPage.viewBurgerMenu()
//         await expect(YourCartPage.cardMenu).toBeDisplayed()
//         await YourCartPage.startAllItems()
//         await expect(ProductsPage.titleProducts).toBeDisplayed()
//     })

// //BM07
//     it('should clear all cart items when Reset App State is clicked', async() => {
//         await ProductsPage.startAddToCart(ProductsPage.listProducts[0])
//         await expect(YourCartPage.visualCartBadge).toBeDisplayed()
//         await ProductsPage.startCart()
//         await expect(YourCartPage.titleYourCart).toBeDisplayed()
//         await YourCartPage.viewBurgerMenu()
//         await expect(YourCartPage.cardMenu).toBeDisplayed()
//         await YourCartPage.startResetAppState()
//         await expect(YourCartPage.visualCartBadge).not.toBeDisplayed()
//     })

// //YC01
//     it('should navigate to the Your Cart page when the cart icon is clicked', async() => {
//         await ProductsPage.startCart()
//         await expect(YourCartPage.titleYourCart).toBeDisplayed()
//     })

// //YC02
//     it('', async() => {
//         await ProductsPage.startCart()
//         await expect(YourCartPage.titleYourCart).toBeDisplayed()
//     })

// //YC03
//     it('', async() => {
//         await ProductsPage.startCart()
//         await expect(YourCartPage.titleYourCart).toBeDisplayed()
//     })
// 
//YC04
        it(`should be able to add each product to the cart`, async() => {
            await expect(ProductsPage.visualCartBadge).not.toBeDisplayed()
            for (let i = 0; i < ProductsPage.listProducts.length; i++) {
                await ProductsPage.startAddToCart(ProductsPage.listProducts[i])
                await expect(ProductsPage.buttonAddToCart(ProductsPage.listProducts[i])).not.toBeDisplayed()
                await expect(ProductsPage.buttonRemove(ProductsPage.listProducts[i])).toBeDisplayed()
                await expect(ProductsPage.visualCartBadge).toHaveText(`${i + 1}`)
            }
            await ProductsPage.startCart()
            await expect(YourCartPage.cardProduct).toBeDisplayed()
            await YourCartPage.startContinueShopping()
        })

// //YC05
//     it('', async() => {
        
//     })

//     describe('when menu is open', () => {

//         beforeEach(async() => {
//             await ProductsPage.viewBurgerMenu()
//             await expect(ProductsPage.cardMenu).toBeDisplayed()
//         })

// //BM02
//         it('should not close when empty space outside the menu is clicked', async () => {
//             await ProductsPage.startLogo()
//             await expect(ProductsPage.cardMenu).toBeDisplayed()
//         })
// //BM03
//         it('should close when a link outside the menu is clicked', async () => {
//             await ProductsPage.startCart()
//             await expect(YourCartPage.titleYourCart).toBeDisplayed()
//             await expect(ProductsPage.cardMenu).not.toBeDisplayed()
//         })
// //BM05
//         it('should navigate to saucelabs.com when About is clicked', async () => {
//             await ProductsPage.startAbout()
//             await expect(browser).toHaveUrl(expect.stringContaining('saucelabs.com'))
//         })

// //BM06
//         it('should navigate to the Login page when Logout is clicked', async() => {
//             await ProductsPage.startLogout()
//             await expect(LoginPage.buttonLogin).toExist()
//         })

// //BM08
//         it('should dismiss the menu when the X is clicked', async() => {
//             await ProductsPage.startBurgerMenuExit()
//             await expect(ProductsPage.cardMenu).not.toBeDisplayed()
//         })

    // })

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