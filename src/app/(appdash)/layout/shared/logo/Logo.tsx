import Link from "next/link";
import { styled } from "@mui/material";
import Image from "next/image";
import React from "react";

const LinkStyled = styled(Link)(() => ({
  height: "100px",
  width: "240px",
  overflow: "hidden",
  display: "block",
}));

const Logo = () => {
  return (
    <LinkStyled href="/">
      <Image src="/favicon.png" alt="logo" height={100} width={100} priority />
    </LinkStyled>
  );
};

export default Logo;
