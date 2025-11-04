export function parseToDate(dateInput) {
  if (dateInput === "Hoje") return new Date();

  if (dateInput === "Amanhã") {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  }

  if (typeof dateInput === "string" && dateInput.includes("/")) {
    const [day, month, year] = dateInput.split("/").map((n) => parseInt(n, 10));
    return new Date(year || new Date().getFullYear(), month - 1, day);
  }

  if (dateInput instanceof Date) return dateInput;

  return new Date(); // fallback
}

export function formatDisplayDate(date) {
  const today = new Date();
  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  if (isToday) return "Hoje";

  const sameYear = date.getFullYear() === today.getFullYear();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");

  return sameYear ? `${day}/${month}` : `${day}/${month}/${date.getFullYear()}`;
}

export function toISODate(date) {
  return date.toISOString().split("T")[0];
}

export function formatHour(dateInput) {
  const date = new Date(dateInput);
  if (isNaN(date)) return "--";
  const horas = String(date.getHours()).padStart(2, "0");
  const minutos = String(date.getMinutes()).padStart(2, "0");
  return `${horas}:${minutos}`;
}

export function calculateDuration(start_time, estimated_end_time) {
  const start = new Date(start_time);
  const end = new Date(estimated_end_time);

  const diffMs = end - start;
  const diffMin = Math.floor(diffMs / 1000 / 60);

  const horas = Math.floor(diffMin / 60);
  const minutos = diffMin % 60;

  return `${horas}h ${minutos}min`;
}