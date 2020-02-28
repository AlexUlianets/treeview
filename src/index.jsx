import React from 'react';
import App from "./App/App";
import * as ReactDOM from "react-dom";

//Custom solution for the realization useState hook
export const CustomReact = {
    arrayState: [],
    stateIndex: 0,
    component: null,
    useState(initialValue) { //useState custom hook
        if (this.stateIndex === this.arrayState.length) {
            const statePair = {
                value: initialValue,
                setState(newValue) {
                    statePair.value = newValue;
                    CustomReact.stateIndex = 0;
                    ReactDOM.render(<CustomReact.component />, rootElement);
                }
            };

            this.arrayState.push(statePair);
        }
        const currentStatePair = this.arrayState[this.stateIndex];
        this.stateIndex += 1;
        return [currentStatePair.value, currentStatePair.setState];
    },
    render(component, rootElement) {
        this.component = component;
        this.rootElement = rootElement;
        ReactDOM.render(<this.component />, this.rootElement);
    }
};

const rootElement = document.getElementById('root')

CustomReact.render(
    App,
    rootElement
);
