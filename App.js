import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Agenda } from 'react-native-calendars'

export default class App extends React.Component {
  state = {
    items : {}
  }
  renderItem = (item) => {
    return (
      <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
    )
  }

  timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  loadItems = (day) => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
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
    return r1.name !== r2.name;
  }

  renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
    );
  }

  render() {
    return (
      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems}
        selected={'2018-07-19'}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
        rowHasChanged={this.rowHasChanged}
        hideKnob={true}
      />
    );
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
});
