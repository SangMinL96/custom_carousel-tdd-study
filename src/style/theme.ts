import { css } from "styled-components";

const fadeIn = css`
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export const theme = {
  fadeIn,
};
