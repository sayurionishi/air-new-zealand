import {type Locator, type Page} from '@playwright/test';

export class ExtrasPage {
    readonly page: Page;
    readonly extrasHeader: Locator;
    readonly continueButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.extrasHeader = page.getByRole('heading', {name: 'Extras'});
        this.continueButton = page.getByRole('button', {name: 'Continue'});
    }


    async clickContinue() {
        await this.continueButton.click();
    }

}