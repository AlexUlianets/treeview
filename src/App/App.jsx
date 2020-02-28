import React from 'react';
import Treeview from "../_components/Treeview";
import jsonData from "../json.json";

let data = jsonData;

class App extends React.Component {
    render() {
        return (
            <Treeview data={data} name="companyJson"/>
        );
    }
}

export default App;
