export const product = {
  name: 'NIKE AIR MAX',
  modelPath: '',
  credits: '/images/CREDITS.txt',
  colorways: [
    { id: 'graphite', name: 'GRAPHITE', accent: '#c6ff00', filter: 'grayscale(.9) brightness(.78) contrast(1.15)' },
    { id: 'silver', name: 'ARCTIC', accent: '#9edcff', filter: 'grayscale(.95) brightness(1.08) contrast(1.05)' },
    { id: 'volt', name: 'VOLT', accent: '#99ff17', filter: 'hue-rotate(72deg) saturate(.7) brightness(.82) contrast(1.15)' },
  ],
  angles: ['SIDE', 'THREE—QUARTER', 'TOP', 'HEEL'],
  details: [
    { number: '01', title: 'SILHOUETTE', copy: 'A sharp profile, shaped for forward motion.' },
    { number: '02', title: 'UPPER', copy: 'Layered forms meet a considered, tactile finish.' },
    { number: '03', title: 'STITCHING', copy: 'Precision lines bring structure into focus.' },
    { number: '04', title: 'LACING', copy: 'A clean, secure fit with room to make it yours.' },
    { number: '05', title: 'SOLE', copy: 'A sculpted foundation with a confident stride.' },
    { number: '06', title: 'HEEL', copy: 'A grounded finish with a distinct point of view.' },
  ],
  layers: [
    { id: 'outsole', title: 'OUTSOLE', copy: 'Grounded grip, made for changing direction.' },
    { id: 'midsole', title: 'MIDSOLE', copy: 'A responsive foundation under every move.' },
    { id: 'insole', title: 'INSOLE', copy: 'Soft support that moves with you.' },
    { id: 'upper', title: 'UPPER', copy: 'A sculpted shell of form and function.' },
    { id: 'tongue', title: 'TONGUE', copy: 'A considered layer, built around comfort.' },
    { id: 'laces', title: 'LACES', copy: 'A precise finish. A fit that feels personal.' },
  ],
  features: [
    { number: '01', title: 'COMFORT', copy: 'Made to feel right from the first step to the last.' },
    { number: '02', title: 'CUSHIONING', copy: 'A considered landing, with energy to move on.' },
    { number: '03', title: 'FLEXIBILITY', copy: 'Freedom to follow wherever the moment leads.' },
    { number: '04', title: 'GRIP', copy: 'Confident contact across your everyday terrain.' },
    { number: '05', title: 'LIGHTWEIGHT', copy: 'Nothing extra between you and what’s next.' },
  ],
};
