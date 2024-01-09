import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FujiLogo from "../../../../public/Fuji.png";
import WH from "../../../../public/Icons/warehouse.png";
import LQ from "../../../../public/Icons/qql.png";
import PS from "../../../../public/Icons/status.png";
import UP from "../../../../public/Icons/ulproduct.png";
import PageTitle from "./Title/Title";
import Navbuttton from "./Button/Navbuttton";
import { NavLink, useLocation } from "react-router-dom";
import ToggleDarkmode from "../toggleDarkMode/toggleDarkMode";
import Box from "@mui/material/Box";

// import Pages from "./Pages/Page-2/main/page";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

// สร้าง mixin สำหรับสไตล์ของ Drawer เมื่อถูกปิด
const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer({ isDarkMode }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const location = useLocation();
  const [activeButton, setActiveButton] = React.useState(null);
  //sidebar items
  const sidebarItems = [
    { name: "NPI Product Status", link: "/npi-product-status", icon: PS },
    { name: "Machine Information", link: "/smart-information", icon: WH },
    { name: "Machine LQ Qualify", link: "/machine-lq-qualify", icon: LQ },
    { name: "UL Product", link: "/ul-product", icon: UP },
    // Add more sidebar items as needed
  ];

  //handle button click
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    // const formattedButtonName = buttonName.replace(/ /g, "_");
    // router.push(`/${formattedButtonName}`);
  };

  React.useEffect(() => {
    const getPageTitle = () => {
      switch (location.pathname) {
        case "/":
          return "NPI Product Status";
        case "/npi-product-status":
          return "NPI Product Status";
        case "/smart-information":
          return "Machine Information";
        case "/machine-lq-qualify":
          return "Machine LQ Qualify";
        // case "/Smart-Factory-Dept":
        //   return "/Smart-Factory-Dept";
        case "/ul-product":
          return "UL Product";
        default:
          return "";
      }
    };
    const title = getPageTitle();
    setActiveButton(title);
  }, [location.pathname]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          backgroundColor: isDarkMode ? "#121212" : "#42a5f5",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <PageTitle />
          <Box sx={{ flexGrow: 1 }} />
          <ToggleDarkmode />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: isDarkMode ? "#898989" : "#fafafa",
          },
        }}
      >
        <DrawerHeader>
          <img
            src={FujiLogo}
            alt="คำอธิบายภาพ"
            style={{
              width: 180,
              height: 45,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              objectFit: "contain",
            }}
          />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Navbuttton
          open={open}
          sidebarItems={sidebarItems}
          handleButtonClick={handleButtonClick}
          activeButton={activeButton}
          isDarkMode={isDarkMode}
        />
        <Divider />
      </Drawer>
    </>
  );
}
