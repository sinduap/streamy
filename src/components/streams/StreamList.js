import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';
import { Link } from 'react-router-dom';

class StreamList extends Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  adminEl = stream => {
    if (this.props.currentUserId === stream.userId) {
      return (
        <div className='right floated content'>
          <Link to={`/streams/edit/${stream.id}`} className='ui button primary'>
            Edit
          </Link>
          <Link
            to={`/streams/delete/${stream.id}`}
            className='ui button negative'
          >
            Delete
          </Link>
        </div>
      );
    }
  };

  streamListEL() {
    return this.props.streams.map(stream => {
      return (
        <div className='item' key={stream.id}>
          {this.adminEl(stream)}
          <i className='large middle aligned icon camera' />
          <div className='content'>
            <Link to={`/streams/${stream.id}`} className='header'>
              {stream.title}
            </Link>
            <div className='description'>{stream.description}</div>
          </div>
        </div>
      );
    });
  }

  createStreamEl() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to='/streams/new' className='ui button primary'>
            Create Stream
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h2>Stream List</h2>
        <div className='ui celled list'>{this.streamListEL()}</div>
        {this.createStreamEl()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
    streams: Object.values(state.streams),
  };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);
