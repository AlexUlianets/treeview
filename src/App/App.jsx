import React from 'react';
import Buttons from "../_components/Buttons";
import jsonData from "../json.json";

let data = jsonData;

class App extends React.Component {

    render() {
        return (
            <Buttons data={data} name="companyJson"/>
        );
    }
}

export default App;
