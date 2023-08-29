import axios from "axios";

async function fetcher(url, method, data = null, token = null) {
  const defaultObject = {
    url: `http://103.150.191.205/api/v1${url}`,
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
