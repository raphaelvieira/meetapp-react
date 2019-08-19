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
    strong {
      color: #fff;
      font-size: 24px;
      margin: 0 15px;
    }
    div {
      display: flex;
      flex: 1;
      flex-direction: row;
      justify-content: flex-end;
      align-self: center;
      align-items: center;

      button {
        width: 120px;
        margin: 10px 0 0;
        padding: 10px;
        height: 44px;
        text-align: center;
        color: #fff;
        border: 0;
        border-radius: 4px;
        border: 0;
        background: none;

        transition: background 0.2s;

        strong {
          color: #fff;
          font-size: 14px;
        }
      }
      #edit {
        background: #4dbaf9;
        margin-right: 10px;
        &:hover {
          background: ${darken(0.08, '#4DBAF9')};
        }
      }
      #cancel {
        background: #f64c75;
        &:hover {
          background: ${darken(0.08, '#f64c75')};
        }
      }
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

export const Detail = styled.li`
  margin-top: 30px;
  padding: 8px;
  border-radius: 4px;
  background: #22202c;
  display: flex;
  flex-direction: column;
  align-self: center;
  align-items: center;
  justify-content: space-between;

  img {
    width: 100%;
  }
  strong {
    padding-top: 20px;
    color: #fff;
    font-size: 16px;
    text-align: justify;
    font-weight: normal;
  }

  div {
    width: 100%;
    flex: 1;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    margin-top: 30px;

    span {
      color: #fff;
      padding-right: 50px;
      opacity: 0.7;
    }
  }
`;
