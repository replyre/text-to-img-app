import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [imageURL, setImageURL] = useState("");
  const [text, getText] = useState("");
  const [loading, setLoading] = useState(false);
  function generateImage() {
    setLoading(true);
    axios
      .post(
        "https://api-inference.huggingface.co/models/prompthero/openjourney-v4",
        {
          inputs: text,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.React_APP_API_TOKEN}`,
          },
          responseType: "blob", // Set responseType to 'blob' to get binary data
        }
      )
      .then((response) => {
        const imageUrl = URL.createObjectURL(response.data);
        console.log(imageUrl);
        setImageURL(imageUrl);
        setLoading(false);
        getText("");
      })
      .catch((error) => {
        console.error("Error generating image:", error);
        alert(error.message);
        setLoading(false);
      });
  }
  // console.log(process.env.React_APP_API_TOKEN);
  return (
    <div className="App">
      <div>
        <h2>DreamMaker </h2>
        <p>Text to Image react application using openjourney</p>
        <input
          type="text"
          placeholder="Enter your imagination"
          value={text}
          onChange={(e) => getText(e.target.value)}
        />{" "}
        <button disabled={loading} onClick={() => generateImage()}>
          Generate
        </button>
      </div>
      {imageURL !== "" ? <img src={imageURL || " "} alt=" a image" /> : ""}
      {loading && "loading..."}
    </div>
  );
}

export default App;
