import axios from "axios";
const qs = require("qs");

export const UploadService = {
  upload,
  uploadFile,
  verifyDoc,
  post_material,
  add_tag,
  link_tags,
};

async function link_tags(data) {
  const token = await JSON.parse(localStorage.getItem("token"));
  var config = {
    baseURL: "http://localhost:3001/api/tags",
    headers: {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "https://pawacyberschool.net",
      "Access-Control-Allow-Credentials": true,
    },
  };
  try {
    let res = await axios.post(`/link`, data, config);
    return res.data;
  } catch (err) {
    console.error(err);
    return err;
  }
}

async function post_material(data) {
  const token = await JSON.parse(localStorage.getItem("token"));
  var config = {
    baseURL: "http://localhost:3001/api/teacher",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "https://pawacyberschool.net",
      "Access-Control-Allow-Credentials": true,
    },
  };
  try {
    let res = await axios.post(`/new_material`, qs.stringify(data), config);
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function upload(data) {
  const token = await JSON.parse(localStorage.getItem("token"));
  try {
    let res = await axios.post(
      `http://localhost:3001/api/upload/new`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(res);
    return res.data;
  } catch (err) {
    console.error(err);
    return err;
  }
}

async function verifyDoc(data) {
  const token = await JSON.parse(localStorage.getItem("token"));
  try {
    let res = await axios.put(
      `http://localhost:3001/api/verifydoc`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "https://pawacyberschool.net",
          "Access-Control-Allow-Credentials": true,
        },
      }
    );
    return res.data;
  } catch (err) {
    return err;
  }
}
async function uploadFile(data) {
  const token = await JSON.parse(localStorage.getItem("token"));

  try {
    
    let res = await axios.put(
      `http://localhost:3001/api/uploadfile`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "https://pawacyberschool.net",
          "Access-Control-Allow-Credentials": true,
        },
      }
    );
    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err)
    return err;
  }
}

async function add_tag(data) {
  const token = await JSON.parse(localStorage.getItem("token"));
  var config = {
    baseURL: "http://localhost:3001/api/tags",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "https://pawacyberschool.net",
      "Access-Control-Allow-Credentials": true,
    },
  };
  try {
    let res = await axios.post(`/new`, qs.stringify(data), config);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}
