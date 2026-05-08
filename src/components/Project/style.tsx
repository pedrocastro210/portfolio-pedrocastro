import { styled } from "@/styles/stitches.config";
import { Flex } from "@/styles/Global";
import { Text } from "@/styles/Text";

export const ProjectStack = styled(Flex, {
  margin: "1.25rem 0 1.25rem 0",
  "@mobileLittle": {
    flexDirection: "column",
    alignItems: "self-start",
  },
});

export const ProjectStackTech = styled("span", {
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  color: "$grey2",
  padding: "0.2rem 0.6rem",
  borderRadius: "$2",
  border: "1px solid rgba(255, 255, 255, 0.1)",
});

export const ProjectLinks = styled(Flex, {
  marginTop: "2.25rem",
});

export const ProjectLink = styled("a", {
  fontSize: "1rem",
  color: "$grey2",
  fontWeight: "500",
  marginRight: "$2",
  display: "flex",
  alignItems: "center",
  lineHeight: "0",
  transition: "color 0.2s ease",

  "&:hover": {
    color: "$grey5",
  },

  [`& svg`]: {
    marginRight: "$1",
  },
});

export const ProjectTitle = styled(Text, {
  transition: "color 0.2s ease",
});

export const Project = styled("article", {
  marginTop: "0", // Handled by grid gap in ProjectsAreaContent
  padding: "2.5rem",
  borderRadius: "1.5rem",
  background: "rgba(255, 255, 255, 0.03)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.05)",
  transition: "all 0.3s ease-in-out",
  position: "relative",
  overflow: "hidden",

  "&:hover": {
    background: "rgba(255, 255, 255, 0.06)",
    transform: "translateY(-8px)",
    borderColor: "rgba(255, 255, 255, 0.1)",
    boxShadow: "0 20px 40px -20px rgba(0, 0, 0, 0.5)",

    [`& ${ProjectTitle}`]: {
      color: "$brand1",
    }
  },

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "4px",
    background: "linear-gradient(90deg, transparent, $brand1, transparent)",
    transform: "translateX(-100%)",
    transition: "transform 0.5s ease",
  },

  "&:hover::before": {
    transform: "translateX(100%)",
  },

  [`&:first-child`]: {
    [`& ${ProjectTitle}:first-child`]: {
      position: "relative",
      "@mobile": {
        width: "auto",
      },

      "&::after": { // Changed from before to after to not clash with title
        content: '"New"',
        position: "absolute",
        top: "-5px",
        right: "0",
        width: "max-content",
        height: "22px",
        backgroundColor: "$brand1",
        padding: "0px 8px",
        borderRadius: "4px",
        fontSize: "12px",
        color: "white",
        fontWeight: "600",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Inter",

        "@mobile": {
          right: "-1rem",
        },
      },
    },
  },
});
