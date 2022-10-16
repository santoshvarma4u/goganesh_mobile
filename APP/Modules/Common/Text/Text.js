import {arrayOf, instanceOf, oneOf, oneOfType, string} from 'prop-types';
import React from 'react';
import {Text as RNText} from 'react-native';

import styles from './Text.styles.js';

const H1 = 'H1';
const H2 = 'H2';
const H3 = 'H3';
const H4 = 'H4';
const H5 = 'H5';
const P1 = 'P1';
const P2 = 'P2';
const P3 = 'P3';
const caption = 'caption';
const header = 'header';
const subheader = 'subheader';
const paragraph = 'paragraph';
const text = 'text';
const title = 'title';

export const typeShape = oneOf([
  H1,
  H2,
  H3,
  H4,
  H5,
  P1,
  P2,
  P3,
  header,
  subheader,
  title,
  paragraph,
  text,
  caption,
]);

const Text = ({children = '', variant = P1, style, color, ...restProps}) => (
  <RNText
    style={[
      styles.base,
      styles[variant],
      {
        color: color,
      },
      style,
    ]}
    {...restProps}>
    {children}
  </RNText>
);

Text.propTypes = {
  children: oneOfType([string, instanceOf(Text), instanceOf(RNText)]),
  style: oneOfType([arrayOf(RNText.propTypes.style), RNText.propTypes.style]),
  variant: typeShape,
  color: string,
  ...RNText.propTypes,
};

Text.defaultProps = {
  variant: text,
  children: '',
  style: {},
  color: '',
};

export default Text;
