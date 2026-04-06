import { $ } from '@wdio/globals';
import Main from './main.js';

class ProductsPage extends Main {
    
    get titleProducts () {
        return $('.title');
    }
}

export default new ProductsPage();