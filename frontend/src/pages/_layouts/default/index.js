import React from 'react';
import PropTypes from 'prop-types';

import Header from '~/components/Header';
import { Wrapper } from './styles';
import GlobalStyle from './defaultStyles';

export default function DefaultLayout({ children }) {
  return (
    <Wrapper>
      <GlobalStyle />
      <Header />
      {children}
    </Wrapper>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
