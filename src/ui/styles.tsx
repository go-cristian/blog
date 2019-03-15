import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

import searchIcon from "../public/images/search.png";

interface TextProps {
  small?: boolean;
  big?: boolean;
  colored?: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  position: relative;
  width: 100%;
  max-width: 980px;
  margin: 0 auto;
  margin-top: 140px;
  @media (max-width: 480px) {
    align-items: center;
  }

  @media (max-width: 980px) {
    width: 100%;
  }
`;

export const Title = styled.p`
  font-family: NeueHansKendrick-ExtraBold;
  font-size: 120px;
  color: #1d1fdd;
  overflow: hidden;
  margin: 0;
  width: 98%;
  text-overflow: ellipsis;
  @media (max-width: 980px) {
    font-size: 60px;
  }
`;

export const Text = styled.span`
  font-family: Helvetica;
  font-size: 14px;
  text-align: justify;
  color: #565656;
  letter-spacing: 0;
  line-height: 24px;

  ${(props: TextProps) =>
    props.colored &&
    css`
      color: #1d1fdd;
    `}

  ${(props: TextProps) =>
    props.small &&
    css`
      font-size: 10px;
    `}

  ${(props: TextProps) =>
    props.big &&
    css`
      font-size: 24px;
    `}
`;

export const Input = styled.input`
  font-family: NeueHansKendrick-Medium;
  font-size: 18px;
  color: #666666;
  letter-spacing: 0;
  border: 1px black;
  margin-block-start: 1em;
  margin-block-end: 1em;
  background: #f5f5f5;
  width: 100%;
  padding: 10px;
`;

export const Area = styled.textarea`
  font-family: NeueHansKendrick-Medium;
  font-size: 18px;
  color: #666666;
  letter-spacing: 0;
  border: 1px black;
  margin-block-start: 1em;
  margin-block-end: 1em;
  background: #f5f5f5;
  width: 100%;
  padding: 10px;
`;

export const SearchBox = styled(Input)`
  border-radius: 31px;
  min-height: 22px;
  padding: 20px;
  font-family: NeueHansKendrick-Medium;
  font-size: 18px;
  color: #666666;
  letter-spacing: 0;
  border: 0;
  padding-left: 50px;
  margin-block-start: 1em;
  margin-block-end: 1em;
  height: 22px;
  background: url(${searchIcon}) no-repeat scroll 20px 25px #f5f5f5;
  width: auto;
`;

export const Button = styled.button`
  background: #1d1fdd;
  border-radius: 30px;
  height: 62px;
  font-family: NeueHansKendrick-ExtraBold;
  font-size: 24px;
  padding-right: 60px;
  padding-left: 60px;
  padding-top: 10px;
  padding-bottom: 10px;
  color: #ffffff;
  margin-block-start: 1em;
  margin-block-end: 1em;
  letter-spacing: 0;
  text-align: center;
`;

export const UserContainer = styled.div``;

export const GistView = styled(Link)`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  border-bottom: 1px solid #d8d8d8;
  text-decoration: none;
`;

export const GistLeft = styled.div`
  flex: 1;
`;

export const GistRight = styled.div`
  justify-content: flex-end;
  align-items: center;
  align-self: center;
  @media (max-width: 480px) {
    display: none;
  }
`;

export const Fixed = styled.div`
  background: white;
  position: fixed;
  top: 0px;
  right: 0;
  left: 0;
  z-index: 9999;
  display: block;
  margin: 0;
  padding-top: 10px;
  width: 100%;
  height: 48px;
  user-select: none;
`;

export const ToolbarContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  position: relative;
  max-width: 980px;
  margin: 0 auto;
  @media (max-width: 980px) {
    margin-left: 5%;
    margin-right: 5%;
  }
`;

interface ToolbarButtonProps {
  toRight?: boolean;
}

export const ToolbarButton = styled.button`
  font-family: NeueHansKendrick-ExtraBold;
  font-size: 18px;
  color: #666666;
  letter-spacing: 0;
  text-align: right;
  border: 0;
  border-bottom: 4px solid #1d1fdd;
  background: transparent;

  ${(props: ToolbarButtonProps) =>
    props.toRight &&
    css`
      margin-left: auto;
    `}
`;

export const Logo = styled.img`
  width: 108px;
  height: 24px;
`;

interface ArrowProps {
  inverted?: boolean;
}

export const Arrow = styled.img`
  margin: 20px;
  ${(props: ArrowProps) =>
    props.inverted &&
    css`
      transform: rotate(180deg);
    `}
`;

export const Avatar = styled.img`
  border-radius: 50%;
  width: 42px;
  height: 42px;
`;

export const Name = styled.p`
  font-family: Helvetica;
  font-size: 16px;
  color: #000000;
  letter-spacing: 0;
  margin-left: 0.5em;

  @media (max-width: 480px) {
    display: none;
  }
`;

export const LinkContainer = styled(Link)`
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: 1em;
`;
