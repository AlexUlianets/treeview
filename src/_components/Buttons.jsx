import {CustomReact} from "../index";
import TreeView from "./Treeview";
import React from "react";

const Buttons = ({
                      data,
                      expanded = true,
                      name,
                      closedCountValue = 0,
                      countR = 0
                  }) => {

    const [isExpanded, setIsToggled] = CustomReact.useState(expanded);
    const [closedCount, countClosedObjects] = CustomReact.useState(closedCountValue);
    const [countResets, countRestFunction] = CustomReact.useState(countR);


    const handleReset = () => {
        setIsToggled(true);
        countRestFunction(countResets+1)
        countClosedObjects(0);
    }

    const countClosedFunction =
        (num) => {
            countClosedObjects(num);
        }

    return (
        <>
            {closedCount}
            {(closedCount===0 && isExpanded)  && <button onClick={() => setIsToggled(false)}>Collapse all</button>}
            {(closedCount>0 || !isExpanded) && <button onClick={() => handleReset(true)}>Expand all</button>}
            <TreeView
                data={data}
                name={name}
                expanded={isExpanded}
                countClosedFunction={countClosedFunction}
                closedCount={closedCount}
                countResets={countResets}
            />
        </>);
}

export default Buttons;
