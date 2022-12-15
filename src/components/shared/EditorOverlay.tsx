import React, { useState, useEffect } from "react";
import { IEditorOverlaySlide } from "../../interfaces/IEditorOverlaySlide";

export const EditorOverlay: React.FC<{
  isActive: boolean;
  slides: IEditorOverlaySlide[];
  editorWidth: number;
}> = ({ isActive, slides, editorWidth }) => {
  // Use the useState hook to manage the current slide index
  // and the show property of each slide
  const [currentIndex, setCurrentIndex] = useState(0);

  // Use the useEffect hook to automatically advance to the next slide
  // after a specified interval
  useEffect(() => {
    if (!isActive) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex(currentIndex + 1);
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [currentIndex, isActive]);

  if (!isActive) return null;

  return (
    <>
      {slides.map((slide, index) => {
        return (
          <div
            style={{
              position: "absolute",
              top: 42,
              
              bottom: 0,
              width: editorWidth,
              // set horzontal margin using transform so it is always centered
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              transition: "opacity 0.5s ease-in-out",
              opacity: index === currentIndex % slides.length ? 1 : 0,
            }}
          >
            <div className="col-8">
            <p className="text-light">Generating your video...</p>
              <p className="display-4 infinite-rotate">{slide.emoji}</p>
              <p className="text-light">{slide.message}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};
