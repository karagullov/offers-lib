import React from "react";
import styled, { useTheme } from "styled-components";
import Div from "../Div";
import { Span } from "../Span";

const CheckboxWrapper = styled.div<{ checked: boolean }>`
  height: 24px;
  width: 24px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  align-items: center;
  border: ${({ theme, checked }) =>
    `1px solid ${checked ? theme.success : theme.text3}`};
  border-radius: 4px;
`;

interface IProps {
  value: boolean;
  onClick: () => void;
  label: string | React.ReactNode;
  styles?: any;
}

const Checkbox = ({ label, value, onClick, styles }: IProps) => {
  const theme = useTheme();

  return (
    <Div display="flex" align="center" gap="0.5rem" {...styles}>
      <CheckboxWrapper onClick={onClick} checked={value}>
        {value && (
          <svg
            width="20"
            height="20"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_1_181)">
              <path
                d="M5 18L12 25L25.0576 11.9424"
                stroke={theme.success}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_1_181">
                <rect width="32" height="32" fill="white" />
              </clipPath>
            </defs>
          </svg>
        )}
      </CheckboxWrapper>
      <Span cursor="pointer" onClick={onClick}>
        {label}
      </Span>
    </Div>
  );
};

export default Checkbox;
