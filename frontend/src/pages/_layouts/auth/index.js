import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Content } from './styles';
import GlobalStyle from './defaultStyles';

export default function AuthLayout({ children }) {
  return (
    <Wrapper>
      <GlobalStyle />
      <Content>{children}</Content>
    </Wrapper>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
