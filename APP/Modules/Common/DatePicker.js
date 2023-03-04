import {Icon} from '@rneui/base';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Colors from '../../Theams/Colors';
import {Typography} from './Text';

export const FGDatePicker = ({date, onDateChange, ...rest}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Pressable
        onPress={() => setOpen(true)}
        mode="contained"
        color={Colors.appBlackColorLight}
        style={styles.pickButton}>
        <Icon
          name={open ? 'calendar-remove' : 'calendar'}
          type="material-community"
          size={20}
          color={Colors.appWhiteColor}
        />
        <Typography
          color={Colors.appWhiteColor}
          style={{marginLeft: 10}}
          variant="H4">
          {date ? moment(date).format('DD MMM YY') : ''}
        </Typography>
      </Pressable>
      {open && (
        <DatePicker
          modal
          mode="date"
          open={open}
          date={date || new Date()}
          onConfirm={dateItem => {
            setOpen(false);
            onDateChange(dateItem);
          }}
          onCancel={() => {
            setOpen(false);
          }}
          theme="dark"
          maximumDate={new Date()}
          {...rest}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  pickButton: {
    minWidth: '45%',
    height: 40,
    backgroundColor: Colors.appBlackColorLight,
    borderRadius: 5,
    color: Colors.appWhiteColor,
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
    paddingHorizontal: 10,
    marginTop: 5,
  },
});

FGDatePicker.propTypes = {
  date: PropTypes.instanceOf(Date) || PropTypes.string,
  onDateChange: PropTypes.func,
  ...DatePicker.PropTypes,
};

FGDatePicker.defaultProps = {
  date: new Date(),
  onDateChange: () => {},
};

export default FGDatePicker;
