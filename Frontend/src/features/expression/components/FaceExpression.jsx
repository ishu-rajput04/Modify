import { useEffect, useRef, useState } from "react";
import { start, detect,detectExpression} from "../utils/utils";
import "../style/faceExpression.scss";

function FaceExpression() {
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

  return (
    <main>
      <div className="wrapper">
        <h1>Face Expression Detector</h1>

        <video ref={videoRef} autoPlay playsInline muted />

        <h2>{expression}</h2>
        <button
          onClick={() => {
            detect({ faceLandmarkerRef, videoRef,setExpression,setScores });
          }}
          className="detect"
        >
          Detect Expression
        </button>
      </div>
    </main>
  );
}

export default FaceExpression;
