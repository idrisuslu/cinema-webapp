import React, { useState } from "react";

//Config File
import configData from "config.json";

//Stylesheet
import styles from "./slider.module.css";

function Slider({ allImages, handleShow }) {
  const [currentIndex, setCurrentIndex] = useState(allImages[0]);

  function goToPrevious() {
    const isFirstSlide = currentIndex === allImages[0];
    const getIndex = allImages.indexOf(currentIndex);
    const newIndex = isFirstSlide ? allImages.length - 1 : getIndex - 1;
    setCurrentIndex(allImages[newIndex]);
  }

  function goToNext() {
    const isLastSlide = currentIndex === allImages[allImages.length - 1];
    const getIndex = allImages.indexOf(currentIndex);
    const newIndex = isLastSlide ? 0 : getIndex + 1;
    setCurrentIndex(allImages[newIndex]);
  }

  return (
    <>
      <div className={styles.carouselSlide}>
        <div className={styles.btnContainer}>
          <button id={styles.prevBtn} onClick={goToPrevious}>
            {"<"}
          </button>
        </div>

        <div className={styles.btnContainer}>
          <button id={styles.nextBtn} onClick={goToNext}>
            {">"}
          </button>
        </div>

        {allImages.map((image, key) => {
          return (
            <img
              onClick={() => handleShow("backdrop", currentIndex)}
              key={key}
              className={styles.slider}
              src={`${configData.backdropImageUrlw1280}${currentIndex}`}
              alt=""
            ></img>
          );
        })}
      </div>
    </>
  );
}

export default Slider;
