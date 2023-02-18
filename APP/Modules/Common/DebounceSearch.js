import React from 'react';
import {Searchbar} from 'react-native-paper';

export class DebounceSearch extends React.PureComponent {
  static defaultProps = {
    delayTimeout: 600,
    minLength: 1,
    onChangeText: undefined,
    value: undefined,
    inputRef: undefined,
  };

  timerId = null;

  constructor(props) {
    super(props);

    this.state = {
      value: props.value || '',
    };
  }

  resetTimer() {
    clearTimeout(this.timerId);
  }

  componentWillUnmount() {
    this.resetTimer();
  }

  notify = value => {
    const {onChangeText, minLength} = this.props;

    const valueToUpdate = value.length >= minLength ? value : '';

    onChangeText(valueToUpdate);
  };

  runTimeoutUpdate = value => {
    const {delayTimeout} = this.props;
    this.resetTimer();
    this.timerId = setTimeout(() => this.notify(value), delayTimeout);
  };

  onChangeText = value => {
    const {minLength} = this.props;
    const valueToUpdate = value.length >= minLength ? value : '';
    this.setState({value}, () => this.runTimeoutUpdate(valueToUpdate));
  };

  onBlur = () => {
    this.resetTimer();
    this.notify(this.state.value);
  };

  render() {
    const {onChangeText, inputRef, ...props} = this.props;
    const {value} = this.state;

    return (
      <Searchbar
        {...props}
        onChangeText={this.onChangeText}
        onBlur={this.onBlur}
        value={value}
        ref={inputRef}
      />
    );
  }
}

export default DebounceSearch;
