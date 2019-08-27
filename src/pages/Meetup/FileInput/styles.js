import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  margin-bottom: 30px;
  width: 100%;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  align-items: center;
  label {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }
    div {
      height: 400px;
      background: #000;
      flex: 1;
      text-align: center;
      img {
        margin-top: ${props => (!props.hasFile ? '151px' : '0')};
        width: ${props => (!props.hasFile ? '173px' : '900px')};
        height: ${props => (!props.hasFile ? '98px' : '400px')};
        border: ${props =>
          props.hasFile ? '3px solid rgba(255, 255, 255, 0.3)' : '0'};
        background: #eee;
      }
    }

    input {
      display: none;
    }
  }
`;
