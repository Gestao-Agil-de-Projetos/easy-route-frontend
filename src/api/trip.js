import api from "./client";

export const getTripsByRoute = async (route_id) => {
  const res = await api.get(`/trips/${route_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getTripById = async (id) => {
  const res = await api.get(`/trips/${id}/by-id`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getTripsByUserId = async (user_id) => {
  const res = await api.get(`/trips/${user_id}/by-user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getTripsNearby = async (
  latitude,
  longitude,
  token,
  radius = 0.25
) => {
  const res = await api.get("/trips/nearby-by-coordinates", {
    params: { latitude, longitude, radius },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getTripsByCoordinates = async (
  start_name,
  end_name,
  date,
  token
) => {
  const res = await api.get("/trips/by-coordinates", {
    params: {
      start_name,
      end_name,
      date,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getTripsByOwner = async (status) => {
  const res = await api.get("/trips/by-owner", {
    params: { status },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const createTrip = async (tripData) => {
  const res = await api.post("/trips", tripData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const updateTrip = async (id, tripData) => {
  const res = await api.patch(`/trips/${id}`, tripData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
