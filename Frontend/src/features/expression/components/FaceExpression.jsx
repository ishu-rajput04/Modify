import { useEffect, useRef, useState } from "react";
import { start, detect, detectExpression } from "../utils/utils";
import "../style/faceExpression.scss";

function FaceExpression({ onClick = () => {} }) {
  const videoRef = useRef(null);
  const faceLandmarkerRef = useRef(null);
  const animationRef = useRef(null);

  const [expression, setExpression] = useState("Loading...");
  const [scores, setScores] = useState({});

  useEffect(() => {
    start({ faceLandmarkerRef, videoRef });

    return () => {
      cancelAnimationFrame(animationRef.current);

      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  async function handleClick() {
    const mood = detect({
      faceLandmarkerRef,
      videoRef,
      setExpression,
      setScores,
    });

    onClick(mood);
  }

  return (
    <section className="expression-panel" aria-labelledby="expression-title">
      <div className="wrapper">
        <div className="expression-panel__heading">
          <p className="expression-panel__eyebrow">Live camera scan</p>
          <h2 id="expression-title">What are you feeling?</h2>
        </div>

        <video ref={videoRef} autoPlay playsInline muted />

        <div className="expression-panel__result">
          <span>Detected mood</span>
          <strong>{expression}</strong>
        </div>
        <button onClick={handleClick} className="detect">
          Detect Expression
        </button>
      </div>
    </section>
  );
}

export default FaceExpression;
