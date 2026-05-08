import { useState } from "react";
import useMedia from "use-media";
import { userData } from "@/utils/userData";

import {
  Navbar as NavbarWrapper,
  LogoTipo,
  LogoTipoText,
  NavbarLinks,
  NavbarMobileArea,
} from "./style";
import "./styles.css"

import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Button } from "@/styles/Buttons";
import { Container, Flex } from "@/styles/Global";
import { motion } from "framer-motion";

export interface MenuButtonOpen {
  open: Boolean;
  setOpen: (value: Boolean) => void;
}

export const NavBar = (): JSX.Element => {

  const isWide = useMedia({ maxWidth: "991px" });

  document.title = userData.nameUser;

  const [open, setOpen] = useState(false);

  const OpenMenu = () => {
    setOpen(!open);
  };

  return (
    <NavbarWrapper>
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ width: "100%" }}
      >
        <Container>
          <NavbarMobileArea>
            <LogoTipo>
              <LogoTipoText>{userData.nameUser}</LogoTipoText>
            </LogoTipo>
            {isWide && (
              <Button
                type="icon"
                onClick={OpenMenu}
                aria-label={!open ? "Abrir Menu" : "Fechar Menu"}
              >
                {!open ? <FaBars /> : <IoClose />}
              </Button>
            )}
          </NavbarMobileArea>
          <Flex>
            {isWide ? open && <NavLinks /> : <NavLinks />}
          </Flex>
        </Container>
      </motion.div>
    </NavbarWrapper>
  );
};

export const NavLinks = (): JSX.Element => {
  return (
    <NavbarLinks>
      <a className="btn" href={`#home`}>
        Home
      </a>
      <a className="btn" href={`#projects`}>
        Projects
      </a>
      <a className="btn" href={`#contact`}>
        Contact
      </a>
      <a className="btn" href={`#social-media`}>
        Social Media
      </a>
    </NavbarLinks>
  );
};
