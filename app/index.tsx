import { Component } from 'react'
import React from 'react';
import SwitchNavigator from '@/navigation/LoginNavigator'

import { thunk } from 'redux-thunk';
import  reducer  from '@/reducers/reducer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

const store = createStore( reducer, applyMiddleware(thunk) )


export default class App extends React.Component {

  

  render(){
    return (
      <Provider store={store}>
        <SwitchNavigator/>
      </Provider>
    );
  }
}


