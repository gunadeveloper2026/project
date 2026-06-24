"use client";

import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

export default function CameraFeed() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadModels();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
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

      console.log("✅ Models Loaded");

      await startCamera();

      setLoading(false);
    } catch (error) {
      console.error("❌ Model Loading Error:", error);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
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
      console.error("❌ Camera Error:", error);
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

    faceapi.matchDimensions(canvas, displaySize);

    intervalRef.current = setInterval(async () => {
      const detections = await faceapi
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

      const resizedDetections = faceapi.resizeResults(
        detections,
        displaySize
      );

      const ctx = canvas.getContext("2d");

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      faceapi.draw.drawDetections(
        canvas,
        resizedDetections
      );

      faceapi.draw.drawFaceLandmarks(
        canvas,
        resizedDetections
      );

      faceapi.draw.drawFaceExpressions(
        canvas,
        resizedDetections
      );

      resizedDetections.forEach((detection) => {
        const { age, gender } = detection;

        const textField = new faceapi.draw.DrawTextField(
          [
            `Age: ${Math.round(age)}`,
            `Gender: ${gender}`,
          ],
          detection.detection.box.topRight
        );

        textField.draw(canvas);
      });
    }, 100);
  };

  return (
    <div className="flex justify-center items-center p-6">
      <div className="relative">

        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 text-white rounded-lg">
            Loading Models...
          </div>
        )}

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