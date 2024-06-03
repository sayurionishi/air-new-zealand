import {expect, test as base} from '@playwright/test';
import {SearchPage} from './searchPage';
import {SelectFlightsPage} from "./selectFlightsPage";
import {PassengerDetailsPage} from "./passengerDetailsPage";
import {ExtrasPage} from "./extrasPage";
import {SelectSeatsPage} from "./selectSeatsPage";
import {ReviewAndPayPage} from "./reviewAndPayPage";
import {BookingJourney} from "./bookingJourney";

type MyFixtures = {
    searchPage: SearchPage;
    selectFlightsPage: SelectFlightsPage;
    passengerDetailsPage: PassengerDetailsPage;
    extrasPage: ExtrasPage;
    selectSeatsPage: SelectSeatsPage;
    reviewAndPayPage: ReviewAndPayPage;
    bookingJourney: BookingJourney;

};

export const test = base.extend<MyFixtures>({
    searchPage: async ({page}, use) => {
        // Set up the fixture.
        const searchPage = new SearchPage(page);
        await searchPage.load();

        // Use the fixture value in the test.
        await use(searchPage);

        // Clean up the fixture.
    },
    selectFlightsPage: async ({page}, use) => {
        await use(new SelectFlightsPage(page));
    },
    passengerDetailsPage: async ({page}, use) => {
        await use(new PassengerDetailsPage(page));
    },
    extrasPage: async ({page}, use) => {
        await use(new ExtrasPage(page));
    },
    selectSeatsPage: async ({page}, use) => {
        await use(new SelectSeatsPage(page));
    },
    reviewAndPayPage: async ({page}, use) => {
        await use(new ReviewAndPayPage(page));
    },
    bookingJourney: async ({page}, use) => {
        await use(new BookingJourney(page));
    },
});

export {expect} from '@playwright/test';
