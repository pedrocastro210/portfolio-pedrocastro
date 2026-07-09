import {
  Project as ProjectWrapper,
  ProjectTitle,
  ProjectNewBadge,
  ProjectStack,
  ProjectStackTech,
  ProjectLink,
  ProjectLinks,
} from "./style";

import { Text } from "@/styles/Text";
import { useEffect, useState } from "react";
import { FaGithub, FaShare } from "react-icons/fa";
import { userData } from "@/utils/userData";
import { motion } from "framer-motion";
import { languageData } from "@/utils/languageData";

interface ReposType {
  id: number;
  name: string;
  created_at: string;
  language: string;
  description: string;
  html_url: string;
  homepage: string;
  topics: string[];
}

const NEW_TAG_DAYS = 90;

const isRecentlyUpdated = (created_at: string): boolean => {
  const createdDate = new Date(created_at);
  const daysSinceUpdate =
    (Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24);

  return daysSinceUpdate <= NEW_TAG_DAYS;
};

export const Project = (): JSX.Element => {
  const [repositories, setRepositories] = useState<ReposType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `https://api.github.com/users/${userData.githubUser}/repos?sort=created&direction=desc`
      );

      const json = await data.json();

      setRepositories(json);

      return json;
    };

    fetchData();
  }, []);

  return (
    <>
      {repositories &&
        repositories?.map?.((repository, index) => (
          <motion.div
            key={repository.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            style={{ display: "flex", width: "100%" }}
          >
            <ProjectWrapper style={{ width: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <ProjectTitle
                as="h2"
                type="heading3"
                css={{
                  marginBottom: "$1",
                  position: "relative",
                  "@mobile": { width: "auto" },
                }}
                color="grey4"
              >
                {repository.name}
                {isRecentlyUpdated(repository.created_at) && (
                  <ProjectNewBadge>New</ProjectNewBadge>
                )}
              </ProjectTitle>

              <ProjectStack>
                <Text type="body2" color="grey2">
                  Primary Language:
                </Text>
                {repository.language ? (
                  <ProjectStackTech>
                    <Text color="grey2" type="body2">
                      {repository.language}
                    </Text>
                  </ProjectStackTech>
                ) : (
                  <ProjectStackTech>
                    <Text color="grey2" type="body2">
                      Primary language not identified
                    </Text>
                  </ProjectStackTech>
                )}
              </ProjectStack>

              <Text type="body1" color="grey2">
                {repository.description}
              </Text>
              <ProjectLinks>
                <ProjectLink target="_blank" href={repository.html_url}  style={{ width: '100%' }}>
                  <FaGithub /> Github Code
                </ProjectLink>
                {repository.homepage && (
                  <ProjectLink
                    target="_blank"
                    href={repository.homepage}
                    style={{ width: '100%' }}
                  >
                    <FaShare /> See demo
                  </ProjectLink>
                )}
                <motion.div 
                  key={repository.id}
                  style={{ display: "flex", width: "100%", justifyContent: 'end',gap: '12px' }}
                >
                  {repository.topics.map((topic) => {
                    const Icon = languageData.find(
                      (item) => item.title === topic.toLowerCase()
                    )?.img;

                    return Icon ? (
                      <span key={topic} style={{ textAlign: 'end'}}>
                        <Icon size={28} color="#868E96" />
                      </span>
                    ) : null;
                  })}
                </motion.div>
              </ProjectLinks>
            </ProjectWrapper>
          </motion.div>
        ))}
    </>
  );
};
