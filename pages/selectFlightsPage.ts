import {expect, type Locator, type Page} from '@playwright/test';

export class SelectFlightsPage {
    readonly page: Page;
    readonly selectYourFlightsText: Locator;
    readonly flightToResultHeaderText: Locator;
    readonly flightReturnResultHeaderText: Locator;
    readonly flightToHeaderText: Locator;
    readonly flightReturnHeaderText: Locator;
    readonly toOptionsRows: Locator;
    readonly fromOptionsRows: Locator;
    readonly optionCell: Locator;
    readonly flightAmountText: Locator;
    readonly continueButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.selectYourFlightsText = page.getByRole('heading', {name: 'Select your flights'});
        this.flightToResultHeaderText = page.locator('(//span[contains(@data-bind, \'segment.title\')])[1]');
        this.flightReturnResultHeaderText = page.locator('(//span[contains(@data-bind, \'segment.title\')])[2]');
        this.flightToHeaderText = page.locator('(//span[contains(@data-bind, \'component.leg.heading\')])[1]');
        this.flightReturnHeaderText = page.locator('(//span[contains(@data-bind, \'component.leg.heading\')])[2]');
        this.toOptionsRows = page.locator('//div[@id=\'viewpoint-DOMESTIC-1\']//div[contains(@class,\'option-costs-row\')]');
        this.fromOptionsRows = page.locator('//div[@id=\'viewpoint-DOMESTIC-2\']//div[contains(@class,\'option-costs-row\')]');
        this.optionCell = page.locator('//div[contains(@class,\'vui-si-cost-label-value\')]');
        this.flightAmountText = page.locator('//span[contains(@class,\'vui-hud-amount\')]');
        this.continueButton = page.getByRole('button', {name: 'Continue'});
    }

    async selectToFlight(row, column) {
        let cell = this.toOptionsRows.nth(row).locator('//div[contains(@class,\'vui-si-cost-label-value\')]').nth(column)
        await cell.click();
        return cell.innerText();
    }

    async selectReturnFlight(row, column) {
        let cell = this.fromOptionsRows.nth(row).locator('//div[contains(@class,\'vui-si-cost-label-value\')]').nth(column)
        await cell.click();
        return cell.innerText();
    }

    async selectFlights(row, column) {
        await this.selectToFlight(row, column);
        await this.selectReturnFlight(row, column);
        await this.continueButton.click();
    }


    async getToAvailableFlights() {
        await this.flightToHeaderText.waitFor()
        let cells = 0;
        let rows = await this.toOptionsRows.count()
        if (rows > 0) {
            cells = await this.toOptionsRows.nth(0).locator('//div[contains(@class,\'vui-si-cost-label-value\')]').count()
        }
        return {
            'rows': rows,
            'cells': cells
        }

    }

    async getFromAvailableFlights() {
        await this.flightReturnHeaderText.waitFor()
        let cells = 0;
        let rows = await this.fromOptionsRows.count()
        if (rows > 0) {
            cells = await this.fromOptionsRows.nth(0).locator('//div[contains(@class,\'vui-si-cost-label-value\')]').count()
        }
        return {
            'rows': rows,
            'cells': cells
        }

    }
}