import api from "./client";

export const getRoutesByVan = async (van_id, token) => {
  try {
    const res = await api.get(`/routes/${van_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return { success: false, data: [] };
    }
    throw error;
  }
};

export const getRouteById = async (id, token) => {
  const res = await api.get(`/routes/${id}/by-id`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const createRoute = async (routeData, token) => {
  const res = await api.post("/routes", routeData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const updateRoute = async (id, routeData, token) => {
  const res = await api.patch(`/routes/${id}`, routeData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deleteRoute = async (id, token) => {
  const res = await api.delete(`/routes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
