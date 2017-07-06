import React from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../../state/folderItem/actionCreators';

class FilterContainer extends React.Component {
  onClickCollapseAll(e) {
    e.preventDefault();
    this.props.dispatch(actionCreators.collapseAllFolders());
  }

  onClickExpandAll(e) {
    e.preventDefault();
    this.props.dispatch(actionCreators.expandAllFolders());
  }

  render() {
    return (
      <div>
        <button onClick={e => this.onClickCollapseAll(e)}>Collapse All</button>
        <button onClick={e => this.onClickExpandAll(e)}>Expand All</button>
      </div>
    );
  }
}

export default connect()(FilterContainer);
