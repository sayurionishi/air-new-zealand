import {type Locator, type Page} from '@playwright/test';

export class ReviewAndPayPage {
    readonly page: Page;
    readonly reviewAndPayHeader: Locator;
    readonly continueButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.reviewAndPayHeader = page.getByRole('heading', {name: 'Review and pay'});
        this.continueButton = page.getByRole('button', {name: 'Continue'});
    }


    async clickContinue() {
        await this.continueButton.click();
    }

}