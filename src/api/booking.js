import api from "./client";

export const getBookings = async (status, token) => {
  try {
    const res = await api.get("/bookings/", {
      params: { status },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    // Se a API retornar 404, significa que não há bookings, retorna array vazio
    if (error.response?.status === 404) {
      return { success: false, data: [] };
    }
    throw error;
  }
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
  try {
    const res = await api.get("/bookings/without-assessment", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    // Se houver erro (400, 404, etc), retorna null ao invés de falhar
    if (error.response?.status === 400 || error.response?.status === 404) {
      return { success: false, data: null };
    }
    throw error;
  }
};
