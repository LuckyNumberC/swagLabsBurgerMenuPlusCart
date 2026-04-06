import { $ } from '@wdio/globals';
import Main from './main.js';

class YourCartPage extends Main {

    get titleYourCart () {
        return $('.title');
    }

    get buttonContinueShopping () {
        return $('#continue-shopping');
    }

    get buttonCheckout () {
        return $('#checkout');
    }

    async startContinueShopping () {;
        await this.buttonContinueShopping.click();
    }

    async startCheckout () {;
        await this.buttonCheckout.click();
    }

}

export default new YourCartPage();