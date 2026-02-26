import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Discuss } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import "../App.css";

function AIText() {
  const Backend = import.meta.env.VITE_REACT_APP_BackEnd;
  const [loader, setLoader] = useState(false);
  const [result, setResult] = useState("");
  const [message, setMessage] = useState("");
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");

  const output_Box = document.getElementById("output-Box-Head");

  useEffect(() => {
    if (index < result.length) {
      const char = result[index];
      const timeOut = setTimeout(() => {
        setText((prev) => {
          if (char === ".") {
            return prev + ".\n";
          }
          return prev + char;
        });
        setIndex(index + 1);
      }, 50);
      return () => clearTimeout(timeOut);
    }
  }, [index, result]);

  function Call() {
    setLoader(false);
  }
  async function Find() {
    setLoader(true);

    setResult("");
    event.preventDefault();
    console.log(message);
    try {
      // let data = await fetch("http://localhost:5004/AI",{
      let data = await fetch(`${Backend}/AI`, {
        method: "POST",
        body: JSON.stringify({ message }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setLoader(false);
      output_Box.style.display = "block";
      data = await data.json();
      //  console.log(data);
      const response = data.response.candidates[0].content.parts[0].text;
      //  console.log(data.response.candidates[0].content.parts[0].text);
      setResult(response);
    } catch (err) {
      console.log(err);
      setResult("Some Problem, Please try after some time !");
    }
  }

  window.addEventListener("keyup", () => {
    if (event.keyCode == 13) {
      Find();
    }
  });

  return (
    <>
      <div id="AIText">
        <h2>Please Ask a Question</h2>
        <div id="input-Box">
          <form onSubmit={Find}>
            <input
              type="text"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              placeholder="Enter a question....."
            />
            <button type="submit">Ask</button>
          </form>
        </div>

        <div id="Loader">
          <Discuss
            visible={loader}
            height="50"
            width="50"
            ariaLabel="discuss-loading"
            wrapperStyle={{}}
            wrapperClass="discuss-wrapper"
            color="#fff"
            backgroundColor="#F4442E"
          />
        </div>

        <div id="output-Box-Head">
          <div className="output-Box">
            <h3>Your OutPut </h3>
            {/* <p>{text}</p> */}
           <p><ReactMarkdown>{text}</ReactMarkdown></p> 
            {/* <form onSubmit={Find}>
           <input type="text"  onChange={(e)=>{setMessage(e.target.value)}}/>
           <button type="submit">Ask</button>
       </form> */}
          </div>
        </div>
      </div>
    </>
  );
}
export default AIText;
