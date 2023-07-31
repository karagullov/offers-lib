import React, { useMemo } from "react";
import { Text, TextProps as TextPropsOriginal } from "rebass";
import styled, {
  createGlobalStyle,
  css,
  DefaultTheme,
  ThemeProvider as StyledComponentsThemeProvider,
} from "styled-components";
import { Colors } from "./styled";

export * from "./components";

type TextProps = Omit<TextPropsOriginal, "css">;

export const MEDIA_WIDTHS = {
  upToExtraSmall: 500,
  upToSmall: 720,
  upToMedium: 960,
  upToLarge: 1280,
};

// Migrating to a standard z-index system https://getbootstrap.com/docs/5.0/layout/z-index/
// Please avoid using deprecated numbers
export enum Z_INDEX {
  deprecated_zero = 0,
  deprecated_content = 1,
  dropdown = 1000,
  sticky = 1020,
  fixed = 1030,
  modalBackdrop = 1040,
  offcanvas = 1050,
  modal = 1060,
  popover = 1070,
  tooltip = 1080,
}

const mediaWidthTemplates: {
  [width in keyof typeof MEDIA_WIDTHS]: typeof css;
} = Object.keys(MEDIA_WIDTHS).reduce((accumulator, size) => {
  (accumulator as any)[size] = (a: any, b: any, c: any) => css`
    @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
      ${css(a, b, c)}
    }
  `;
  return accumulator;
}, {}) as any;

const white = "#FFFFFF";
const black = "#000000";

function colors(darkMode: boolean): Colors {
  return {
    darkMode,
    // base
    white,
    black,

    // text
    text1: darkMode ? "#FFFFFF" : "#111",
    text1_inverse: !darkMode ? "#FFFFFF" : "#000000",
    text2: darkMode ? "#D1D1D1" : "#565A69",
    text3: darkMode ? "rgba(255, 255, 255, 0.5)" : "#6E727D",
    text4: darkMode ? "#B2B9D2" : "#C3C5CB",
    text5: darkMode ? "#2C2F36" : "#EDEEF2",
    textContra1: "#000000",
    textContra2: "#2F2F2F",
    textContra3: "#00000080",

    // backgrounds / greys
    bg0: darkMode ? "#111113" : "#FFF",
    bg1: darkMode ? "#202020" : "#F7F8FA",
    bg2: darkMode ? "#2C2F36" : "#EDEEF2",
    bg3: darkMode ? "#40444F" : "#CED0D9",
    bg4: darkMode ? "#565A69" : "#888D9B",
    bg5: "#bdc3d3",
    bg6: !darkMode ? "#3A3A3A" : "#FFF",
    bgLighter: "rgba(255, 255, 255, 0.3)",
    bgDarker: "rgba(0, 0, 0, 0.15)",
    bgDark: darkMode ? "#181818" : "#181818",
    border: "rgba(255,255,255,0.4)",
    //specialty colors
    modalBG: darkMode ? "rgba(49,75,80,0.8)" : "rgba(0,0,0,.825)",
    advancedBG: darkMode ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.6)",

    //primary colors
    primary0: darkMode ? "#EFFFFC" : "rgba(0,0,0,.425)",
    //primary1: darkMode ? '#2172E5' : '#000',
    primary1: darkMode ? "#a9b6b4" : "#000",
    primary1Reverse: !darkMode ? "#2172E5" : "#E8006F",
    //primary2: darkMode ? '#3680E7' : '#FF8CC3',
    primary2: darkMode ? "#767f7d" : "#FF8CC3",
    primary3: darkMode ? "#4D8FEA" : "#444",
    primary4: darkMode ? "#376bad70" : "#F6DDE8",
    primary5: darkMode ? "#153d6f70" : "#FDEAF1",

    // color text
    primaryText1: darkMode ? "#5090ea" : "#D50066",
    link1: darkMode ? "#5090ea" : "#26497b",

    // secondary colors
    secondary1: darkMode ? "rgba(255, 255, 255, 0.75)" : "#E8006F",
    secondary2: darkMode ? "#17000b26" : "#F6DDE8",
    secondary3: darkMode ? "#17000b26" : "#FDEAF1",

    // other
    red1: darkMode ? "rgba(255,67,67,0.85)" : "rgb(255,66,63)",
    red2: darkMode ? "#F82D3A" : "#DF1F38",
    red3: "#D60000",
    green1: darkMode ? "#27AE60" : "#26E722",
    yellow1: "#E3A507",
    yellow2: "#FF8F00",
    yellow3: "#F3B71E",
    blue1: darkMode ? "#2172E5" : "#0068FC",
    blue2: darkMode ? "#5199FF" : "#0068FC",
    error: "#E72222CC",
    success: "#26E722",
    inProgress: darkMode ? "#5199FF" : "#5199FF",
    warning: "#FFF61CCC",

    // dont wanna forget these blue yet
    blue4: darkMode ? "#153d6f70" : "#C4D9F8",
    // blue5: darkMode ? '#153d6f70' : '#EBF4FF',

    // shapes
    smallRadius: "5px",
    largeRadius: "8px",
  };
}

function theme(darkMode: boolean): DefaultTheme {
  return {
    ...colors(darkMode),

    grids: {
      sm: 8,
      md: 12,
      lg: 24,
    },

    //shadows
    shadow1: darkMode ? "#000" : "#2F80ED",

    // media queries
    mediaWidth: mediaWidthTemplates,

    // css snippets
    flexColumnNoWrap: css`
      display: flex;
      flex-flow: column nowrap;
    `,
    flexRowNoWrap: css`
      display: flex;
      flex-flow: row nowrap;
    `,
  };
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const darkMode = true;
  const root = document.querySelector("#root") as HTMLElement;
  if (root) root.style.colorScheme = darkMode ? "dark" : "light";

  const themeObject = useMemo(() => theme(darkMode), [darkMode]);

  return (
    <StyledComponentsThemeProvider theme={themeObject}>
      {children}
    </StyledComponentsThemeProvider>
  );
}

const TextWrapper = styled(Text)<{ color: keyof Colors }>`
  color: ${({ color, theme }) => (theme as any)[color]};
`;

/**
 * Preset styles of the Rebass Text component
 */
export const ThemedText = {
  Main(props: TextProps) {
    return <TextWrapper fontWeight={500} color={"text2"} {...props} />;
  },
  Link(props: TextProps) {
    return <TextWrapper fontWeight={500} color={"primary1"} {...props} />;
  },
  Label(props: TextProps) {
    return <TextWrapper fontWeight={600} color={"text1"} {...props} />;
  },
  Black(props: TextProps) {
    return <TextWrapper fontWeight={500} color={"text1"} {...props} />;
  },
  White(props: TextProps) {
    return <TextWrapper fontWeight={500} color={"white"} {...props} />;
  },
  Body(props: TextProps) {
    return (
      <TextWrapper fontWeight={400} fontSize={16} color={"text1"} {...props} />
    );
  },
  LargeHeader(props: TextProps) {
    return <TextWrapper fontWeight={600} fontSize={24} {...props} />;
  },
  MediumHeader(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={20} {...props} />;
  },
  SubHeader(props: TextProps) {
    return <TextWrapper fontWeight={400} fontSize={14} {...props} />;
  },
  Small(props: TextProps) {
    return <TextWrapper fontWeight={500} fontSize={11} {...props} />;
  },
  Blue(props: TextProps) {
    return <TextWrapper fontWeight={500} color={"blue1"} {...props} />;
  },
  Yellow(props: TextProps) {
    return <TextWrapper fontWeight={500} color={"yellow3"} {...props} />;
  },
  DarkGray(props: TextProps) {
    return <TextWrapper fontWeight={500} color={"text3"} {...props} />;
  },
  Gray(props: TextProps) {
    return <TextWrapper fontWeight={500} color={"bg3"} {...props} />;
  },
  Italic(props: TextProps) {
    return (
      <TextWrapper
        fontWeight={500}
        fontSize={12}
        fontStyle={"italic"}
        color={"text2"}
        {...props}
      />
    );
  },
  Error({ error, ...props }: { error: boolean } & TextProps) {
    return (
      <TextWrapper
        fontWeight={500}
        color={error ? "red1" : "text2"}
        {...props}
      />
    );
  },
};

export const ThemedGlobalStyle = createGlobalStyle`
html {
  color: ${({ theme }) => theme.text1};
}

a {
 color: ${({ theme }) => theme.blue1}; 
}
`;
