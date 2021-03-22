import React, { useState, useEffect, useRef } from "react";
import myFace from "./images/myface/myface.jpg";
import "./App.css";

const App = () => {
  const importAllFaceImgs = r => {
    let images = [];
    r.keys().map(item => {
      images.push(r(item));
    });
    return images;
  };

  const faceImgs = importAllFaceImgs(
    require.context("./images/myface", false, /\.(png|jpe?g|svg)$/)
  );
  const colors = ["#24d05a", "#eb4888", "#10a2f5", "#e9bc3f"];

  // image component that will update w random image URL
  const RotatingPhoto = () => {
    const firstImageURL = myFace; // always set this headshot first
    const [imageURL, setImageURL] = useState(firstImageURL);

    useInterval(() => {
      let newImageURL = getRandomImageURL(faceImgs);
      setImageURL(newImageURL);
    }, 3000);

    return <img src={imageURL} alt="Jess Anastasio" />;
  };

  // given array of images, choose random index
  const getRandomImageURL = faceImgs => {
    return faceImgs[Math.floor(Math.random() * faceImgs.length)];
  };

  const getRandomColor = colors => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const Links = () => {
    const [linkColor, setLinkColor] = useState(colors[0]);

    useInterval(() => {
      let newLinkColor = getRandomColor(colors);
      setLinkColor(newLinkColor);
    }, 3000);

    let linkStyle = { color: linkColor };

    return (
      <nav className="links">
        <ol>
          <li>
            <a style={linkStyle} href="http://twitter.com/jessanastasio">
                twitter
            </a>
          </li>
          <li>
            <a style={linkStyle} href="http://linkedin.com/in/jessicaanastasio">
              linkedin
            </a>
          </li>
          <li>
            <a style={linkStyle} href="http://github.com/jessanastasio">
              github
            </a>
          </li>
          <li>
           <a style={linkStyle} href="mailto:jessicaanastasio39@gmail.com">
             email
           </a>
          </li>  
        </ol>
      </nav>
    );
  };

  const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    // Remember the latest function.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  };

  return (
    <div className="App">
      <header className="header">
        <div className="img-container">
          <RotatingPhoto />
        </div>
        <div className="about-me">
          <h2>Jess Anastasio</h2>
          <ol>
            <li>
              <span className="about-emoji" role="img" aria-label="liberty">
                🗽
              </span>{" "}
              software engineer in nyc
            </li>
            <li>
              <span className="about-emoji" role="img" aria-label="heart">
                💕
              </span>{" "}
              loves javascript
            </li>
            <li>
              <span className="about-emoji" role="img" aria-label="disk">
                💾
              </span>{" "}
              huge tech nerd
            </li>
            <li>
              <span className="about-emoji" role="img" aria-label="mic">
                🎤
              </span>{" "}
              karaoke fan
            </li>
          </ol>
        </div>
      </header>

      <Links />

      <article className="more">
        <div className="blurb">
          Hi, I’m Jess! I'm a software engineer working on{" "}
          <a href="https://news.apple.com">Apple News</a>. Previously, I was a software engineer at <a href="https://buzzfeed.com">BuzzFeed</a>.
        </div>
        <div>
          My goal as an engineer is to show craftsmanship, courtesy and empathy
          in my work and interactions with others.
        </div>
      </article>

      <div className="fun-facts">
        <h3>fun facts:</h3>
        <ol>
          <li>
            <span role="img" aria-label="star">
              👩🏼‍🔧
            </span>{" "}
            I used to work in the computer department at Best Buy and built my
            own computers
          </li>
          <li>
            <span role="img" aria-label="star">
              ⚡️
            </span>{" "}
            I spoke at{" "}
            <a
              className="amp"
              href="https://www.youtube.com/watch?v=HsCq5XIprXY&feature=youtu.be&t=224"
            >
              Google's AMP Conf 2018
            </a>{" "}
            and contributed to AMP open source spec
          </li>
          <li>
            <span role="img" aria-label="star">
              🔥
            </span>{" "}
            I have a great love for{" "}
            <a className="twitter" href="https://twitter.com/jessanastasio/likes">
              javascript memes
            </a>{" "}
            (actually all memes)
          </li>
          <li>
            <span role="img" aria-label="star">
              ☕️
            </span>{" "}
            You can probably find me skateboarding around the city or drinking
            coffee{" "}
          </li>
        </ol>
      </div>
    </div>
  );
};

export default App;
