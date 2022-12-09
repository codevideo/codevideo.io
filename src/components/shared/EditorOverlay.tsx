import React, { useState, useEffect } from "react";
import { IEditorOverlaySlide } from "../../interfaces/IEditorOverlaySlide";

export const EditorOverlay: React.FC<{ isActive: boolean, slides: IEditorOverlaySlide[] }> = ({ isActive, slides }) => {
  // Use the useState hook to manage the current slide index
  // and the show property of each slide
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideShow, setSlideShow] = useState(
    slides.map((slide) => ({ ...slide, show: false }))
  );

  // Use the useEffect hook to automatically advance to the next slide
  // after a specified interval
  useEffect(() => {
    // Show the current slide, hide all others
    setSlideShow(
      slideShow.map((slide, index) => ({
        ...slide,
        show: index === currentIndex,
      }))
    );

    const interval = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % slides.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isActive]);

  // Get the current slide
  const currentSlide = slides[currentIndex];

  if (!isActive) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        transition: "opacity 0.5s ease-in-out",
        opacity: currentSlide.show ? 1 : 0,
      }}
    >
      <p className="fs-1">{currentSlide.emoji}</p>
      <p>{currentSlide.message}</p>
    </div>
  );
};