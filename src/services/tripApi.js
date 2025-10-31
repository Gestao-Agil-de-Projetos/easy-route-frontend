/**
 * Mock API Service para Viagens
 */

// Dados mock - será substituído pelo backend
const mockActiveTrips = [
  { 
    id: 1, 
    origin: 'Vitória da Conquista', 
    destination: 'Rio de Janeiro',
    originLocation: 'Vitória da Conquista, BA',
    destinationLocation: 'Rio de Janeiro, RJ',
    date: '30/10/2025', 
    time: '14:00', 
    status: 'LOTADO', 
    passengers: 13, 
    capacity: 13, 
    passengersList: [
      { name: 'Ana Vitoria', pickup: 'Shopping Conquista Sul' },
      { name: 'Bruno Costa', pickup: 'Entrada do IFBA' },
      { name: 'Carla Dias', pickup: 'Rodoviária VCA' },
      { name: 'Daniel Moreira', pickup: 'Entrada da UNEX' },
      { name: 'Elisa Fernandes', pickup: 'Shopping Conquista Sul' },
      { name: 'Fábio Guedes', pickup: 'Entrada do IFBA' },
      { name: 'Gabriela Lima', pickup: 'Rodoviária VCA' },
      { name: 'Hugo Mendes', pickup: 'Entrada da UNEX' },
      { name: 'Isabela Nunes', pickup: 'Shopping Conquista Sul' },
      { name: 'João Paulo', pickup: 'Entrada do IFBA' },
      { name: 'Larissa Rocha', pickup: 'Rodoviária VCA' },
      { name: 'Marcos Silva', pickup: 'Entrada da UNEX' },
      { name: 'Mariana Oliveira', pickup: 'Rodoviária VCA' },
    ],
    pickupRoute: [
      { location: 'Entrada do IFBA', count: 3 },
      { location: 'Entrada da UNEX', count: 3 },
      { location: 'Rodoviária VCA', count: 4 },
      { location: 'Shopping Conquista Sul', count: 3 },
    ]
  },
  { 
    id: 2, 
    origin: 'Vitória da Conquista', 
    destination: 'Ilhéus',
    originLocation: 'Vitória da Conquista, BA',
    destinationLocation: 'Ilhéus, BA',
    date: '30/10/2025', 
    time: '09:00', 
    status: 'ABERTA', 
    passengers: 8, 
    capacity: 13,
    passengersList: [
      { name: 'Alex Santos', pickup: 'Entrada do IFBA' },
      { name: 'Beatriz Lima', pickup: 'Rodoviária VCA' },
      { name: 'César Oliveira', pickup: 'Entrada da UNEX' },
      { name: 'Denise Rocha', pickup: 'Shopping Conquista Sul' },
      { name: 'Emerson Costa', pickup: 'Entrada do IFBA' },
      { name: 'Fernanda Silva', pickup: 'Rodoviária VCA' },
      { name: 'Gustavo Mendes', pickup: 'Entrada da UNEX' },
      { name: 'Helena Dias', pickup: 'Shopping Conquista Sul' },
    ],
    pickupRoute: [
      { location: 'Entrada do IFBA', count: 2 },
      { location: 'Entrada da UNEX', count: 2 },
      { location: 'Rodoviária VCA', count: 2 },
      { location: 'Shopping Conquista Sul', count: 2 },
    ]
  },
];

const mockReservations = [
  { 
    id: 1, 
    origin: 'Vitória da Conquista', 
    destination: 'São Paulo',
    originLocation: 'Vitória da Conquista, BA',
    destinationLocation: 'São Paulo, SP',
    date: '28/10/2025', 
    time: '11:30', 
    status: 'AGENDADA', 
    passengers: 2, 
    capacity: 13, 
    passengersList: ['Marcos Andrade (Ponto: Rodoviária VCA)', 'Luisa Pereira (Ponto: Entrada do IFBA)'] 
  },
  { 
    id: 2, 
    origin: 'Vitória da Conquista', 
    destination: 'Belo Horizonte',
    originLocation: 'Vitória da Conquista, BA',
    destinationLocation: 'Belo Horizonte, MG',
    date: '29/10/2025', 
    time: '08:00', 
    status: 'AGENDADA', 
    passengers: 5, 
    capacity: 13, 
    passengersList: ['João Silva (Ponto: Rodoviária)', 'Maria Santos (Ponto: IFBA)', 'Pedro Costa (Ponto: Shopping)', 'Ana Lima (Ponto: Rodoviária)', 'Carlos Mendes (Ponto: UNEX)'] 
  },
];

const mockHistoryTrips = [
  { 
    id: 1, 
    origin: 'Vitória da Conquista', 
    destination: 'Salvador',
    date: '20/10/2025', 
    fare: 'R$ 455,00', 
    passengers: 13, 
    passengers_list: ['Ana', 'Bruno', 'Carla', 'Daniel', 'Elisa', 'Fábio', 'Gabriela', 'Hugo', 'Isabela', 'João', 'Larissa', 'Marcos', 'Mariana'] 
  },
  { 
    id: 2, 
    origin: 'Vitória da Conquista', 
    destination: 'Fortaleza',
    date: '18/10/2025', 
    fare: 'R$ 540,00', 
    passengers: 12, 
    passengers_list: ['Carlos', 'Debora', 'Eduardo', 'Fernanda', 'Gustavo', 'Helena', 'Igor', 'Julia', 'Kevin', 'Laura', 'Marcio', 'Natalia'] 
  },
];

export const fetchActiveTrips = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockActiveTrips);
    }, 300);
  });
};

export const fetchReservations = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockReservations);
    }, 300);
  });
};

export const fetchHistoryTrips = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockHistoryTrips);
    }, 300);
  });
};

export const createTrip = async (tripData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newTrip = {
        id: mockActiveTrips.length + 1,
        ...tripData,
        passengers: 0,
        passengersList: [],
        pickupRoute: [],
      };
      resolve(newTrip);
    }, 500);
  });
};

export const deleteTrip = async (tripId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 300);
  });
};
