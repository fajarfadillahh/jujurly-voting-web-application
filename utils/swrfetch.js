import Cookies from "js-cookie";
import fetcher from "./fetcher";

async function swrfetch(url) {
  try {
    const token = Cookies.get("token");
    const { data } = await fetcher(url, "GET", null, token);
    return data;
  } catch (error) {
    return error;
  }
}

export default swrfetch;
