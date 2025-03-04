import React, { useState, useEffect } from "react";
import { IEditorOverlaySlide } from "../../interfaces/IEditorOverlaySlide";
import { Flex, Text } from "@radix-ui/themes";

export const EditorOverlay: React.FC<{
  isActive: boolean;
  slides: IEditorOverlaySlide[];
}> = ({ isActive, slides }) => {
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
    }, 7500);
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
            key={index}
            style={{
              zIndex: 10000000,
              position: "absolute",
              top: 0,
              bottom: 0,
              width: "100%",
              // set horizontal margin using transform so it is always centered
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              opacity: index === currentIndex % slides.length ? 1 : 0,
            }}
          >
            <Flex direction="column" justify="center" align="center" p="5">
              <Text align="center">Generating video (takes a while since everything is done directly here in the browser)...</Text>
              <Text align="center" className="display-4 rotate-infinite">{slide.emoji}</Text>
              <Text align="center">{slide.message}</Text>
            </Flex>
          </div>
        );
      })}
    </>
  );
};
