import React, { PropTypes } from 'react';

class LoadingDots extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      frame: 1
    };
  }

  componentDidMount() {
    // Nastaví setInterval do lokální proměnné this.interval, setInterval volá funkci setState a postupně ve state zvyšuje frame
    // Časový interval se bere z this.props.interval, který je definovaný níže
    this.interval = setInterval(() => {
      this.setState({
        frame: this.state.frame + 1
      });
    }, this.props.interval);
  }

  componentWillUnmount() {
    // Zruší nastavený setInterval, který byl uložený do lokální proměnné this.interval
    clearInterval(this.interval);
  }

  render() {
    let dots = this.state.frame % (this.props.dots + 1);
    let text = '';
    while (dots > 0) {
      text += '.';
      dots--;
    }
    return <span>{text}&nbsp;</span>;
  }
}

LoadingDots.defaultProps = {
  interval: 300,
  dots: 3
};

LoadingDots.propTypes = {
  interval: PropTypes.number,
  dots: PropTypes.number
};

export default LoadingDots;