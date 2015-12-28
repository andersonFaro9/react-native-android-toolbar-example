'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  AppRegistry
} = React;

var ToolbarAndroid = require('ToolbarAndroid');

var ToolbarAndroidExample = React.createClass({
  statics: {
    title: '<ToolbarAndroid>',
    description: 'Examples of using the Android toolbar.'
  },
  getInitialState: function() {
    return {
      actionText: 'Example app with toolbar component',
      toolbarSwitch: false,
      colorProps: {
        titleColor: '#3b5998',
        subtitleColor: '#6a7180',
      },
    };
  },
  render: function() {
    return (
      <View title="<ToolbarAndroid>">
        <ToolbarAndroid
          actions={toolbarActions}
          logo={require('./ic_launcher.png')}
          onActionSelected={this._onActionSelected}
          onIconClicked={() => this.setState({actionText: 'Icon clicked'})}
          style={styles.toolbar}
          subtitle={this.state.actionText}
          title="Toolbar" />
        <Text>{this.state.actionText}</Text>
      </View>
    );
  },
  _onActionSelected: function(position) {
    this.setState({
      actionText: 'Selected ' + toolbarActions[position].title,
    });
  },
});

var toolbarActions = [
  {title: 'Create', icon: require('./ic_launcher.png'), show: 'always'},
  {title: 'Filter'},
  {title: 'Filter'},
  {title: 'Filter'},
  {title: 'Filter'},
  {title: 'Filter'},
  {title: 'Settings', icon: {uri: 'http://slacy.me/images/favicon.png'}, show: 'always'},
];

var styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#fafafa',
    height: 56,
  },
});

AppRegistry.registerComponent('Tweetes', () => ToolbarAndroidExample);
