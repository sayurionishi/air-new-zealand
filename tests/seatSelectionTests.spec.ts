import {expect, test} from '../pages/fixtures.page'
import {flightDetails, passengerDetails} from "../utils/testData";
import exp = require("constants");

test.describe('Seat Selection Tests', () => {


    test('verify user can select seats', async ({
                                                    bookingJourney,
                                                    selectSeatsPage,
                                                    reviewAndPayPage
                                                }) => {
        await bookingJourney.selectFlightAndEnterPassengerDetails(flightDetails, passengerDetails);
        await expect(selectSeatsPage.selectYourSeatsHeader).toBeVisible();

        let selectedSeat = await selectSeatsPage.selectAvailableSeat();
        await expect(selectSeatsPage.notSelectedText).not.toBeVisible();
        await expect(selectSeatsPage.seatSelectedText).toHaveText(selectedSeat)
        while (await selectSeatsPage.nextFlightButton.isVisible()) {
            // select seats for the next flights if available
            await selectSeatsPage.nextFlightButton.click();
            let selectedSeat = await selectSeatsPage.selectAvailableSeat();
            await expect(selectSeatsPage.notSelectedText).not.toBeVisible();
            await expect(selectSeatsPage.seatSelectedText).toHaveText(selectedSeat)
        }
        await selectSeatsPage.clickContinue();
        await expect(reviewAndPayPage.reviewAndPayHeader).toBeVisible();

    });

    test('verify user cannot select unavailable seats', async ({
                                                                   bookingJourney,
                                                                   selectSeatsPage
                                                               }) => {
        await bookingJourney.selectFlightAndEnterPassengerDetails(flightDetails, passengerDetails);
        await expect(selectSeatsPage.selectYourSeatsHeader).toBeVisible();
        let selectedSeat = await selectSeatsPage.selectUnavailableSeat();
        await expect(selectSeatsPage.notSelectedText).toBeVisible();
        await expect(selectSeatsPage.seatSelectedText).not.toHaveText(selectedSeat)
    });

})
