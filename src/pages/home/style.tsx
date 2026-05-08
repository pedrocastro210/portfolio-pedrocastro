import { styled, keyframes } from "@/styles/stitches.config";
import { Flex } from "@/styles/Global";
import { Button } from "@/styles/Buttons";
import { css } from "@stitches/react";

import meIlustration from "@/public/static/img/background/me-ilustration.svg";
import backgroundImg from "@/public/static/img/background/header-bg.svg";

import dots from "@/public/static/img/background/dots.svg";

const float = keyframes({
  "0%": {
    transform: "translateY(0px)",
  },
  "50%": {
    transform: "translateY(-20px)",
  },
  "100%": {
    transform: "translateY(0px)",
  },
});

const scroll = keyframes({
  "0%": {
    transform: "translateX(0)",
  },
  "100%": {
    transform: "translateX(-50%)",
  },
});

export const Header = styled("header", {
  backgroundColor: "$grey1",
  padding: "10rem 0 8rem 0",
  // backgroundImage: `url(${backgroundImg})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right",
  backgroundAttachment: "fixed",
  borderBottom: "2px solid $grey5",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  "@tablet": {
    backgroundPosition: "right -10% center",
  },
  "@mobile": {
    padding: "9rem 0 6rem 0",
    backgroundImage: `none`,
  },
  "@mobileLittle": {
    padding: "7rem 0 4rem 0",
  },
});

export const HeaderContent = styled("div", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "4rem",
  width: "100%",
  "@mobile": {
    flexDirection: "column-reverse", // Photo on top for better mobile hierarchy
    textAlign: "center",
    gap: "2rem",
  },
});

export const HeaderText = styled("div", {
  maxWidth: "100%",
  width: "45rem",
  display: "flex",
  flexDirection: "column",
  gap: "$2",
  "@mobile": {
    width: "100%",
    alignItems: "center",
  },
});

export const HeaderImageArea = styled("div", {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  width: "100%",
  "&::before": {
    content: "",
    position: "absolute",
    width: "120%",
    height: "120%",
    //background: "radial-gradient(circle, $brand1 0%, transparent 70%)",
    opacity: 0.15,
    filter: "blur(40px)",
    zIndex: 0,
  },
  "@mobile": {
    marginTop: "0",
    marginBottom: "2rem",
  },
});

export const UserImageHero = styled("img", {
  width: "30rem",
  height: "30rem",
  objectFit: "cover",
  borderRadius: "2rem",
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
  // border: "2px solid $grey5",
  zIndex: 1,
  transition: "transform 0.4s ease-out, box-shadow 0.4s ease-out",
  // animation: `${float} 6s ease-in-out infinite`,
  "&:hover": {
    transform: "translateY(-10px) scale(1.02)",
    boxShadow: "0 35px 60px -15px $brand1",
    animationPlayState: "paused",
  },
  "@tablet": {
    width: "22rem",
    height: "22rem",
  },
  "@mobile": {
    height: "18rem",
    borderRadius: "1.5rem",
  },
  "@mobileLittle": {
    height: "14rem",
  },
});

export const HeaderButtonsArea = styled(Flex, {
  marginTop: "$2",

  [`& ${Button}`]: {
    marginRight: "$2",
    overflow: "hidden",
  },

  "@mobile": {
    [`& ${Button}`]: {
      marginRight: "0",
      overflow: "hidden",
      width: "100%",
    },
    width: "100%",
    maxWidth: "300px", // Constrain button width on mobile
    display: "flex",
    flexDirection: "column",
    gap: "$1",
    marginBottom: "$2",
  },
});

export const UserImage = styled("img", {
  borderRadius: "50%",
  "@mobile": {
    width: "2.25rem",
    height: "2.25rem",
  },
});

export const StackSection = styled("div", {
  backgroundColor: "$grey4",
  padding: "4rem 0 2rem 0",
});

export const StackCards = styled("div", {
  width: "100%",
  maxWidth: "100vw",
  overflow: "hidden",
  padding: "5rem 0 2rem 0",
  marginTop: "0",
  position: "relative",
  display: "flex",
  alignItems: "center",
  maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
  WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
  "@mobile": {
    width: "calc(100% + 2rem)",
    margin: "0 -1rem", // Pull out to touch screen edges
  },
});

export const StackCardsContent = styled("div", {
  display: "flex",
  gap: "4rem",
  width: "max-content",
  animation: `${scroll} 30s linear infinite`,
  willChange: "transform",
  "&:hover": {
    animationPlayState: "paused",
  },
  "@mobile": {
    gap: "2rem", // Reduce gap on mobile to see more items
  },
});

export const ProjectsArea = styled("section", {
  position: "relative",
  padding: "$section 0",
  backgroundColor: "$grey0",
  backgroundImage: `url(${dots})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "left top 11rem",
  overflow: "hidden",
  minHeight: "100vh",
  width: "100%",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  "@tablet": {
    backgroundPosition: "right top 8rem",
    padding: "$sectionMobile 0",
  },
});

export const ProjectsAreaSocialMediaMessage = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "2rem",

  "@mobile": {
    width: "100%",
    position: "static",
    order: "2",
    marginTop: "5rem",
  },
});

export const ProjectsAreaContent = styled("div", {
  width: "100%",
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridGap: "4rem",
  "@mobile": {
    gridTemplateColumns: "1fr",
    overflow: "hidden",
  },
});

export const ProjectAreaWrapperColumns = styled("div", {
  position: "relative",
  alignItems: "flex-start",
  "@mobile": {
    flexDirection: "column",
  },
});
