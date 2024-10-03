import { keyframes } from "styled-components";

export const blur_in = keyframes`
    0%{filter:blur(12px);opacity:0}100%{filter:blur(0);opacity:1}
`;
export const slideBackground=keyframes`
    0%{
background-position:120px 0;
    }
    100%{
background-position:-120px 0;
    }
`