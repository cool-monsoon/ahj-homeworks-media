import geolocationValidation from '../geolocationValidation';

test.each([
  ['true', '51.50851, −0.12572', '51.50851, −0.12572'],
  ['true', '51.50851,−0.12572', '51.50851, −0.12572'],
  ['true', '[51.50851, −0.12572]', '51.50851, −0.12572'],
  ['true', '151.50678851,−0125987.6672', false],
])(('%s'), (_, location, expected) => {
  const received = geolocationValidation(location);
  expect(received).toBe(expected);
});
