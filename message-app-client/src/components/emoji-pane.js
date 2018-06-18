import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import PropTypes from 'prop-types';
import data from 'emoji-mart/data/apple.json'
import { NimblePicker } from 'emoji-mart'
import { appendEmoji } from '../actions/uiActions'

import './emoji-pane.css';

class EmojiPane extends Component {

  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(emoji) {
    this.props.appendEmoji(emoji)
  }

  render() {
    return (
      <Popover className='emoji-pane mw-100 mh-100' placement="top" isOpen={this.props.emojiPaneOut} target="emoji-icon">
        <NimblePicker onSelect={this.onSelect} emojiTooltip="true" emoji="" showPreview="false" showSkinTones="false" title="" set='apple' data={data} />
      </Popover>
    );
  }

}

const mapStateToProps = state => {
  return {
    emojiPaneOut: state.ui.emojiPaneOut
  }
};

EmojiPane.propTypes = {
}

export default connect(mapStateToProps, { appendEmoji })(EmojiPane);
