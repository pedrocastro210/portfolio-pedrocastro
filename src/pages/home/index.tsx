// Styles
import { Container, Flex } from "@/styles/Global";
import { Text } from "@/styles/Text";
import { Button } from "@/styles/Buttons";

// Components
import { Stack } from "@/components/Stack";
import { Project } from "@/components/Project";
import { Contacts } from "@/components/Contacts";

// Data
import { stackData } from "@/utils/stackData";
import { userData } from "@/utils/userData";

import { FaGithub } from "react-icons/fa";

import {
  Header,
  HeaderContent,
  HeaderText,
  HeaderButtonsArea,
  HeaderImageArea,
  UserImageHero,
  UserImage,
  StackCards,
  StackCardsContent,
  ProjectsArea,
  ProjectsAreaSocialMediaMessage,
  ProjectAreaWrapperColumns,
  ProjectsAreaContent,
} from "./style";
import Particles from "@/components/Particles";
import { motion } from "framer-motion";
import pedroBanner from "@/public/static/img/logo/pedro_banner.png";

export const Home = (): JSX.Element => {
  const gihubUrl = `https://github.com/${userData.githubUser}`;
  const portfolioUrl = `https://github.com/${userData.githubUser}/my-portfolio`;

  return (
    <main id="home">
      <Header>
        <Container>
          <HeaderContent>
            <HeaderText>
              <Flex>
                {/* <UserImage
                  src={`https://github.com/${userData.githubUser}.png`}
                  alt={userData.nameUser}
                  title={userData.nameUser}
                  width={"48px"}
                  height={"48px"}
                /> */}
                <Text
                  color="grey4"
                  css={{
                    fontFamily: "Caveat, cursive",
                    fontSize: "1.5rem",
                  }}
                >
                  Hello, my name is {userData.nameUser}
                </Text>
              </Flex>
              <Text as="h1" type="heading1" color="grey5">
                I{" "}
                <Text as="span" type="heading1" color="brand1">
                  love
                </Text>{" "}
                creating and{" "}
                <Text as="span" type="heading1" color="brand1">
                  developing
                </Text>{" "}
                projects
              </Text>
              <Text type="body1" color="grey2" css={{ fontFamily: "Quicksand, sans-serif" }}>
                Discover here in this environment, created especially for you, all
                my projects and technologies
              </Text>
              <HeaderButtonsArea>
                <Button as="a" type="primary" href="#projects">
                  See Projects
                </Button>
                <Button as="a" type="outline" target="_blank" href={portfolioUrl}>
                  See my portfolio source code
                </Button>
                <Button
                  color="grey5"
                  as="a"
                  css={{ "&:hover": { color: "$grey1" } }}
                  type="circle"
                  target="_blank"
                  href={gihubUrl}
                >
                  <FaGithub />
                </Button>
              </HeaderButtonsArea>
              <StackCards>
                <StackCardsContent>
                  {stackData.map((stack, index) => (
                    <Stack key={index} title={stack.title} icon={stack.img} />
                  ))}
                  {/* Duplicated items for seamless loop */}
                  {stackData.map((stack, index) => (
                    <Stack key={stackData.length + index} title={stack.title} icon={stack.img} />
                  ))}
                </StackCardsContent>
              </StackCards>
            </HeaderText>

            <HeaderImageArea>
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <UserImageHero
                  src={pedroBanner}
                  alt={userData.nameUser}
                  title={userData.nameUser}
                />
              </motion.div>
            </HeaderImageArea>
          </HeaderContent>
        </Container>
      </Header>
      <ProjectsArea id="projects">
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={800}
          particleSpread={8}
          speed={0.1}
          particleBaseSize={80}
          moveParticlesOnHover={false}
          alphaParticles={false}
          disableRotation={false}
        />
        <Container style={{ position: 'relative', zIndex: 2, width: '100%' }}>
          <ProjectAreaWrapperColumns>
            <ProjectsAreaSocialMediaMessage>
              <Text as="h2" type="heading4" color="grey4">
                My projects
              </Text>
              <Text as="p" type="body1" color="grey2">
                Some of my{" "}
                <Text as="span" color="brand5">
                  side projects
                </Text>
              </Text>
            </ProjectsAreaSocialMediaMessage>
            <ProjectsAreaContent>
              <Project />
            </ProjectsAreaContent>
          </ProjectAreaWrapperColumns>
        </Container>

      </ProjectsArea>

      <Contacts />
    </main>
  );
};
