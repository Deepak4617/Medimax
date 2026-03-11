import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loader">
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .loader {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .loader .dot {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    border: 2px solid #e8e8e8;
    background: #1c0ee6;
    animation: jump 0.8s ease-in-out infinite alternate;
  }

  @keyframes jump {
    100% {
      background: #1fdfe2;
      transform: translateZ(-3rem) scale(1.9);
    }
  }

  .loader .dot:nth-child(1) {
    animation-delay: 0.1s;
  }

  .loader .dot:nth-child(2) {
    animation-delay: 0.2s;
  }

  .loader .dot:nth-child(3) {
    animation-delay: 0.3s;
  }

  .loader .dot:nth-child(4) {
    animation-delay: 0.4s;
  }

  .loader .dot:nth-child(5) {
    animation-delay: 0.5s;
  }`;

export default Loader;
