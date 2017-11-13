import React from 'react'
import ReactDOM from 'react-dom'

export default class ReactMixins {

    constructor(props) {

    }

    componentWillMount() {

        var _self = this;

        window.addEventListener('resize', function (e) {
            _self.updateSize();
        });

        this.setState({width: this.props.width});

    }

    componentDidMount() {
        this.updateSize();
    }

    componentWillUnmount() {
        window.removeEventListener('resize');
    }

    updateSize() {
        var node = ReactDOM.findDOMNode(this);
        var parentWidth = node.offsetWidth;

        if (parentWidth < this.props.width) {
            this.setState({width: parentWidth - 20});
        } else {
            this.setState({width: this.props.width});
        }
    }
}