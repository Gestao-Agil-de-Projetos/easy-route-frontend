import api from "./client";

export const createAssessment = async (data, token) => {
  const res = await api.post("/assessment", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
