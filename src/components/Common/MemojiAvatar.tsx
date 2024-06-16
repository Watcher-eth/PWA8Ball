// @ts-nocheck

import Image from "next/image";
import randomColor from "randomcolor";
import TigerImage from "../../../public/images/Memojis/Tiger.png";
import LionImage from "../../../public/images/Memojis/Lion.png";
import GhostImage from "../../../public/images/Memojis/Ghost.png";
import DinoImage from "../../../public/images/Memojis/Dino.png";
import KoalaImage from "../../../public/images/Memojis/Koala.png";
import BearImage from "../../../public/images/Memojis/Bear.png";
const images = [
  TigerImage,
  LionImage,
  GhostImage,
  DinoImage,
  KoalaImage,
  BearImage,
];

function getRandomImage() {
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
}

function getRandomPastelColor() {
  return randomColor({
    luminosity: "light",
    format: "rgba",
    alpha: 0.7, // You can adjust the alpha value for transparency
    notSeed: true, // To get a different color on each call
    hue: "random",
    notBaseColor: ["black", "white", "gray", "brown"], // Avoid unwanted colors
  });
}

function RandomMemoji({ width, height, pfp, rounded }) {
  const randomImage = getRandomImage();
  const circleColor = getRandomPastelColor();

  const circleStyle = {
    width: `${width}rem`,
    height: `${height}rem`,
    borderRadius: rounded === false ? "20%" : "50%",
    backgroundColor: circleColor,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const pfpStyle = {
    width: `100vw`,
    height: `100vw`,
    backgroundColor: circleColor,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <div style={pfp === true ? pfpStyle : circleStyle}>
      <div
        className="relative "
        style={{ width: `${width * 0.89}rem`, height: `${height * 0.89}rem` }}
      >
        <Image src={randomImage} alt={randomImage} fill={true} />
      </div>
    </div>
  );
}

export default RandomMemoji;
