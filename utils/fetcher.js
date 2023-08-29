import axios from "axios";

async function fetcher(url, method, data = null, token = null) {
  const defaultObject = {
    url: `https://wildanlab.tech/api/v1${url}`,
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

  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

  return axios(config);
}

export default fetcher;
