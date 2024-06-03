import {expect, test} from '../pages/fixtures.page'
import {flightDetails} from "../utils/testData";

test.describe('Flight Search Functionality Tests', () => {

    test('verify search flight', async ({searchPage, selectFlightsPage}) => {
        await searchPage.searchFlights(flightDetails);
        await expect(selectFlightsPage.selectYourFlightsText).toBeVisible();
    });

    test('verify search flight results', async ({searchPage, selectFlightsPage}) => {
        await searchPage.searchFlights(flightDetails);
        // verify correct flight route
        await expect(selectFlightsPage.flightToResultHeaderText).toContainText(`${flightDetails.origin} to ${flightDetails.destination}`)
        await expect(selectFlightsPage.flightReturnResultHeaderText).toContainText(`${flightDetails.destination} to ${flightDetails.origin}`)
        await expect(selectFlightsPage.flightToHeaderText).toContainText(`To ${flightDetails.destination}`)
        await expect(selectFlightsPage.flightReturnHeaderText).toContainText(`Return to ${flightDetails.origin}`)
        // verify flights are available
        let searchFlightResults = await selectFlightsPage.getToAvailableFlights();
        expect(searchFlightResults.rows).toBeGreaterThan(0)
        expect(searchFlightResults.cells).toBeGreaterThan(0)
    });

})
