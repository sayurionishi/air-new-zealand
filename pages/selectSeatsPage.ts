import {type Locator, type Page} from '@playwright/test';
import {getRandomNumber} from "../utils/parse.util";

export class SelectSeatsPage {
    readonly page: Page;
    readonly selectYourSeatsHeader: Locator;
    readonly continueButton: Locator;
    readonly availableSeatsButton: Locator;
    readonly unavailableSeatsButton: Locator;
    readonly occupiedSeatsButton: Locator;
    readonly notSelectedText: Locator;
    readonly seatSelectedText: Locator;
    readonly nextFlightButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.selectYourSeatsHeader = page.getByRole('heading', {name: 'Select your seats'});
        this.continueButton = page.getByLabel('Go to next booking step').getByRole('button', {name: 'Continue'});
        this.availableSeatsButton = page.getByRole('button', {name: /Available Standard economy seat/})
        this.unavailableSeatsButton = page.locator('//div[contains(@class,\'vui-ss-unavailable\')]');//page.getByText(/[0-9]+. Unavailable seat /);
        this.occupiedSeatsButton = page.locator('//div[contains(@class,\'vui-ss-occupied\')]')
        this.notSelectedText = page.getByRole('option', {name: 'Not selected'});
        this.seatSelectedText = page.locator('//div[contains(@class,\'vui-ss-aside\')and not(contains(@class,\'affix-disabled\'))]//div[@class=\'vui-ss-seat-number\']')
        this.nextFlightButton = page.getByLabel('Go to next booking step').getByRole('button', {name: 'Next flight'});
    }

    async selectAvailableSeat() {
        let available = await this.availableSeatsButton.count();
        let randomAvailable = getRandomNumber(available - 1)
        let selectedSeat = this.availableSeatsButton.nth(randomAvailable)
        await selectedSeat.click();
        return selectedSeat.locator('//div[@class=\'vui-ss-seat-number\']').innerText();
    }

    async selectOccupiedSeat() {
        await this.notSelectedText.waitFor();
        let occupied = await this.occupiedSeatsButton.count();
        let randomOccupied = getRandomNumber(occupied - 1);
        let selectedSeat = this.unavailableSeatsButton.nth(randomOccupied);
        await selectedSeat.click();
        return selectedSeat.locator('//div[@class=\'vui-ss-seat-number\']').innerText();
    }

    async selectUnavailableSeat() {
        await this.notSelectedText.waitFor();
        let unavailable = await this.unavailableSeatsButton.count();
        let randomUnavailable = getRandomNumber(unavailable - 1)
        let selectedSeat = this.unavailableSeatsButton.nth(randomUnavailable);
        await selectedSeat.click();
        return selectedSeat.locator('//div[@class=\'vui-ss-seat-number\']').innerText();

    }


    async clickContinue() {
        await this.continueButton.click();
    }

}