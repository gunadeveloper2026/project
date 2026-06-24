"use client";

import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

export default function CameraFeed() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const detectionRef = useRef(null);
  const idCardRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [warning, setWarning] = useState("");
  const [faceCount, setFaceCount] = useState(0);

  useEffect(() => {
    loadModels();

    return () => {
      if (detectionRef.current) {
        clearInterval(detectionRef.current);
      }

      if (idCardRef.current) {
        clearInterval(idCardRef.current);
      }

      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, []);

  const loadModels = async () => {
    try {
      const MODEL_URL = "/models";

      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68TinyNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
      ]);

      await startCamera();

      setLoading(false);

      console.log("Models Loaded");
    } catch (error) {
      console.error(error);
    }
  };

  const startCamera = async () => {
    try {
      const stream =
        await navigator.mediaDevices.getUserMedia({
          video: {
            width: 1280,
            height: 720,
            facingMode: "user",
          },
          audio: false,
        });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const checkIdCard = async () => {
    try {
      if (!videoRef.current) return;

      const tempCanvas =
        document.createElement("canvas");

      tempCanvas.width =
        videoRef.current.videoWidth;

      tempCanvas.height =
        videoRef.current.videoHeight;

      const ctx =
        tempCanvas.getContext("2d");

      ctx.drawImage(
        videoRef.current,
        0,
        0,
        tempCanvas.width,
        tempCanvas.height
      );

      const blob = await new Promise(
        (resolve) =>
          tempCanvas.toBlob(
            resolve,
            "image/jpeg"
          )
      );

      const formData = new FormData();

      formData.append(
        "file",
        blob,
        "frame.jpg"
      );

      const response = await fetch(
        "http://localhost:8000/api/detect-id-card",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.idCardDetected) {
        setWarning("");
      } else {
        setWarning(
          "⚠ Please Wear Your ID Card"
        );
      }
    } catch (error) {
      console.log(
        "Backend not available"
      );
    }
  };

  const handleVideoPlay = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const displaySize = {
      width: video.videoWidth,
      height: video.videoHeight,
    };

    canvas.width = displaySize.width;
    canvas.height = displaySize.height;

    faceapi.matchDimensions(
      canvas,
      displaySize
    );

    detectionRef.current =
      setInterval(async () => {
        const detections =
          await faceapi
            .detectAllFaces(
              video,
              new faceapi.TinyFaceDetectorOptions({
                inputSize: 416,
                scoreThreshold: 0.5,
              })
            )
            .withFaceLandmarks(true)
            .withFaceExpressions()
            .withAgeAndGender();

        setFaceCount(
          detections.length
        );

        const resized =
          faceapi.resizeResults(
            detections,
            displaySize
          );

        const ctx =
          canvas.getContext("2d");

        ctx.clearRect(
          0,
          0,
          canvas.width,
          canvas.height
        );

        faceapi.draw.drawDetections(
          canvas,
          resized
        );

        faceapi.draw.drawFaceLandmarks(
          canvas,
          resized
        );

        resized.forEach(
          (detection) => {
            const { age, gender } =
              detection;

            new faceapi.draw.DrawTextField(
              [
                `Age: ${Math.round(
                  age
                )}`,
                `Gender: ${gender}`,
              ],
              detection.detection.box
                .topRight
            ).draw(canvas);
          }
        );
      }, 100);

    idCardRef.current =
      setInterval(() => {
        checkIdCard();
      }, 5000);
  };

  return (
    <div className="flex justify-center p-6">
      <div className="relative">

        {loading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 text-white">
            Loading Models...
          </div>
        )}

        {warning && (
          <div className="absolute top-4 left-4 z-50 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg animate-pulse">
            {warning}
          </div>
        )}

        <div className="absolute top-4 right-4 z-50 bg-green-600 text-white px-4 py-2 rounded-lg">
          Faces: {faceCount}
        </div>

        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          onPlay={handleVideoPlay}
          className="rounded-lg border shadow-lg"
          style={{
            width: "900px",
            height: "650px",
            objectFit: "cover",
          }}
        />

        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0"
          style={{
            width: "900px",
            height: "650px",
          }}
        />
      </div>
    </div>
  );
}