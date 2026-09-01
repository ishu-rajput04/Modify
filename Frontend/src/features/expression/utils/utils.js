import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export async function start({ faceLandmarkerRef, videoRef }) {
    // -------------------------
    // 1. Load MediaPipe
    // -------------------------

    const vision = await FilesetResolver.forVisionTasks(
        "/node_modules/@mediapipe/tasks-vision/wasm",
    );

    const landmarker = await FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
            modelAssetPath:
                "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",

            delegate: "GPU",
        },

        runningMode: "VIDEO",

        numFaces: 1,

        outputFaceBlendshapes: true,

        minFaceDetectionConfidence: 0.5,
        minFacePresenceConfidence: 0.5,
        minTrackingConfidence: 0.5,
    });

    faceLandmarkerRef.current = landmarker;

    // -------------------------
    // 2. Start Webcam
    // -------------------------

    const stream = await navigator.mediaDevices.getUserMedia({
        video: {
            // width: 640,
            // height: 480,
        },
    });

    videoRef.current.srcObject = stream;
    videoRef.current.onloadeddata = () => {
        detect();
    };
}

export function detect({ faceLandmarkerRef, videoRef, setExpression, setScores }) {
    const video = videoRef.current;
    const landmarker = faceLandmarkerRef.current;

    // if (!video || !landmarker) {
    //   animationRef.current = requestAnimationFrame(detect);

    //   return;
    // }

    // -------------------------
    // 3. Detect face
    // -------------------------

    const result = landmarker.detectForVideo(video, performance.now());

    if (result.faceBlendshapes && result.faceBlendshapes.length > 0) {
        const categories = result.faceBlendshapes[0].categories;

        // Convert array → object
        const blendshapes = {};

        categories.forEach((item) => {
            blendshapes[item.categoryName] = item.score;
        });

        setScores(blendshapes);

        // -------------------------
        // 4. Detect Expression
        // -------------------------

        const detected = detectExpression(blendshapes);

        setExpression(detected);
    } else {
        setExpression("👤 No Face");
    }
}

// =================================
// Expression Detection
// =================================

export function detectExpression(b) {
    const smile = ((b.mouthSmileLeft || 0) + (b.mouthSmileRight || 0)) / 2;

    const jawOpen = b.jawOpen || 0;

    const browDown = ((b.browDownLeft || 0) + (b.browDownRight || 0)) / 2;

    const browUp =
        ((b.browInnerUp || 0) +
            (b.browOuterUpLeft || 0) +
            (b.browOuterUpRight || 0)) /
        3;

    const mouthFrown = ((b.mouthFrownLeft || 0) + (b.mouthFrownRight || 0)) / 2;
    console.log(mouthFrown, browUp);

    if (smile > 0.45) {
        return "😀 Happy";
    }
    if (jawOpen > 0.45 && browUp > 0.035) {
        return "😮 Surprised";
    }
    if (browDown > 0.45) {
        return "😠 Angry";
    }
    if (mouthFrown > 0.0055 && browUp < 0.06) {
        return "😢 Sad";
    }
    return "😐 Neutral";
}