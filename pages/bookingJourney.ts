import {Page} from '@playwright/test';
import {SearchPage} from '../pages/searchPage';
import {PassengerDetailsPage} from '../pages/passengerDetailsPage';
import {SelectFlightsPage} from "./selectFlightsPage";
import {ExtrasPage} from "./extrasPage";
import {FlightDetails, PassengerDetails} from '../utils/interfaces';
import {expect} from "./fixtures.page";
import {getRandomNumber} from "../utils/parse.util";

export class BookingJourney {
    readonly page: Page;
    readonly searchPage: SearchPage;
    readonly selectFlightsPage: SelectFlightsPage;
    readonly passengerDetailsPage: PassengerDetailsPage;
    readonly extrasPage: ExtrasPage;

    constructor(page: Page) {
        this.page = page;
        this.searchPage = new SearchPage(page);
        this.selectFlightsPage = new SelectFlightsPage(page);
        this.passengerDetailsPage = new PassengerDetailsPage(page);
        this.extrasPage = new ExtrasPage(page);
    }

    async selectFlightAndEnterPassengerDetails(flightDetails: FlightDetails, passengerDetails: PassengerDetails) {
        // Handle navigation to flight search page
        await this.searchPage.load();
        await this.searchPage.searchFlights(flightDetails);

        // Handle navigation to flight selection page
        let searchFlightResults = await this.selectFlightsPage.getToAvailableFlights();
        let selectedRow = getRandomNumber(searchFlightResults.rows - 1)
        let selectedCell = getRandomNumber(searchFlightResults.cells - 1)
        await this.selectFlightsPage.selectFlights(selectedRow, selectedCell)

        // Handle navigation to passenger details page
        await this.passengerDetailsPage.passengerDetailsHeader.waitFor();
        await this.passengerDetailsPage.enterPassengerDetails(passengerDetails);

        // Handle navigation to extras page
        await this.extrasPage.extrasHeader.waitFor();
        await this.extrasPage.clickContinue();
    }
}
