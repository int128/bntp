import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TileFolderItem from '../kits/TileFolderItem';

import * as actionCreators from '../../state/folderItemPreferences/actionCreators';
import * as editorActionCreators from '../../state/folderItemEditor/actionCreators';

import FolderItemPreferences from '../../models/FolderItemPreferences';
import Bookmark from '../../models/Bookmark';
import ChromeApp from '../../models/ChromeApp';
import ChromePage from '../../models/ChromePage';

const FolderItemTypes = [
  PropTypes.instanceOf(Bookmark),
  PropTypes.instanceOf(ChromeApp),
  PropTypes.instanceOf(ChromePage),
];

class FolderItemContainer extends React.Component {
  static propTypes = {
    folderItemPreferences: PropTypes.instanceOf(FolderItemPreferences).isRequired,
    item: PropTypes.oneOfType(FolderItemTypes).isRequired,
  }

  componentWillMount() {
    this.props.dispatch(actionCreators.subscribe());
  }

  componentWillUnmount() {
    this.props.dispatch(actionCreators.unsubscribe());
  }

  render() {
    const { dispatch, item, folderItemPreferences } = this.props;
    const folderItemPreference = folderItemPreferences.get(item.id);
    return (
      <TileFolderItem
        link={item.link}
        badge={folderItemPreference.accessKey}
        canEdit={item.canEdit}
        onEditClick={() => dispatch(editorActionCreators.open(item, folderItemPreference))}>
        {item.title}
      </TileFolderItem>
    );
  }
}

const mapStateToProps = state => ({
  folderItemPreferences: state.folderItemPreferences,
});

export default connect(mapStateToProps)(FolderItemContainer);
