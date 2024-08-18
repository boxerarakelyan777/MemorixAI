import React from "react";
import { useMediaQuery, Box, Drawer, useTheme, IconButton } from "@mui/material";
import Logo from "../shared/logo/Logo";
import SidebarItems from "./SidebarItems";
import { Upgrade } from "./Updrade";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

interface ItemType {
  isMobileSidebarOpen: boolean;
  onSidebarClose: (event: React.MouseEvent<HTMLElement>) => void;
  isSidebarOpen: boolean;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  toggleMobileSidebar: (event: React.MouseEvent<HTMLElement>) => void;
}

const Sidebar = ({
  isMobileSidebarOpen,
  onSidebarClose,
  isSidebarOpen,
  isDarkMode,
  toggleDarkMode,
  toggleMobileSidebar,
}: ItemType) => {
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));

  const sidebarWidth = "270px";

  const sidebarContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Logo */}
      <Box px={3}>
        <Logo />
      </Box>
      
      {/* Sidebar Items */}
      <Box sx={{ flexGrow: 1 }}>
        <SidebarItems toggleMobileSidebar={toggleMobileSidebar} />
      </Box>
      
      {/* Upgrade Component */}
      <Upgrade />
      
      {/* Dark Mode Toggle */}
      <Box sx={{ p: 2 }}>
        <IconButton onClick={toggleDarkMode} color="inherit">
          {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>
    </Box>
  );

  if (lgUp) {
    return (
      <Box
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
        }}
      >
        <Drawer
          anchor="left"
          open={isSidebarOpen}
          variant="permanent"
          PaperProps={{
            sx: {
              width: sidebarWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {sidebarContent}
        </Drawer>
      </Box>
    );
  }

  return (
    <Drawer
      anchor="left"
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      variant="temporary"
      PaperProps={{
        sx: {
          width: sidebarWidth,
          boxShadow: (theme) => theme.shadows[8],
        },
      }}
    >
      {sidebarContent}
    </Drawer>
  );
};

export default Sidebar;