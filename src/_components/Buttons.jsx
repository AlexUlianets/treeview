import {CustomReact} from "../index";
import TreeView from "./Treeview";
import React from "react";

const Buttons = ({
                      data,
                      expanded = true,
                      name
                  }) => {

    const [isExpanded, setIsToggled] = CustomReact.useState(expanded);


    const handleReset = () => setIsToggled(true);

    return (
        <>
            {isExpanded && <button onClick={() => setIsToggled(false)}>Collapse all</button>}
            {!isExpanded && <button onClick={() => handleReset(true)}>Expand all</button>}
            <TreeView
                data={data}
                name="companyJson"
                expanded={isExpanded}
                changeButtonVisibility={name}
            />
        </>);
}

export default Buttons;
