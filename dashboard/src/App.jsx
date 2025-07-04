import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import AddNewDoctor from "./pages/AddNewDoctor";
import AddNewAdmin from "./pages/AddNewAdmin";
import Doctor from "./pages/Doctor";
import Message from "./pages/Message";
import SideBar from "./pages/SideBar";
import { Context } from "./main";
import "./App.css";
import Login from "./pages/Login";
import ProtectedRoute from "./Component/ProtectedRoute";
import UserProfile from "./Component/userprofile/UserProfile";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import api from "./utils/axios";

/*============================Chakra UI============================*/
export const theme = extendTheme({
  colors: {
    brand: {
      blue: "#4164e3",
      cadet: "#8998a8",
      dark: "#243156",
      gray: "#a0acb9",
      green: "#36c537",
      light: "#e9ebee",
      pure: "#fafafb",
      slate: "#77889a",
      white: "#fcfdfe",
      yellow: "#ed9b13",
    },
  },
  components: {
    Button: {
      variants: {
        solid: {
          p: "6",
          color: "white",
          bg: "brand.blue",
          _hover: { bg: "brand.blue" },
          _active: { bg: "brand.blue" },
          _focus: { boxShadow: "none" },
        },
        outline: {
          bg: "transparent",
          borderWidth: "1px",
          color: "brand.cadet",
          borderColor: "brand.light",
          _hover: { bg: "brand.white" },
          _active: { bg: "brand.light" },
          _focus: { boxShadow: "none" },
        },
        ghost: {
          color: "white",
          bg: "rgba(0, 0, 0, 0.25)",
          _hover: { bg: "rgba(0, 0, 0, 0.25)" },
          _active: { bg: "rgba(0, 0, 0, 0.35)" },
          _focus: { boxShadow: "none" },
        },
        link: {
          p: "0",
          height: "full",
          bg: "transparent",
          color: "gray.500",
          rounded: "none",
          _active: { bg: "brand.light" },
          _focus: { boxShadow: "none" },
        },
      },
    },
    Tabs: {
      baseStyle: {
        tab: {
          _focus: {
            boxShadow: "none",
          },
        },
      },
    },
  },
});
/*======================================*/

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/admin/me", {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          withCredentials: true
        });
        
        if (response.data?.user) {
          setIsAuthenticated(true);
          setUser(response.data.user);
        } else {
          setIsAuthenticated(false);
          setUser({});
        }
      } catch (error) {
        console.error("Error fetching admin user:", error);
        setIsAuthenticated(false);
        setUser({});
      }
    };

    // Only fetch user if not already authenticated
    if (!isAuthenticated) {
      fetchUser();
    }
  }, []); // Remove isAuthenticated from dependencies to prevent infinite loop

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/admin/addNewDoctor" element={<AddNewDoctor />} />
          <Route path="/admin/addNewAdmin" element={<AddNewAdmin />} />
          <Route path="/admin/doctor" element={<Doctor />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/admin/message" element={<Message />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
