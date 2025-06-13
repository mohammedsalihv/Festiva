export function sanitizeVenueInput(input: any) {
  const extractValues = (val: any) =>
    Array.isArray(val)
      ? val
      : typeof val === "object"
      ? Object.values(val).filter((v) => typeof v === "string")
      : [];

  return {
    venueName: input.venueName,
    rent: input.rent,
    capacity: input.capacity,
    shift: input.shift,
    squareFeet: input.squareFeet,
    timeSlots: extractValues(input.timeSlots),
    availableDates: extractValues(input.availableDates),
    details: input.details,
    features: extractValues(input.features),
    parkingFeatures: extractValues(input.parkingFeatures),
    venueDescription: input.venueDescription,
    terms: input.terms,
    venueImages: extractValues(input.venueImages),
    location: input.location,
    host: input.host,
  };
}
