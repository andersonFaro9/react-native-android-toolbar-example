'use strict';

import React from 'react-native';

var navigator = {userAgent: 'react-native'};
import io from './node_modules/socket.io-client/socket.io.js';

var {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ListView,
  ProgressBarAndroid
} = React;

var ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});

var Tweetes = React.createClass({
  getInitialState: function() {
    return {
      tweets: ds.cloneWithRows([]),
      raw: [],
      hash: 'ftw'
    };
  },
  componentWillMount: function() {
    this.socket = io('http://192.168.56.1:5000', {jsonp: false});
    this.socket.on('tweet', this.updateTweet);
  },
  updateTweet: function(data) {
    raw = this.state.raw;
    raw.push(data);
    console.log(35, raw);
    this.setState({
      tweets: this.state.tweets.cloneWithRows(raw),
      raw: raw,
      loading: false
    });
  },
  sendHash: function() {
    this.setState({loading: true});
    this.socket.emit('tag', {hash: this.state.hash});
  },

  render: function() {
    var Loader;
    var Indicator;

    if (this.state.loading) {
      Loader = <ProgressBarAndroid style={styles.loader}/>
    }

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Tweetes
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({hash: text})}
          onSubmitEditing={this.sendHash}
          value={this.state.hash}
        />

        {Loader}
        {Indicator}

        <ListView
          dataSource={this.state.tweets}
          renderRow={ItemView}
        />

      </View>
    );
  }
});


ItemView = function(data) {
  return (
    <View style={itemViewStyle.view}>
      <Image
        source={{uri: data.user.image}}
        style={itemViewStyle.image}
      />
      <Text style={itemViewStyle.name}> {data.user.name} </Text>
      <Text style={itemViewStyle.text}> {data.text} </Text>
    </View>
  );
};


var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  loader: {
    alignSelf: 'center'
  },
  input: {
    height: 50,
    margin: 20,
    fontSize: 22
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

var itemViewStyle = StyleSheet.create({
  view: {
    flex: 0,
    backgroundColor: '#FAFFFF',
    padding: 10,
    margin: 20,
    flexDirection: 'row',
    borderColor: '#efefef',
    borderBottomWidth: 2

  },
  name: {
    fontWeight: 'bold',
    color: '#333',
    alignSelf: 'center',
    fontSize: 20,
    flex: 1
  },
  text: {
    color: '#333',
    alignSelf: 'center',
    fontSize: 20,
    flex: 1,
  },
  image: {
    height: 50,
    width: 50,
    margin: 10,
    alignSelf: 'center'
  }
});

AppRegistry.registerComponent('Tweetes', () => Tweetes);
