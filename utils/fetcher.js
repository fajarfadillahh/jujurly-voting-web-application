import axios from "axios";

async function fetcher(url, method, data = null, token = null) {
  const defaultObject = {
    url: `https://jujurly.cyclic.app/api/v1${url}`,
    method,
  };

  const config = {};

  if (data) {
    Object.assign(config, defaultObject, { data });
  }

  if (token) {
    Object.assign(config, defaultObject, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return axios(config);
}

export default fetcher;
