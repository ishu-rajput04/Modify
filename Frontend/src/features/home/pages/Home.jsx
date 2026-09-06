import { useState } from "react";
import FaceExpression from "../../expression/components/FaceExpression";
import Player from "../components/Player";
import "../style/home.scss";
import { useSong } from "../hooks/useSong";

const Home = () => {
  const [entered, setEntered] = useState(false);
  const { handlegetSong } = useSong();

  return (
    <main className={`home-page ${entered ? "is-entered" : ""}`}>
      <section className="landing-panel" aria-labelledby="landing-title">
        <div className="mood-signal" aria-label="Mood signal preview">
          <div className="mood-signal__topline">
            <span className="mood-signal__dot" aria-hidden="true" />
            <span>Expression signal</span>
            <span>READY</span>
          </div>
          <div className="mood-signal__wave" aria-hidden="true">
            {[38, 62, 46, 82, 56, 94, 48, 72, 40, 64, 34].map(
              (height, index) => (
                <i key={index} style={{ height: `${height}%` }} />
              ),
            )}
          </div>
          <div className="mood-signal__readout">
            <span>Current reading</span>
            <strong>Listening for your mood</strong>
          </div>
          <div className="mood-signal__stats">
            <span>
              <b>01</b> Face scan
            </span>
            <span>
              <b>02</b> Mood match
            </span>
            <span>
              <b>03</b> Song cue
            </span>
          </div>
        </div>
        <div className="landing-panel__copy">
          <p className="home-page__kicker">Mood-driven listening</p>
          <h1 id="landing-title">Find the feeling. Follow the sound.</h1>
          <p className="home-page__intro">
            Your face sets the mood. Your music follows.
          </p>
          <button
            className="slide-entry"
            type="button"
            onClick={() => setEntered(true)}
          >
            <span className="slide-entry__arrow" aria-hidden="true"></span>
            <span>Slide to enter</span>
          </button>
        </div>
      </section>

      <div className="home-page__workspace">
        <header className="home-page__header">
          <p className="home-page__kicker">Your listening room</p>
          <h2>Let your mood choose the next song.</h2>
        </header>
        <div className="home-page__content">
          {entered && (
            <FaceExpression
              onClick={(mood) => {
                handlegetSong(mood);
              }}
            />
          )}
          {entered && <Player />}
        </div>
      </div>
    </main>
  );
};

export default Home;
