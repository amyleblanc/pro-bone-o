const { prisma } = require("../prisma");

// POST Create a new booking
//requires data object for booking information
//ex: {sitter_booking: true, start_time: "2022-05-06T08:00:00.000Z"}
async function createbooking(bookingData) {
  const booking = await prisma.booking.create({
    data: bookingData,
  });
  return booking;
}

// GET booking and included user from booking id
//requires bookingID
async function getBooking(bookingID) {
  const booking = await prisma.booking.findUnique({
    where: { id: Number(bookingID) },
    include: { users: true },
  });
  return booking;
}

// GET all bookings for a specific user, optionally by open or closed
//requires userID; optional completed {boolean}
async function getBookingsUserSpecific(userID, completed) {
  const isComplete = completed ? completed : false;
  const booking = await prisma.booking.findMany({
    where: { user_id: Number(userID) },
    include: { listing: { where: { archived: isComplete } } },
  });
  return booking;
}

// PUT updates a booking with new information
// can be used to review and rate a booking after
//requires bookingID and data as an object
// ex data = {rating: 4, review: "was decent"}
async function updatebooking(bookingID, data) {
  const booking = await prisma.booking.update({
    where: { id: Number(bookingID) },
    data: data,
  });
  return booking;
}

module.exports = {
  createbooking,
  getBooking,
  getBookingsUserSpecific,
  updatebooking,
};
