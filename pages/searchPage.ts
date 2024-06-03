import {type Locator, type Page} from '@playwright/test';
import {FlightDetails} from "../utils/interfaces";

export class SearchPage {
    readonly page: Page;
    readonly originInput: Locator;
    readonly destinationInput: Locator;
    readonly leaveOnDateInput: Locator;
    readonly returnOnDateInput: Locator;
    readonly searchButton: Locator;
    readonly noAirportText: Locator;
    readonly sameOriginDestinationErrorText: Locator;
    readonly requestedReturnDateBeforeDepatureDateErrorText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.originInput = page.getByLabel('From airport or city');
        this.destinationInput = page.getByLabel('To airport or city');
        this.leaveOnDateInput = page.getByLabel('Leave on date, in day day');
        this.returnOnDateInput = page.getByLabel('Return on date, in day day');
        this.searchButton = page.getByRole('button', {name: 'Search'});
        this.noAirportText = page.getByText('No airport found');
        this.sameOriginDestinationErrorText = page.getByText('Your destination cannot be the same as your point of origin');
        this.requestedReturnDateBeforeDepatureDateErrorText = page.getByText('The requested return date is before the departure date');
    }

    dropdownValue(value: string): Locator {
        return this.page.getByRole('option', {name: value});
    }

    async load() {
        await this.page.goto('/vbook/actions/search');
    }

    async enterOrigin(origin: string) {
        await this.originInput.click();
        await this.originInput.fill(origin);
        await this.page.keyboard.press('Enter')
    }

    async enterDestination(origin: string) {
        await this.destinationInput.click();
        await this.destinationInput.fill(origin);
        await this.page.keyboard.press('Enter')
    }


    async enterLeaveDate(origin: string) {
        await this.leaveOnDateInput.click();
        await this.leaveOnDateInput.fill(origin);
        await this.page.keyboard.press('Enter')
    }


    async enterReturnDate(origin: string) {
        await this.returnOnDateInput.click();
        await this.returnOnDateInput.fill(origin);
        await this.page.keyboard.press('Enter')
    }

    async clickSearch() {
        await this.searchButton.click();
    }


    async searchFlights(flightDetails: FlightDetails) {
        await this.enterOrigin(flightDetails.origin);
        await this.enterDestination(flightDetails.destination);
        await this.enterLeaveDate(flightDetails.leaveDate);
        await this.enterReturnDate(flightDetails.returnDate);
        await this.clickSearch();
    }


}