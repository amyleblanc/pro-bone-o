import axios from "axios";

/**
 *
 * @param {String} url location for api request
 * @param {String} type type of api request (GET, POST, PUT, DELETE)
 * @param {Object} formData formdata object payload for action
 * @param {Function} helperFunction functino to act on data returned by api
 * @returns data from api request as object
 */
export default async function axiosRequest(
  url,
  type,
  formData,
  helperFunction
) {
  const payload = formData ? formData : null;
  const isHelper = helperFunction ? true : false;
  if (type === "POST") {
    const resp = await axios.post(url, payload);
    isHelper && helperFunction(resp.data);
    return console.log(resp.data);
  }
  if (type === "GET") {
    const resp = await axios.get(url, payload);
    isHelper && helperFunction(resp.data);
    return console.log(resp.data);
  }
  if (type === "PUT") {
    const resp = await axios.put(url, payload);
    isHelper && helperFunction(resp.data);
    return console.log(resp.data);
  }
  if (type === "DELETE") {
    const resp = await axios.delete(url, payload);
    isHelper && helperFunction(resp.data);
    return console.log(resp.data);
  }
}
