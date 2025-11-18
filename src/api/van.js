import api from "./client";

export const getAllVans = async (token) => {
  try {
    const res = await api.get("/vans", {
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

export const getVanById = async (id, token) => {
  const res = await api.get(`/vans/${id}/by-id`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const createVan = async (vanData, token) => {
  const res = await api.post("/vans", vanData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const updateVan = async (id, vanData, token) => {
  const res = await api.patch(`/vans/${id}`, vanData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deleteVan = async (id, token) => {
  const res = await api.delete(`/vans/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
