import {type Locator, type Page} from '@playwright/test';
import {PassengerDetails} from "../utils/interfaces";

export class PassengerDetailsPage {
    readonly page: Page;
    readonly passengerDetailsHeader: Locator;
    readonly titleDropdown: Locator;
    readonly firstNameInput: Locator;
    readonly familyNameInput: Locator;
    readonly mobileInput: Locator;
    readonly emailAddressInput: Locator;
    readonly continueButton: Locator;
    readonly errorAlertText: Locator;


    constructor(page: Page) {
        this.page = page;
        this.passengerDetailsHeader = page.getByRole('heading', {name: 'Enter passenger details'});
        this.titleDropdown = page.getByLabel('Title');
        this.firstNameInput = page.getByLabel('First name');
        this.familyNameInput = page.getByLabel('Family name');
        this.mobileInput = page.getByLabel('Mobile or Landline');
        this.emailAddressInput = page.getByLabel('Email address');
        this.continueButton = page.getByRole('button', {name: 'Continue'});
        this.errorAlertText = page.getByText('There are 4 problems on this page.Please review and complete.')
    }


    async enterPassengerDetails(passengerDetails: PassengerDetails) {
        await this.titleDropdown.click();
        await this.titleDropdown.selectOption(passengerDetails.title);
        await this.firstNameInput.fill(passengerDetails.firstName);
        await this.familyNameInput.fill(passengerDetails.familyName);
        await this.mobileInput.fill(passengerDetails.mobile);
        await this.emailAddressInput.fill(passengerDetails.emailAddress);
        await this.continueButton.click();
    }

}