import React from "react";
import PropTypes from "prop-types";

// Styled Components
import { StyledLoadMoreBtn } from "./styles";

const LoadMoreBtn = ({ text, callback }) => (
  <StyledLoadMoreBtn type="button" onClick={callback}>
    {text}
  </StyledLoadMoreBtn>
);

LoadMoreBtn.propTypes = {
  text: PropTypes.string,
  callback: PropTypes.func,
};

export default LoadMoreBtn;