import styled from "styled-components";

export const HeaderStyle = styled.header`
  display: flex;
  align-items: center;
  height: 70px;
  text-transform: uppercase;
  font-size: 1em;
`;

export const HeaderTextStyle = styled.h1`
  padding-left: 1rem;
  & ~ * {
    text-align: center;
  }
`;