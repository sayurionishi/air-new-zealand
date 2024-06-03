import {expect, test} from '../pages/fixtures.page'
import {FlightDetails} from "../utils/interfaces";

test.describe('Flight Search Field Tests', () => {
    test('verify title', async ({searchPage, page}) => {
        // Expect a title 'to contain' a substring.
        await expect(page).toHaveTitle(/Book a Flight - Air New Zealand/);
    });

    // Verify origin entered is valid
    const origins = ['Auckland', 'Zurich'];
    for (const origin of origins) {
        test(`verify valid origin - ${origin}`, async ({searchPage}) => {
            await searchPage.enterOrigin(origin);
            await expect(searchPage.dropdownValue(origin)).toBeVisible();
            await expect(searchPage.noAirportText).not.toBeVisible();
        });
    }

    // Verify invalid origin shows no airport found
    test('verify invalid origin', async ({searchPage}) => {
        await searchPage.enterOrigin('Invalid');
        await expect(searchPage.noAirportText).toBeVisible();
    });

    // Verify destination entered is valid
    const departures = ['Auckland', 'Zurich'];
    for (const departure of departures) {
        test(`verify valid destination - ${departure}`, async ({searchPage}) => {
            await searchPage.enterDestination(departure);
            await expect(searchPage.dropdownValue(departure)).toBeVisible();
            await expect(searchPage.noAirportText).not.toBeVisible();
        });
    }

    // Verify invalid destination shows no airport found
    test('verify invalid destination', async ({searchPage}) => {
        await searchPage.enterDestination('Invalid');
        await expect(searchPage.noAirportText).toBeVisible();
    });

    // Verify origin and destination must not be the same
    const places = ['Wellington', 'Queenstown'];
    for (const place of places) {
        test(`verify same origin and destination - ${place}`, async ({searchPage, page}) => {
            await searchPage.enterOrigin(place);
            await searchPage.enterDestination(place);
            await searchPage.clickSearch();
            await expect(searchPage.sameOriginDestinationErrorText).toBeVisible();
        });
    }


    // Verify leave date must not be after return date
    test('verify invalid dates', async ({searchPage}) => {
        const flightDetails: FlightDetails = {
            'origin': 'Auckland',
            'destination': 'Queenstown',
            'leaveDate': '11/06',
            'returnDate': '10/06'
        }
        await searchPage.searchFlights(flightDetails);
        await expect(searchPage.requestedReturnDateBeforeDepatureDateErrorText).toBeVisible();
    });

})
