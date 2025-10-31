import api from "./client";

export const getBookings = async (status, token) => {
  const res = await api.get("/bookings/", {
    params: { status },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getBookingsByTrip = async (trip_id, token) => {
  const res = await api.get(`/bookings/${trip_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getBookingById = async (id, token) => {
  const res = await api.get(`/bookings/${id}/by-id`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const createBooking = async (bookingData, token) => {
  const res = await api.post("/bookings", bookingData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const updateBooking = async (id, bookingData, token) => {
  const res = await api.patch(`/bookings/${id}`, bookingData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getLatestBookingWithoutAssessment = async (token) => {
  const res = await api.get("/bookings/without-assessment", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
