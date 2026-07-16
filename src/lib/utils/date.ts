// "2026-06-10" -> "10/06/2026"
export function formatDate(iso: string): string {
  if (!iso) return '';
  const [year, month, day] = iso.split('-');
  return `${day}/${month}/${year}`;
}

// "2026-06-10" -> "10 junio 2026"
export function formatLongDate(iso: string): string {
  if (!iso) return '';
  const months = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
  ];
  const [year, month, day] = iso.split('-');
  return `${parseInt(day, 10)} ${months[parseInt(month, 10) - 1]} ${year}`;
}

// "10:45" -> "10:45 a.m." / "14:30" -> "2:30 p.m."
export function formatTime(hhmm: string): string {
  if (!hhmm) return '';
  const [h, min] = hhmm.split(':').map(Number);
  const period = h < 12 ? 'a.m.' : 'p.m.';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(min).padStart(2, '0')} ${period}`;
}
