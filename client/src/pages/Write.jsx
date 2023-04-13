import React, { useContext, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { AuthContext } from "../context/authContext";
import { axiosInstance } from "../config";

const Write = () => {


  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const state = useLocation().state;
  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  const upload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "blogsapp");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dwr3xxgpz/image/upload",
        formData
      );
      const { url } = res.data;
      return url;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload(file);

    try {
      state
        ? await axiosInstance.put(
            `posts/${state.id}`,
            {
              title,
              desc: value,
              cat,
              img: file ? imgUrl : "",
            },
          )
        : await axiosInstance.post(
            `posts/`,
            {
              title,
              desc: value,
              cat,
              img: file ? imgUrl : "",
              date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
          );
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {!currentUser ? (
        "You must Login or Register!!"
      ) : (
        <div className="add">
          <div className="content">
            <input
              type="text"
              value={title}
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="editorContainer">
              <ReactQuill
                className="editor"
                theme="snow"
                value={value}
                onChange={setValue}
              />
            </div>
          </div>
          <div className="menu">
            <div className="item">
              <h1>Publish</h1>
              <span>
                <b>Status: </b> Draft
              </span>
              <span>
                <b>Visibility: </b> Public
              </span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                name="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <label className="file" htmlFor="file">
                Upload Image
              </label>
              <div className="buttons">
                <button>Save as a draft</button>
                <button onClick={handleClick}>Publish</button>
              </div>
            </div>
            <div className="item">
              <h1>Category</h1>
              <div className="cat">
                <input
                  type="radio"
                  checked={cat === "art"}
                  name="cat"
                  value="art"
                  id="art"
                  onChange={(e) => setCat(e.target.value)}
                />
                <label htmlFor="art">Art</label>
              </div>
              <div className="cat">
                <input
                  type="radio"
                  checked={cat === "science"}
                  name="cat"
                  value="science"
                  id="science"
                  onChange={(e) => setCat(e.target.value)}
                />
                <label htmlFor="science">Science</label>
              </div>
              <div className="cat">
                <input
                  type="radio"
                  checked={cat === "technology"}
                  name="cat"
                  value="technology"
                  id="technology"
                  onChange={(e) => setCat(e.target.value)}
                />
                <label htmlFor="technology">Technology</label>
              </div>
              <div className="cat">
                <input
                  type="radio"
                  checked={cat === "cinema"}
                  name="cat"
                  value="cinema"
                  id="cinema"
                  onChange={(e) => setCat(e.target.value)}
                />
                <label htmlFor="cinema">Cinema</label>
              </div>
              <div className="cat">
                <input
                  type="radio"
                  checked={cat === "design"}
                  name="cat"
                  value="design"
                  id="design"
                  onChange={(e) => setCat(e.target.value)}
                />
                <label htmlFor="design">Design</label>
              </div>
              <div className="cat">
                <input
                  type="radio"
                  checked={cat === "food"}
                  name="cat"
                  value="food"
                  id="food"
                />
                <label htmlFor="food">Food</label>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Write;
