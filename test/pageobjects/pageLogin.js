import { $ } from '@wdio/globals';
import Main from './main.js';

class LoginPage extends Main {

    get fieldUsername () {
        return $('#user-name');
    }

    get fieldPassword () {
        return $('#password');
    }

    get buttonLogin () {
        return $('#login-button');
    }

    get errorLockedOutUser () {
        return $('[data-test="error"]');
    }

    listUsernamesAccepted = ['standard_user', 'locked_out_user', 'problem_user', 'performance_glitch_user', 'error_user', 'visual_user'];

    async startLogin (username, password) {
        await this.fieldUsername.setValue(username);
        await this.fieldPassword.setValue(password);
        await this.buttonLogin.click();
    }

    open () {
        return super.open();
    }
}

export default new LoginPage();