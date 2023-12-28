import { Outlet, ScrollRestoration } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import useDebugRender from "tilg";
import { AppProvider } from "./AppContext";
import ControlPanel from "./components/ControlPanel";

export default function App() {
  useDebugRender();

  return (
    <AppProvider>
      <ChakraProvider>
        <Outlet />
        <ScrollRestoration />
        {/* <ControlPanel /> */}
      </ChakraProvider>
    </AppProvider>
  );
}
