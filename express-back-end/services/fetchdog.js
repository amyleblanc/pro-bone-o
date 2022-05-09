//calls the dog image api and returns a random dog image
async function getDogUrl() {
  const response = await fetch("https://dog.ceo/api/breeds/image/random");
  const message = await response.json();
  const url = message["message"];
  return url;
}

async function getSpecificDog(breed) {
  const fetchURL = "https://dog.ceo/api/breed/" + breed + "/images/random";
  const response = await fetch(fetchURL);
  const message = await response.json();
  const url = message["message"];
  return url;
}

module.exports = { getDogUrl, getSpecificDog };
