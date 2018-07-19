import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Alert } from 'react-native';
import { Agenda } from 'react-native-calendars'

export default class App extends React.Component {
  state = {
    items : {
      '2018-07-19': [
        {
          name: 'add stone wall',
          height: 95
        },
        {
          name: 'landscaping',
          height: 120
        }
      ],
      '2018-07-20': [
        // {
        //   name: 'fix door',
        //   height: 50
        // },
        // {
        //   name: 'masonary',
        //   height: 180
        // }
      ]
    }
  }

  goToDetailScreen = () => {
    Alert.alert('go to job details now')
  }

  renderItem = (item) => {
    return (
      <TouchableHighlight
        style={[styles.item, {height: item.height}]}
        onPress={this.goToDetailScreen}
      >
        <Text>{item.name}</Text>
      </TouchableHighlight>
    )
  }

  timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  loadItems = (day) => {
    setTimeout(() => {
      for (let i = 0; i < 2; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 5);
          for (let j = 0; j < numItems; j++) {
            this.state.items[strTime].push({
              name: 'Item for ' + strTime,
              height: Math.max(50, Math.floor(Math.random() * 150))
            });
          }
        }
      }
      //console.log(this.state.items);
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        items: newItems
      });
    }, 1000);
    // console.log(`Load Items for ${day.year}-${day.month}`);
  }

  rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name
  }

  renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
    )
  }

  render() {
    console.log('items now are: ', this.state.items)
    return (
      <Agenda
        items={this.state.items}
        // loadItemsForMonth={this.loadItems}
        selected={'2018-07-19'}
        renderItem={this.renderItem}
        // renderEmptyDate={this.renderEmptyDate}
        renderEmptyDate={() => <View />}
        rowHasChanged={this.rowHasChanged}
        onDayPress={(day)=>{console.log('day pressed')}}
        hideKnob={true}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    backgroundColor: '#8FBC8F',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
})
