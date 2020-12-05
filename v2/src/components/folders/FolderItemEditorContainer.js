import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';

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
    showFolderItemEditor: PropTypes.bool.isRequired,
    folderItemEditorError: PropTypes.string,
    editingFolderItem: PropTypes.oneOfType(FolderItemTypes),
    editingFolderItemPreference: PropTypes.instanceOf(FolderItemPreference),
  }

  render() {
    const {
      dispatch,
      showFolderItemEditor,
      folderItemEditorError,
      editingFolderItem,
      editingFolderItemPreference,
    } = this.props;
    return (
      <ReactModal
        isOpen={showFolderItemEditor}
        onRequestClose={() => dispatch(actionCreators.cancel())}
        contentLabel="FolderItemEditorForm"
        className="FolderItemEditorForm__Modal"
        overlayClassName="FolderItemEditorForm__Overlay">
        {showFolderItemEditor ?
          <FolderItemEditorForm
            folderItem={editingFolderItem}
            folderItemPreference={editingFolderItemPreference}
            message={folderItemEditorError}
            onChange={(item, preference) => dispatch(actionCreators.notifyChange(item, preference))}
            onSubmit={(item, preference) => dispatch(actionCreators.save(item, preference))}
            onRemove={(item, preference) => dispatch(actionCreators.remove(item, preference))}/>
        : null}
      </ReactModal>
    );
  }
}

const mapStateToProps = state => ({
  showFolderItemEditor: state.showFolderItemEditor,
  folderItemEditorError: state.folderItemEditorError,
  editingFolderItem: state.editingFolderItem,
  editingFolderItemPreference: state.editingFolderItemPreference,
});

export default connect(mapStateToProps)(FolderItemEditorContainer);
