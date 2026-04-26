// ITF tul (pattern) catalog. Movement counts per ITF Encyclopedia.
// `belt` describes the rank's belt color: a base color and an optional stripe.
const BELTS = {
  '9gup': { base: '#FFFFFF', stripe: '#FDD835', label: 'White / yellow stripe' },
  '8gup': { base: '#FDD835', label: 'Yellow' },
  '7gup': { base: '#FDD835', stripe: '#43A047', label: 'Yellow / green stripe' },
  '6gup': { base: '#43A047', label: 'Green' },
  '5gup': { base: '#43A047', stripe: '#1E88E5', label: 'Green / blue stripe' },
  '4gup': { base: '#1E88E5', label: 'Blue' },
  '3gup': { base: '#1E88E5', stripe: '#E53935', label: 'Blue / red stripe' },
  '2gup': { base: '#E53935', label: 'Red' },
  '1gup': { base: '#E53935', stripe: '#212121', label: 'Red / black stripe' },
  dan: { base: '#212121', label: 'Black' },
}

export const TULS = [
  { id: 'chon-ji', name: 'Chon-Ji', rank: '9th Gup', movements: 19, belt: BELTS['9gup'] },
  { id: 'dan-gun', name: 'Dan-Gun', rank: '8th Gup', movements: 21, belt: BELTS['8gup'] },
  { id: 'do-san', name: 'Do-San', rank: '7th Gup', movements: 24, belt: BELTS['7gup'] },
  { id: 'won-hyo', name: 'Won-Hyo', rank: '6th Gup', movements: 28, belt: BELTS['6gup'] },
  { id: 'yul-gok', name: 'Yul-Gok', rank: '5th Gup', movements: 38, belt: BELTS['5gup'] },
  { id: 'joong-gun', name: 'Joong-Gun', rank: '4th Gup', movements: 32, belt: BELTS['4gup'] },
  { id: 'toi-gye', name: 'Toi-Gye', rank: '3rd Gup', movements: 37, belt: BELTS['3gup'] },
  { id: 'hwa-rang', name: 'Hwa-Rang', rank: '2nd Gup', movements: 29, belt: BELTS['2gup'] },
  { id: 'choong-moo', name: 'Choong-Moo', rank: '1st Gup', movements: 30, belt: BELTS['1gup'] },
  { id: 'kwang-gae', name: 'Kwang-Gae', rank: '1st Dan', movements: 39, belt: BELTS.dan },
  { id: 'po-eun', name: 'Po-Eun', rank: '1st Dan', movements: 36, belt: BELTS.dan },
  { id: 'ge-baek', name: 'Ge-Baek', rank: '1st Dan', movements: 44, belt: BELTS.dan },
  { id: 'eui-am', name: 'Eui-Am', rank: '2nd Dan', movements: 45, belt: BELTS.dan },
  { id: 'choong-jang', name: 'Choong-Jang', rank: '2nd Dan', movements: 52, belt: BELTS.dan },
  { id: 'juche', name: 'Juche', rank: '2nd Dan', movements: 45, belt: BELTS.dan },
  { id: 'sam-il', name: 'Sam-Il', rank: '3rd Dan', movements: 33, belt: BELTS.dan },
  { id: 'yoo-sin', name: 'Yoo-Sin', rank: '3rd Dan', movements: 68, belt: BELTS.dan },
  { id: 'choi-yong', name: 'Choi-Yong', rank: '3rd Dan', movements: 46, belt: BELTS.dan },
  { id: 'yon-gae', name: 'Yon-Gae', rank: '4th Dan', movements: 49, belt: BELTS.dan },
  { id: 'ul-ji', name: 'Ul-Ji', rank: '4th Dan', movements: 42, belt: BELTS.dan },
  { id: 'moon-moo', name: 'Moon-Moo', rank: '4th Dan', movements: 61, belt: BELTS.dan },
  { id: 'so-san', name: 'So-San', rank: '5th Dan', movements: 72, belt: BELTS.dan },
  { id: 'se-jong', name: 'Se-Jong', rank: '5th Dan', movements: 24, belt: BELTS.dan },
  { id: 'tong-il', name: 'Tong-Il', rank: '6th Dan', movements: 56, belt: BELTS.dan },
]

// Standard ITF scoring criteria.
export const SCORING_CRITERIA = [
  { key: 'technical', label: 'Technical content' },
  { key: 'power', label: 'Power' },
  { key: 'balance', label: 'Balance' },
  { key: 'rhythm', label: 'Rhythm' },
  { key: 'breathing', label: 'Breathing' },
]
