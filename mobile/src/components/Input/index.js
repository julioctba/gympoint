import React, { forwardRef } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import { Container, Tinput } from './styles';

function Input({ style, icone, ...rest }, ref) {
  return (
    <Container style={style}>
      {icone && <Icon name={icone} size={20} color="rgba(255,255,255,0.6)" />}
      <Tinput {...rest} ref={ref} />
    </Container>
  );
}

Input.propTypes = {
  icon: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Input.defaultProps = {
  icon: null,
  style: {},
};

export default forwardRef(Input);
