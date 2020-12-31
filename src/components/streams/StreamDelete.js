import React, { Component } from 'react';
import Modal from '../Modal';
import history from '../../history';
import { fetchStream, deleteStream } from '../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class StreamDelete extends Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onDelete = () => {
    this.props.deleteStream(this.props.match.params.id);
  };

  actions() {
    return (
      <React.Fragment>
        <button onClick={this.onDelete} className='ui button negative'>
          Delete
        </button>
        <Link to={'/'} className='ui button'>
          Cancel
        </Link>
      </React.Fragment>
    );
  }

  contentText() {
    if (!this.props.stream) {
      return 'Are you sure you want to delete this stream';
    }
    return `Are you sure you want to ${this.props.stream.title}?`;
  }

  render() {
    return (
      <Modal
        title='Delete Stream'
        content={this.contentText()}
        actions={this.actions()}
        onDismiss={() => history.push('/')}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
