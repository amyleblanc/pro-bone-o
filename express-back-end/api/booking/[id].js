import prisma from "../prisma";

// POST Create a new booking
//requires data object for booking information
//ex: {sitter_booking: true, start_time: "2022-05-06T08:00:00.000Z"}
export default async function createbooking(bookingData) {
  const booking = await prisma.booking.create({
    data: bookingData,
  });
  return booking;
}

// GET booking and included user from booking id
//requires bookingID
export default async function getBooking(bookingID) {
  const booking = await prisma.booking.findUnique({
    where: { id: Number(bookingID) },
    include: { users: true },
  });
  return booking;
}

// GET all bookings for a specific user, optionally by open or closed
//requires userID; optional completed {boolean}
export default async function getBooking(userID,completed) {
  const isComplete = completed ? completed : false;
  const booking = await prisma.booking.findMany({
    where: { user_id: Number(userID) },
    include: { listing: {where: {archived:isComplete }} },
  });
  return booking;
}