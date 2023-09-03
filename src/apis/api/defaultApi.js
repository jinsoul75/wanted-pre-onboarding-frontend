import axiosInstance from "../axiosInstance";

async function makeRequest(method, url, data) {
  try {
    let res;
    switch (method) {
      case "GET":
        res = await axiosInstance.get(url);
        break;
      case "POST":
        res = axiosInstance.post(url, data)
        break;
      case "PATCH":
        res = axiosInstance.patch(url, data);
        break;
      case "DELETE":
        res = axiosInstance.delete(url);
        break;
      default:
        throw new Error("Unsupported HTTP method");
    }
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getData(url) {
  return makeRequest("GET", url);
}

export async function postData(url, data) {
  return makeRequest("POST", url, data);
}

export async function patchData(url, data) {
  return makeRequest("PATCH", url, data);
}

export async function deleteData(url) {
  return makeRequest("DELETE", url);
}
