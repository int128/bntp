import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FolderItemEditorForm from './FolderItemEditorForm';

import * as actionCreators from '../../state/folderItemEditor/actionCreators';

import Bookmark from '../../models/Bookmark';
import ChromeApp from '../../models/ChromeApp';
import ChromePage from '../../models/ChromePage';
import FolderItemPreference from '../../models/FolderItemPreference';

const FolderItemTypes = [
  PropTypes.instanceOf(Bookmark),
  PropTypes.instanceOf(ChromeApp),
  PropTypes.instanceOf(ChromePage),
];

class FolderItemEditorContainer extends React.Component {
  static propTypes = {
    editingFolderItem: PropTypes.oneOfType(FolderItemTypes),
    editingFolderItemPreference: PropTypes.instanceOf(FolderItemPreference),
  }

  render() {
    const { dispatch, editingFolderItem, editingFolderItemPreference } = this.props;
    if (editingFolderItem === null || editingFolderItemPreference === null) {
      return null;
    } else {
      return (
        <FolderItemEditorForm
          folderItem={editingFolderItem}
          folderItemPreference={editingFolderItemPreference}
          onChange={(item, preference) => dispatch(actionCreators.notifyChange(item, preference))}
          onSubmit={(item, preference) => dispatch(actionCreators.save(item, preference))}
          onRemove={(item, preference) => dispatch(actionCreators.remove(item, preference))}
          onCancel={() => dispatch(actionCreators.cancel())}/>
      );
    }
  }
}

const mapStateToProps = state => ({
  editingFolderItem: state.editingFolderItem,
  editingFolderItemPreference: state.editingFolderItemPreference,
});

export default connect(mapStateToProps)(FolderItemEditorContainer);
