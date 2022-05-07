import prisma from "../prisma";

//handles requests for individual bookings
export default async function bookings(req, res) {
  const bookingId = req.query.id;

  if (req.method === "GET") {
    handleGET(bookingId, res);
  } else if (req.method === "DELETE") {
    handleDELETE(bookingId, res);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}

// GET /api/booking/:id
async function handleGET(postId, res) {
  const post = await prisma.bookings.findUnique({
    where: { id: Number(postId) },
    include: { author: true },
  });
  res.json(post);
}

// DELETE /api/booking/:id
async function handleDELETE(bookingId, res) {
  const post = await prisma.bookings.delete({
    where: { id: Number(postId) },
  });
  res.json(post);
}
