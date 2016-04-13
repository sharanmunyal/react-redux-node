require('../stylesheets/app.css');

import React from 'react';
import { Component } from 'react';
import TitleBar from './title_bar';

export default class App extends Component {
    render() {
        return (
            <div className="app">
                <TitleBar />
            </div>
        );
    }
}