import styled, { css } from 'styled-components';

export const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;

  a {
    text-decoration: none;
    font-size: 18px;
    color: #7159c1;
    display: flex;
    flex-direction: row;
    align-items: center;

    svg {
      margin-right: 4px;
    }
  }
`;

export const Owner = styled.a`
  font-weight: bold;
  margin-left: 16px;
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 24px;
  justify-content: space-between;
  flex: 1;
  text-decoration: none;
  margin-top: -85px;

  img {
    width: 110px;
    height: 110px;
    border-radius: 50%;
    border: 6px solid #fff;
    background: #fff;
  }
`;

export const Title = styled.div`
  margin: 16px auto;
  text-align: center !important;
  font-size: 28px;
  font-weight: bold;
`;

export const StateContainer = styled.div`
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transition: 1s;
`;

export const State = styled.label`
  margin: 8px;
  padding: 8px;

  border: 1px solid #7159c1;
  min-width: 60px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-radius: 4px;
  font-weight: 500;
  transition: 0.5s;

  text-transform: capitalize;

  color: #7159c1;

  ${({ checked }) =>
    checked &&
    css`
      background: #7159c1;
      color: #fff;
    `}

  input[type='radio'] {
    width: 0;
    height: 0;
  }
`;

export const Loading = styled.h2`
  color: #fff;
  margin: auto;
  height: 100%;
  width: 100%;
  text-align: center;
`;

export const IssueList = styled.ul`
  list-style: none;

  border-top: 1px solid #eee;

  padding-top: 30px;
  margin-top: 30px;

  li {
    display: flex;
    flex-direction: row;

    padding: 15px 10px;
    align-items: center;
    border: solid 1px #eee;
    border-radius: 4px;

    & + li {
      margin-top: 10px;
    }

    img {
      height: 40px;
      width: 40px;
      border-radius: 50%;
      border: solid 1px #eee;
    }

    div {
      flex: 1;
      margin-left: 15px;
      /* display: flex;
      flex-direction: column; */

      strong {
        font-size: 16px;

        a {
          text-decoration: none;
          color: #333;
          &:hover {
            color: #7159c1;
          }
        }
      }
      p {
        color: #999;
        margin-top: 5px;
        font-size: 12px;
      }
    }
  }
`;

export const Label = styled.span`
  background: #${({ color }) => color}60;
  border-radius: 5px;
  padding: 4px;
  font-size: 12px;
  margin-left: 6px;
  font-weight: bold;
  color: #${({ color }) => color};
`;

export const Pagination = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  margin-top: 30px;
  button {
    background: transparent;
    border: none;
    display: flex;
    align-items: center;

    opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};

    svg {
      font-size: 20px;
      color: #7159c1;
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    &:active {
      opacity: 0.7;
    }
  }

  span {
    font-size: 20px;
    color: #7159c1;
    margin: 0 12px;
  }
`;
