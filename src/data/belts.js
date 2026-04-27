// ITF Taekwondo belt catalog. Keyed by rank (gup = colored, dan = black).
// `base` is the main belt color, `stripe` is an optional half-width stripe,
// `dan` is the count of gold ticks for black belts, `tick` is the tick color.

const DAN_BASE = '#212121'
const DAN_TICK = '#FFC107'
const dan = (n) => ({ base: DAN_BASE, tick: DAN_TICK, dan: n, label: `Black (${n} dan)` })

export const BELTS = {
  '10gup': { base: '#FFFFFF', label: 'White' },
  '9gup': { base: '#FFFFFF', stripe: '#FDD835', label: 'White / yellow stripe' },
  '8gup': { base: '#FDD835', label: 'Yellow' },
  '7gup': { base: '#FDD835', stripe: '#43A047', label: 'Yellow / green stripe' },
  '6gup': { base: '#43A047', label: 'Green' },
  '5gup': { base: '#43A047', stripe: '#1E88E5', label: 'Green / blue stripe' },
  '4gup': { base: '#1E88E5', label: 'Blue' },
  '3gup': { base: '#1E88E5', stripe: '#E53935', label: 'Blue / red stripe' },
  '2gup': { base: '#E53935', label: 'Red' },
  '1gup': { base: '#E53935', stripe: '#212121', label: 'Red / black stripe' },
  '1dan': dan(1), '2dan': dan(2), '3dan': dan(3),
  '4dan': dan(4), '5dan': dan(5), '6dan': dan(6),
}
