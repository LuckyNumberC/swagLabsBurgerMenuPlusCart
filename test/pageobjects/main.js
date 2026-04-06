import { browser , $ } from '@wdio/globals';

export default class Main {
    
    get visualLogo () {
        return $('.app_logo')
    }

    get buttonBurgerMenu () {
        return $('#react-burger-menu-btn');
    }

    get cardMenu () {
        return $('.bm-menu')
    }

    get buttonBurgerMenuExit () {
        return $('#react-burger-cross-btn');
    }

    get buttonAllItems () {
        return $('#inventory_sidebar_link');
    }

    get buttonAbout () {
        return $('#about_sidebar_link');
    }

    get buttonLogout () {
        return $('#logout_sidebar_link');
    }

    get buttonResetAppState () {
        return $('#reset_sidebar_link');
    }

    get buttonCart () {
        return $('#shopping_cart_container');
    }

    get visualCartBadge () {
        return $('.shopping_cart_badge');
    }

    get cardProduct () {
        return $('.cart_item');
    }

    listProducts = ['sauce-labs-backpack', 'sauce-labs-bike-light', 'sauce-labs-bolt-t-shirt', 'sauce-labs-fleece-jacket', 'sauce-labs-onesie', 'test.allthethings()-t-shirt-(red)'];

    buttonAddToCart (product) {
        return $(`#add-to-cart-${product}`);
    }

    buttonRemove (product) {
        return $(`#remove-${product}`);
    }

    async viewBurgerMenu () {
        await this.buttonBurgerMenu.click();
    }

    async startBurgerMenuExit () {
        await this.buttonBurgerMenuExit.click();
    }

    async startAllItems () {
        await this.buttonAllItems.click();
    }

    async startAbout () {
        await this.buttonAbout.click();
    }

    async startLogout () {
        await this.buttonLogout.click();
    }

    async startResetAppState () {
        await this.buttonResetAppState.click();
    }

    async startCart () {
        await this.buttonCart.click();
    }

    async startAddToCart (product) {
        await this.buttonAddToCart(product).click();
    }

    async startRemoveFromCart (product) {
        await this.buttonRemove(product).click();
    }

    async startLogo () {
        await this.visualLogo.click();
    }

    open () {
        return browser.url(`https://www.saucedemo.com`)
    }
}