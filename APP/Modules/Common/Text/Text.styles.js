import {StyleSheet} from 'react-native';

const PRIMARY_FONT_REGULAR = 'Montserrat-Regular';
const PRIMARY_FONT_BOLD = 'Montserrat-Bold';
const PRIMARY_FONT_MEDIUM = 'Montserrat-Medium';
const PRIMARY_FONT_LIGHT = 'Montserrat-Light';

/*
	For any common styles you can add them to base.
	Define a rule group for each of the types defined in Text.js
*/
const TypographyStyles = StyleSheet.create({
  base: {color: '#000000'},
  H1: {
    fontFamily: PRIMARY_FONT_BOLD,
    fontSize: 30,
    lineHeight: 41,
  },
  H2: {
    fontFamily: PRIMARY_FONT_MEDIUM,
    fontSize: 24,
    lineHeight: 33,
  },
  H3: {
    fontFamily: PRIMARY_FONT_BOLD,
    fontSize: 16,
    lineHeight: 20,
  },
  H4: {
    fontFamily: PRIMARY_FONT_BOLD,
    fontSize: 14,
    lineHeight: 19,
  },
  H5: {
    fontFamily: PRIMARY_FONT_BOLD,
    fontSize: 12,
    lineHeight: 16,
  },
  P1: {
    fontFamily: PRIMARY_FONT_REGULAR,
    fontSize: 16,
    lineHeight: 20,
  },
  P2: {
    fontFamily: PRIMARY_FONT_REGULAR,
    fontSize: 14,
    lineHeight: 19,
  },
  P3: {
    fontFamily: PRIMARY_FONT_REGULAR,
    fontSize: 10,
    lineHeight: 14,
  },
  caption: {
    fontFamily: PRIMARY_FONT_LIGHT,
    fontSize: 12,
    lineHeight: 20,
    marginVertical: 2,
    letterSpacing: 0.4,
  },
  header: {
    fontFamily: PRIMARY_FONT_BOLD,
    fontSize: 24,
    lineHeight: 32,
    marginVertical: 2,
    letterSpacing: 0,
  },
  subheader: {
    fontFamily: PRIMARY_FONT_MEDIUM,
    fontSize: 16,
    lineHeight: 24,
    marginVertical: 2,
    letterSpacing: 0.5,
  },
  paragraph: {
    fontFamily: PRIMARY_FONT_REGULAR,
    fontSize: 14,
    lineHeight: 20,
    marginVertical: 2,
    letterSpacing: 0.25,
  },
  text: {
    fontFamily: PRIMARY_FONT_REGULAR,
  },
  title: {
    fontFamily: PRIMARY_FONT_MEDIUM,
    fontSize: 20,
    lineHeight: 30,
    marginVertical: 2,
    letterSpacing: 0.15,
  },
});

export default TypographyStyles;
