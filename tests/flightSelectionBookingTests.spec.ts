import {expect, test} from '../pages/fixtures.page'
import {currencyToNumber} from "../utils/parse.util";
import {flightDetails, passengerDetails} from "../utils/testData";

test.describe('Flight Selection and Booking Tests', () => {

    test('verify user can select flight', async ({searchPage, selectFlightsPage}) => {
        await searchPage.searchFlights(flightDetails);
        let toFlightPrice = await selectFlightsPage.selectToFlight(1, 1);
        let returnFlightPrice = await selectFlightsPage.selectReturnFlight(0, 0);
        let flightAmount = currencyToNumber(returnFlightPrice) + currencyToNumber(toFlightPrice)
        await expect(selectFlightsPage.flightAmountText).toContainText(String(flightAmount));
    });

    test('verify user can proceed booking', async ({searchPage, selectFlightsPage, passengerDetailsPage}) => {
        await searchPage.searchFlights(flightDetails);
        await selectFlightsPage.selectFlights(4, 3);
        await expect(passengerDetailsPage.passengerDetailsHeader).toBeVisible();
    });

    test('verify user can enter passenger details', async ({
                                                               searchPage,
                                                               selectFlightsPage,
                                                               passengerDetailsPage,
                                                               extrasPage,
                                                           }) => {
        await searchPage.searchFlights(flightDetails);
        await selectFlightsPage.selectFlights(4, 3);
        await passengerDetailsPage.enterPassengerDetails(passengerDetails);
        await expect(extrasPage.extrasHeader).toBeVisible();
    });

})
