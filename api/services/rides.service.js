const Ride = require("../models/ride");

class RidesService {

    async getRides(filters={}) {
        if (Object.keys(filters).length === 0) {
            return [];
        }
        const formattedFilters = this.formatFilters(filters);
        const rides = await Ride.find(formattedFilters);
        return rides;
    }

    async createRide(rideDetails) {
        this.validateCreateRideFields(rideDetails);
        const ride = new Ride(rideDetails)
        await ride.save();
        return ride;
    }

    validateCreateRideFields(rideDetails) {
        this.validateLocationField("from", rideDetails.from);
        this.validateLocationField("to", rideDetails.to);
        this.validateLocationsAreDifferent(rideDetails.from, rideDetails.to, "from", "to");
        this.validateStartDateAndTime(rideDetails.startDateAndTime);
        this.validateNumberOfSeats(rideDetails.numberOfSeats);
        this.validatePricePerSeat(rideDetails.pricePerSeat);
        this.validatePreferences(rideDetails.preferences);
        this.validatePaymentType(rideDetails.paymentType);
        this.validateStops(rideDetails.stops, rideDetails.from, rideDetails.to);
    }

    validateLocationField(type, value) {
        if (value === undefined || value === null) {
            throw new Error(`${type} location is required`)
        }
        if (typeof value !== "object") {
            throw new Error(`${type} location must be an object`)
        }
        if (Object.keys(value).length === 0) {
            throw new Error(`${type} location cannot be empty`)
        }
        if (value.locationName === undefined || value.locationName === null || value.locationName.trim() === "") {
            throw new Error(`Location name of ${type} is required`)
        }
        if (value.latitude === undefined || value.latitude === null) {
            throw new Error(`Latitude of ${type} is required`)
        }
        if (typeof value.latitude !== "number") {
            throw new Error(`Latitude of ${type} must be a number`)
        }
        if (value.longitude === undefined || value.longitude === null) {
            throw new Error(`Longitude of ${type} is required`)
        }
        if (typeof value.longitude !== "number") {
            throw new Error(`Longitude of ${type} must be a number`)
        }
    }

    validateLocationsAreDifferent(location1, location2, location1Name, location2Name) {
        if (
            location1.latitude === location2.latitude &&
            location1.longitude === location2.longitude
        ) {
            throw new Error(`${location1Name} and ${location2Name} must be different locations`);
        }
    }

    validateStartDateAndTime(dateTime) {
        if (dateTime === undefined || dateTime === null) {
            throw new Error("Start date and time are required")
        }
        const parsedDate = Date.parse(dateTime)
        if (isNaN(parsedDate)) {
            throw new Error("Start date and time value is not valid date time string");
        }
    }

    validateNumberOfSeats(numberOfSeats) {
        if (numberOfSeats === undefined || numberOfSeats === null) {
            throw new Error("Number of seats is required");
        }
        if (typeof numberOfSeats !== "number") {
            throw new Error("Number of seats must be a number");
        }
    }

    validatePricePerSeat(pricePerSeat) {
        if (pricePerSeat === undefined || pricePerSeat === null) {
            throw new Error("Price per seat is required");
        }
        if (typeof pricePerSeat !== "number") {
            throw new Error("Price per seat must be a number");
        }
    }

    validatePreferences(preferences) {
        if (!(preferences instanceof Array)) {
            throw new Error("Preferences must be an array");
        }
    }

    validatePaymentType(paymentType) {
        if (paymentType !== "cash" && paymentType !== "card") {
            throw new Error("Payment type must be 'cash' or 'card'");
        }
    }

    validateStops(stops, from, to) {
        for (let stopIndex = 0; stopIndex < stops.length; stopIndex++) {
            const stop = stops[stopIndex];
            this.validateLocationField("Stop[" + stopIndex + "]", stop);
            this.validateLocationsAreDifferent(stop, from, `Stop[${stopIndex}]`, `from`);
            this.validateLocationsAreDifferent(stop, to, `Stop[${stopIndex}]`, `to`);
            for (let repeatIndex = 0; repeatIndex < stops.length; repeatIndex++) {
                if (repeatIndex === stopIndex) {
                    continue;
                }
                const checkStop = stops[repeatIndex];
                this.validateLocationsAreDifferent(
                    stop, checkStop, `Stop[${stopIndex}]`, `Stop[${repeatIndex}]`
                )
            }
        }
    }

    formatFilters(filters) {
        const { from, to, ...otherFilters } = filters
        const formattedFilters = {
            ...otherFilters
        };
        if (from) {
            formattedFilters["from.locationName"] = from
        }
        if (to) {
            formattedFilters["to.locationName"] = to
        }
        return formattedFilters;
    }

}

module.exports = new RidesService