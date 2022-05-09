import axios from "axios";

const AXIOS_METHODS = {
  get: "get",
  post: "post",
  put: "put",
  patch: "patch",
  delete: "delete",
};

export const apiRequest = async (config) => {
  let method = AXIOS_METHODS.get;
  if (config.method) {
    method = config.method.toLowerCase();
    if (!AXIOS_METHODS[method]) {
      console.error("Axios method not found:", method);
    }
  }
  const url = `${process.env.VUE_APP_API_HOST}${process.env.VUE_APP_API_PATH}${config.path}`;
  const data = config.data;
  let res;
  try {
    switch (method) {
      case "post":
        res = await axios.post(url, data);
        break;
      case "put":
        res = await axios.put(url, data);
        break;
      case "patch":
        res = await axios.put(url, data);
        break;
      case "delete":
        res = await axios.delete(url, data);
        break;
      default:
        res = await axios.get(url, { params: data });
    }
  } catch (e) {
    console.error("Axios error:", e);
    // TODO Need to add right toast call from here
    // this.$toast.error(Lang.UNKNOWN_ERROR);
  }
  return res.data;
};
