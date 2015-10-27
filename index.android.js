'use strict';

import React from 'react-native';

var navigator = {userAgent: 'react-native'};
import io from './node_modules/socket.io-client/socket.io.js';

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView
} = React;

var ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});

var Tweetes = React.createClass({
  getInitialState: function() {
    return {
      tweets: ds.cloneWithRows([]),
      raw: []
    };
  },
  componentWillMount: function() {
    this.socket = io('https://tweetes.localtunnel.me', {jsonp: false});
    this.socket.on('connect', () => {
      console.log('connect');
  });
    this.socket.on('tweet', this.updateTweet);
  },
  updateTweet: function(data) {
    raw = this.state.raw;
    raw.push(data);
    console.log(35, raw);
    this.setState({
      tweets: this.state.tweets.cloneWithRows(raw),
      raw: raw
    });
  },

  itemView: function(data) {
    return (
      <Text style={styles.itemView}> {data.text} </Text>
    );
  },
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Tweetes
        </Text>

        <ListView
          dataSource={this.state.tweets}
          renderRow={this.itemView}
        />

      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  itemView: {
    textAlign: 'center',
    color: '#333333',
    backgroundColor: '#efefef',
    padding: 20,
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Tweetes', () => Tweetes);
