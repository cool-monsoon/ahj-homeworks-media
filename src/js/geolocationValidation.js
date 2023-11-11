export default function geolocationValidation(input) {
  let location = input;
  const locationRegEx = /^[-—–−-]?[0-9]{1,2}\.[0-9]+, [-—–−-]?[0-9]{1,2}\.[0-9]+/;
  if (location.includes('[') && location.includes(']')) {
    location = location.slice(location.indexOf('[') + 1, location.indexOf(']'));
  }
  if (location.includes(' ')) {
    if (locationRegEx.test(location)) {
      return location;
    }
    return false;
  }

  const latitude = location.slice(0, location.indexOf(','));
  const longitude = location.slice(location.indexOf(',') + 1);
  location = `${latitude}, ${longitude}`;

  if (locationRegEx.test(location)) {
    return location;
  }
  return false;
}
