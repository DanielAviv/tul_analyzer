// ITF tul (pattern) catalog. Movement counts per ITF Encyclopedia.
// `belt` describes the rank's belt color: a base color, an optional stripe,
// and for dan ranks an optional `dan` count + `tick` color for gold tick marks.
// `meaning` is a brief historical description of the tul's namesake.
const DAN_BASE = '#212121'
const DAN_TICK = '#FFC107'
const dan = (n) => ({ base: DAN_BASE, tick: DAN_TICK, dan: n, label: `Black (${n} dan)` })

const BELTS = {
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

export const TULS = [
  {
    id: 'saju-jirugi', name: 'Saju Jirugi', rank: '10th Gup', movements: 7, belt: BELTS['10gup'],
    meaning: 'Four-direction punch — a foundational training exercise that builds the basic punching technique in four cardinal directions.',
  },
  {
    id: 'saju-makgi', name: 'Saju Makgi', rank: '10th Gup', movements: 8, belt: BELTS['10gup'],
    meaning: 'Four-direction block — a foundational training exercise that drills the low outer forearm block in four cardinal directions.',
  },
  {
    id: 'chon-ji', name: 'Chon-Ji', rank: '9th Gup', movements: 19, belt: BELTS['9gup'],
    meaning: 'Literally "Heaven and Earth." In the Orient it is the beginning of the world or the creation of the world; hence it is the initial tul learned by beginning students.',
  },
  {
    id: 'dan-gun', name: 'Dan-Gun', rank: '8th Gup', movements: 21, belt: BELTS['8gup'],
    meaning: 'Named after the holy Dan-Gun, the legendary founder of Korea in 2333 BC.',
  },
  {
    id: 'do-san', name: 'Do-San', rank: '7th Gup', movements: 24, belt: BELTS['7gup'],
    meaning: 'The pseudonym of patriot Ahn Chang-Ho (1876–1938), who devoted his entire life to furthering the education of Korea and its independence movement.',
  },
  {
    id: 'won-hyo', name: 'Won-Hyo', rank: '6th Gup', movements: 28, belt: BELTS['6gup'],
    meaning: 'Named after the noted monk Won-Hyo, who introduced Buddhism to the Silla Dynasty in 686 AD.',
  },
  {
    id: 'yul-gok', name: 'Yul-Gok', rank: '5th Gup', movements: 38, belt: BELTS['5gup'],
    meaning: 'The pseudonym of the great philosopher and scholar Yi I (1536–1584), often called the "Confucius of Korea." The 38 movements refer to his birthplace on the 38th parallel.',
  },
  {
    id: 'joong-gun', name: 'Joong-Gun', rank: '4th Gup', movements: 32, belt: BELTS['4gup'],
    meaning: 'Named after the patriot Ahn Joong-Gun, who assassinated Hiro-Bumi Ito — the first Japanese Governor-General of Korea — at Harbin Station on October 26, 1909.',
  },
  {
    id: 'toi-gye', name: 'Toi-Gye', rank: '3rd Gup', movements: 37, belt: BELTS['3gup'],
    meaning: 'The pen name of the scholar Yi Hwang (1501–1572), a noted authority on Neo-Confucianism. The 37 movements refer to his birthplace on the 37th parallel.',
  },
  {
    id: 'hwa-rang', name: 'Hwa-Rang', rank: '2nd Gup', movements: 29, belt: BELTS['2gup'],
    meaning: 'Named after the Hwa-Rang youth warrior group, which originated in the Silla Dynasty in the 7th century AD. This group was the driving force behind the unification of Korea.',
  },
  {
    id: 'choong-moo', name: 'Choong-Moo', rank: '1st Gup', movements: 30, belt: BELTS['1gup'],
    meaning: 'The posthumous title given to Admiral Yi Soon-Sin (1545–1598), who was reputed to have invented the first armoured battleship (Kobukson) in 1592.',
  },
  {
    id: 'kwang-gae', name: 'Kwang-Gae', rank: '1st Dan', movements: 39, belt: BELTS['1dan'],
    meaning: 'Named after the famous Kwang-Gae-Toh-Wang, the 19th King of the Koguryo Dynasty (391–412 AD), who recovered all the lost territories including the greater part of Manchuria.',
  },
  {
    id: 'po-eun', name: 'Po-Eun', rank: '1st Dan', movements: 36, belt: BELTS['1dan'],
    meaning: 'The pseudonym of a loyal subject, Chong Mong-Chu (1400 AD), who was a pioneer of Korean physics and is best known for his poem "I would be loyal to my king even after death."',
  },
  {
    id: 'ge-baek', name: 'Ge-Baek', rank: '1st Dan', movements: 44, belt: BELTS['1dan'],
    meaning: 'Named after Ge-Baek, a great general of the Baek Je Dynasty (660 AD), known for his severe and strict military discipline.',
  },
  {
    id: 'eui-am', name: 'Eui-Am', rank: '2nd Dan', movements: 45, belt: BELTS['2dan'],
    meaning: 'The pseudonym of Son Byong Hi, leader of the Korean independence movement on March 1st, 1919. The 45 movements reflect his age when he changed the name of Dong Hak to Chondo Kyo.',
  },
  {
    id: 'choong-jang', name: 'Choong-Jang', rank: '2nd Dan', movements: 52, belt: BELTS['2dan'],
    meaning: 'The posthumous title of General Kim Duk Ryang who lived in the Yi Dynasty (14th century). He died at 27 — the 52 movements symbolize the last two figures of the year 1392.',
  },
  {
    id: 'juche', name: 'Juche', rank: '2nd Dan', movements: 45, belt: BELTS['2dan'],
    meaning: 'A philosophical idea that man is the master of everything and decides his own destiny. It is based on the belief that man\'s destiny is determined by himself, not by supernatural forces.',
  },
  {
    id: 'sam-il', name: 'Sam-Il', rank: '3rd Dan', movements: 33, belt: BELTS['3dan'],
    meaning: 'Denotes the historic March 1st Movement of 1919, when Koreans stood against Japanese occupation and declared their independence. The 33 movements represent the 33 patriots who signed the Declaration of Independence.',
  },
  {
    id: 'yoo-sin', name: 'Yoo-Sin', rank: '3rd Dan', movements: 68, belt: BELTS['3dan'],
    meaning: 'Named after General Kim Yoo Sin (595–673 AD), a commanding general during the Silla Dynasty whose military brilliance led to the unification of the three kingdoms of Korea.',
  },
  {
    id: 'choi-yong', name: 'Choi-Yong', rank: '3rd Dan', movements: 46, belt: BELTS['3dan'],
    meaning: 'Named after General Choi Yong (1316–1388 AD), Premier and Commander-in-Chief of the Armed Forces of the Koryo Dynasty, who was greatly respected and loved by the people for his loyalty, patriotism, and humility.',
  },
  {
    id: 'yon-gae', name: 'Yon-Gae', rank: '4th Dan', movements: 49, belt: BELTS['4dan'],
    meaning: 'Named after a famous general of Koguryo, Yon Gae Somun (618 AD), who repelled the Tang Chinese invasions. The 49 movements refer to the last two digits of the year 649 AD.',
  },
  {
    id: 'ul-ji', name: 'Ul-Ji', rank: '4th Dan', movements: 42, belt: BELTS['4dan'],
    meaning: 'Named after General Ul-Ji Moon Dok, who brilliantly defeated the Sui Chinese invasion of Korea in 612 AD. The 42 movements represent his age when he executed the famous Sal-Su River retreat strategy.',
  },
  {
    id: 'moon-moo', name: 'Moon-Moo', rank: '4th Dan', movements: 61, belt: BELTS['4dan'],
    meaning: 'Named after the 30th King of the Silla Dynasty (661–681 AD), who completed the unification of the three kingdoms of Korea. The 61 movements symbolize the last two figures of the year 661 AD.',
  },
  {
    id: 'so-san', name: 'So-San', rank: '5th Dan', movements: 72, belt: BELTS['5dan'],
    meaning: 'The pseudonym of the great monk Choi Hyong Ung (1520–1604 AD), who organized and led warrior monks against the Japanese invasion of Korea. The 72 movements refer to his age when he recruited an army of 73,000 followers.',
  },
  {
    id: 'se-jong', name: 'Se-Jong', rank: '5th Dan', movements: 24, belt: BELTS['5dan'],
    meaning: 'Named after the greatest Korean King, Se-Jong the Great (1397–1450 AD), who invented Hangul, the Korean phonetic alphabet, in 1443. The 24 movements represent the 24 letters of the Hangul alphabet.',
  },
  {
    id: 'tong-il', name: 'Tong-Il', rank: '6th Dan', movements: 56, belt: BELTS['6dan'],
    meaning: 'Denotes the unification of Korea, which has been the ultimate wish of all Koreans since the country was divided in 1945. The 56 movements symbolize the Korean people\'s unyielding desire to reunite.',
  },
]

// Standard ITF scoring criteria.
export const SCORING_CRITERIA = [
  { key: 'technical', label: 'Technical content' },
  { key: 'power', label: 'Power' },
  { key: 'balance', label: 'Balance' },
  { key: 'rhythm', label: 'Rhythm' },
  { key: 'breathing', label: 'Breathing' },
]
