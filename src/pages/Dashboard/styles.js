import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 900px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;

  header {
    width: 100%;
    display: flex;
    align-self: center;
    align-items: center;
    justify-content: space-between;
    button {
      display: flex;
      align-self: center;
      align-items: center;
      width: 150px;
      margin: 10px 0 0;
      padding: 10px;
      height: 44px;
      background: #f64c75;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;

      transition: background 0.2s;

      strong {
        color: #fff;
        font-size: 14px;
      }

      &:hover {
        background: ${darken(0.08, '#f64c75')};
      }
    }
    strong {
      color: #fff;
      font-size: 24px;
      margin: 0 15px;
    }
  }

  ul {
    display: grid;
    /* create 2 columns with the same size*/
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 8px;
    margin-top: 30px;
    /* each cell will have 15px of distance of each other*/
  }
`;

export const Meetup = styled.li`
  padding: 8px;
  border-radius: 4px;
  height: 50px;

  background: #22202c;
  display: flex;
  align-self: center;
  align-items: center;
  justify-content: space-between;

  strong {
    width: 70%;
    color: #fff;
    font-size: 16px;
  }
  span {
    color: #666;
    font-size: 16px;
  }
  button {
    border: 0;
    background: none;
    display: ${props => (!props.past ? 'block' : 'none')};
  }
`;
