import { Container, Divider, Box, styled } from "@mui/material";
import Head from "next/head";
import useTranslation from '../../utility/useTranslation';
import { LayoutStrings } from './layoutStrings';
import Header from "./header/header";
import Nav from "./nav/nav";
import { useRef, useState, useEffect } from "react";

interface LayoutProps {
  children: React.ReactNode,
  title: string, // set string in LayoutStrings.ts and call it on the page
  searchTitle: string, // set string in LayoutStrings.ts and call it on the page
  searchFunction: () => void,
  buttonTitle: JSX.Element | string, // set string in LayoutStrings.ts and call it on the page
  buttonHref: string,
}

const StyledBox = styled(Box)`
  display: flex;
`

const NavBox = styled(Box)`
  width: 100%;
  max-width: 270px;
  padding: 48px 16px;
`

const StyledMain = styled("main")`
  padding: 74px 0;
  width: 100%;
`


export default function Layout({ children, title, searchTitle, searchFunction, buttonTitle, buttonHref }: LayoutProps) {
  const { t }= useTranslation(LayoutStrings);

  const headerRef = useRef<HTMLDivElement>(null);

  const [height, setHeight] = useState(96);

  useEffect(() => {
    if(typeof headerRef !== "undefined" && headerRef.current) setHeight(headerRef.current.clientHeight);
  }, [headerRef])

  return (
    <>
      <Head>
        <title>{t(title)}</title>
      </Head>
      <div ref={headerRef}>
        <Header searchTitle={searchTitle} searchFunction={searchFunction} buttonTitle={buttonTitle} buttonHref={buttonHref} />
        <Divider sx={{ borderBottomWidth: "2px" }} />
      </div>
      <StyledBox sx={{ minHeight: "calc(100vh - "+height+"px)" }}>
        <NavBox>
          <Nav />
        </NavBox>
        <Divider orientation="vertical" flexItem sx={{ borderRightWidth: "2px" }} />
        <StyledMain>
          <Container disableGutters maxWidth={false}>
              {children}
          </Container>
        </StyledMain>
      </StyledBox>
    </>
  );
}