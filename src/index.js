import { Component } from 'react'

class Loader extends Component {
  state = {
    [this.props.propName]: null,
  }
  componentDidMount() {
    if (typeof this.props.resolver === 'function') {
      this.props
        .resolver()
        .then(value => {
          this.setState({
            [this.props.propName]: this.props[this.props.propName],
            meta: value,
          })
        })
        .catch(error => {
          this.setState({
            [this.props.propName]: this.props[this.props.propName],
            error,
          })
        })
    } else {
      setTimeout(() => {
        this.setState({
          [this.props.propName]: this.props[this.props.propName],
        })
      })
    }
  }

  render() {
    return this.props.children(this.state)
  }
}

export default Loader
