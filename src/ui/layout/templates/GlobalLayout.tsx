"use client";

import { NavItem } from "@/types";
import GlobalAppBar from "@/ui/layout/molecules/GlobalAppBar";
import GlobalSideNavOnMobile from "@/ui/layout/molecules/GlobalSideNavOnMobile";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { ReactNode, useState } from "react";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children?: ReactNode;
}

const drawerWidth = 240;
const navItems: NavItem[] = [
  { title: "Home", pathname: "/" },
  { title: "About", pathname: "/about" },
  { title: "Logs", pathname: "/logs" },
];

export default function GlobalLayout({ window, children }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <GlobalAppBar handleDrawerToggle={handleDrawerToggle} navItems={navItems} />
      <GlobalSideNavOnMobile
        container={container}
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
        mobileOpen={mobileOpen}
        navItems={navItems}
      />
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
