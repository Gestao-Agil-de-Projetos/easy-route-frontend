const OSRM_BASE_URL = `${import.meta.env.VITE_OSRM_URL}/route/v1/driving`;
const NOMINATIM_BASE_URL = import.meta.env.VITE_NOMINATIM_URL;
const ALLORIGINS_URL = `${import.meta.env.VITE_ALLORIGINS_URL}/raw`;

export const fetchRoute = async (start, end) => {
  try {
    const url = `${OSRM_BASE_URL}/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Erro ao buscar rota: ' + error.message);
  }
};

export const fetchLocationName = async (latitude, longitude) => {
  try {
    const nominatimUrl = `${NOMINATIM_BASE_URL}/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=pt-BR`;
    const url = `${ALLORIGINS_URL}?url=${encodeURIComponent(nominatimUrl)}`;
    
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Erro ao buscar localização: ' + error.message);
  }
};
