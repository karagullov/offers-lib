import {
  FlattenSimpleInterpolation,
  ThemedCssFunction,
} from "styled-components/macro";

export type Color = string;
export interface Colors {
  darkMode: boolean;

  // base
  white: Color;
  black: Color;

  // text
  text1: Color;
  text1_inverse: Color;
  text2: Color;
  text3: Color;
  text4: Color;
  text5: Color;
  textContra1: Color;
  textContra2: Color;
  textContra3: Color;

  // backgrounds / greys
  bg0: Color;
  bg1: Color;
  bg2: Color;
  bg3: Color;
  bg4: Color;
  bg5: Color;
  bg6: Color;
  bgLighter: Color;
  bgDark: Color;
  bgDarker: Color;
  border: Color;
  modalBG: Color;
  advancedBG: Color;

  //blues
  primary0: Color;
  primary1: Color;
  primary1Reverse: Color;
  primary2: Color;
  primary3: Color;
  primary4: Color;
  primary5: Color;

  primaryText1: Color;
  link1: Color;

  // pinks
  secondary1: Color;
  secondary2: Color;
  secondary3: Color;

  // other
  red1: Color;
  red2: Color;
  red3: Color;
  green1: Color;
  yellow1: Color;
  yellow2: Color;
  yellow3: Color;
  blue1: Color;
  blue2: Color;

  blue4: Color;

  error: Color;
  success: Color;
  inProgress: Color;
  warning: Color;

  // shapes
  largeRadius: string;
  smallRadius: string;
}

declare module "styled-components/macro" {
  export interface DefaultTheme extends Colors {
    grids: Grids;

    // shadows
    shadow1: string;

    // media queries
    mediaWidth: {
      upToExtraSmall: ThemedCssFunction<DefaultTheme>;
      upToSmall: ThemedCssFunction<DefaultTheme>;
      upToMedium: ThemedCssFunction<DefaultTheme>;
      upToLarge: ThemedCssFunction<DefaultTheme>;
    };

    // css snippets
    flexColumnNoWrap: FlattenSimpleInterpolation;
    flexRowNoWrap: FlattenSimpleInterpolation;
  }
}
