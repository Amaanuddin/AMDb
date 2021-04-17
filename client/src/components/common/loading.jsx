import React from 'react';
import styled, { css } from 'styled-components';

const Loader = styled.div`
  ${() => {
  return css`
          &,
          &:after {
            border-radius: 50%;
            width: 8em;
            height: 8em;
          }

          & {
            margin: 60px auto;
            font-size: 10px;
            position: relative;
            top: calc(50vh - 10em);
            text-indent: -9999em;
            border-top: 0.9em solid rgba(71, 56, 128, 0.2);
            border-right: 0.9em solid rgba(71, 56, 128, 0.2);
            border-bottom: 0.9em solid rgba(71, 56, 128, 0.2);
            border-left: 0.9em solid #473880;
            -webkit-transform: translateZ(0);
            -ms-transform: translateZ(0);
            transform: translateZ(0);
            -webkit-animation: load8 1.1s infinite linear;
            animation: load8 1.1s infinite linear;
          }

          @-webkit-keyframes load8 {
            0% {
              -webkit-transform: rotate(0deg);
              transform: rotate(0deg);
            }
            100% {
              -webkit-transform: rotate(360deg);
              transform: rotate(360deg);
            }
          }

          @keyframes load8 {
            0% {
              -webkit-transform: rotate(0deg);
              transform: rotate(0deg);
            }
            100% {
              -webkit-transform: rotate(360deg);
              transform: rotate(360deg);
            }
          }
        `;
  }}
`;
function Loading() {

  return(
    <Loader >Loading...</Loader>
  );
}

export default Loading;
