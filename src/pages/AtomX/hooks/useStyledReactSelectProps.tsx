import { darken } from "polished";
import { defaultTheme } from "react-select";
import { useTheme } from "styled-components";

import { DefaultFlex } from "../components/Common/Flex";
import CurrencyLogo from "../components/Common/CurrencyOnChainLogo";

export function useStyledReactSelectProps() {
  const theme = useTheme();
  return {
    theme: {
      ...defaultTheme,
      colors: {
        ...defaultTheme.colors,
        primary: theme.text1, // active select border
        primary25: theme.primary1, // hz
        neutral0: theme.primary1, // bg of all
        neutral5: theme.bg4, // disabled background
        neutral10: theme.text1, // border - hz
        neutral20: theme.text1, // outline & icons
        // neutral30: 'red',
        // neutral40: 'red',
        neutral50: theme.text1, //placeholder
        neutral60: theme.text1, // icons arrow and x on active
        neutral70: theme.text1, // icons active
        neutral80: theme.text1, // icons on hover and text
        // neutral90: 'red',
      },
    },
    styles: {
      container: (base: any) => ({
        ...base,
        width: "fit-content",
        background:
          "url(\"data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>\") no-repeat",
        backgroundColor: theme.primary1,
        color: theme.text5,
        borderRadius: "20px",
      }),
      control: (base: any) => ({
        ...base,
        outline: "none",
        borderRadius: "8px",
        border: "none",
      }),
      menu: (base: any) => ({
        ...base,
        marginTop: "1px",
        borderRadius: "8px",
        padding: "2px 0",
        zIndex: 9,
      }),
      option: (styles: any) => ({
        ...styles,
        height: "37px",
        color: theme.text1,
        background: theme.primary1,
        cursor: "pointer",
        fontWeight: "400",
        fontSize: "16px",
        lineHeight: "19px",
        transition: "all 0.3s ease",
        "&:hover": {
          background: darken(0.2, theme.primary1),
        },
      }),
    },
    formatOptionLabel: (option: any) =>
      !option.icon && !option.currency ? (
        option.label
      ) : (
        <DefaultFlex gap="0.5rem" align="center">
          {option.icon && (
            <img
              src={option.icon}
              alt={option.label}
              width="20px"
              height="20px"
            />
          )}
          {option.currency && <CurrencyLogo currency={option.currency} />}

          {option.label}
        </DefaultFlex>
      ),
  };
}
