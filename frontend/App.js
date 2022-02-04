import React from "react";
import {
  NativeBaseProvider,
  extendTheme,

} from "native-base";
import Login from "./components/Login";
import StripeConsent from "./components/payment/stripe-consent";
import Signup from "./components/Signup";

import Routes from './components/Routes'

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });

export default function App() {
  return (
      <NativeBaseProvider>
        <Routes/>
      </NativeBaseProvider>
  );
}


