import { extendTheme } from "@chakra-ui/react";

import { buttonStyles } from "./components/button";
import { colors } from "./foundations/colors";


const theme = extendTheme({
  colors,

  components: {
    Button: buttonStyles,
  },
});

export default theme;
