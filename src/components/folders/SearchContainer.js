import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Seq } from 'immutable';
import { openLinkIfSpecialLink } from '../../infrastructure/LinkOpener';

import BarFolder from '../kits/BarFolder';
import BarFolderItem from '../kits/BarFolderItem';
import FloatTip from '../kits/FloatTip';

import FolderContainer from './FolderContainer';

//import Fuse from 'fuse.esm.js';

class SearchContainer extends React.Component {
    static propTypes = {
        bookmarkFolders: PropTypes.instanceOf(Seq).isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {searchtext: "", results: []};
    }

    onInputChange(e) {
        let bookmarkFolders = this.props.bookmarkFolders;
        //this.state.searchtext = e.target.value;
        //this.state.results = ;
        console.log(this.state.searchtext);
        //console.log(this.state.results.toArray());
        this.setState({
            searchtext: e.target.value,
            results: bookmarkFolders.filter(folder => folder.title.toLowerCase().includes(this.state.searchtext.toLowerCase()))
        });
    }

  render() {
    return (
      <div className="TopSites">
        <div style={{paddingLeft:"10px"}} className="BarFolder">
        <input style={
                {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    marginBottom: "8px"
                }
                } type="text" ref="title" defaultValue={""}
                className="FolderItemEditorForm__TextInput"
                onChange={e => this.onInputChange(e)}
                />
        </div>
        {this.state.results.map(folder => <FolderContainer key={folder.id} folder={folder}/>)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
    bookmarkFolders: state.bookmarkFolders,
});

export default connect(mapStateToProps)(SearchContainer);
