import React, { useEffect } from 'react';
import {CustomReact} from "../index";

/*
   The component which can take as a prop JSON with any nested level.
   Component can display tree with the same hierarchy as a passed JSON,
   ability collapse or expand each level of hierarchy.
 */

const TreeView = ({
     data, //json data
     expanded,  //if element is opened
     name = null, //name could be any string
     isLast = true, //if element is the last
     isChildElement = false, //if element is the first or no
     isParentExpanded = true, //if the first element is opened,
     countClosedFunction,
     closedCount,
     countResets
}) => {

    const [isExpanded, setIsToggled] = CustomReact.useState(expanded);
    const [parentClicked, setParentClicked] = CustomReact.useState(expanded);

    const setToggleMethod = (ex) => {
        ex ? countClosedFunction(closedCount-1<0 ? 0 : closedCount-1) : countClosedFunction(closedCount+1);
        setIsToggled(ex)
        setParentClicked(true)
    }


    useEffect(()=>
        {
            setIsToggled(expanded)
            if(expanded===true){
                setParentClicked(true);
            }

        }, [expanded, countResets]
    );

    return (
        <>
            <div
                style={{marginLeft: isChildElement ? 16 : 4 + 'px'}}
                className={isParentExpanded ? 'nested-element' : 'nested-element collapsed'}
            >

                <span
                      className={isExpanded ? 'expander' : 'expander closed'}
                      onClick={() => setToggleMethod(!isExpanded)}
                  />
                    {name ? <span className="title bold"> {name}: </span> : <span className="title"></span>}
                    {Array.isArray(data) ? '[' : '{'}
                    {!isExpanded && '...'}

                    {Object.keys(data).map((v, i, a) =>
                        typeof data[v] == 'object' ? (
                            <TreeView
                                key={i}
                                data={data[v]}
                                isLast={i === a.length - 1}
                                name={Array.isArray(data) ? null : v}
                                isChildElement
                                expanded={isExpanded && !parentClicked ? isExpanded : parentClicked}
                                countClosedFunction={countClosedFunction}
                                closedCount={closedCount}
                                isParentExpanded={isParentExpanded && isExpanded}
                                countResets={countResets}
                            />
                        ) : (
                            <p
                                style={{marginLeft: 32 + 'px'}}
                                className={isExpanded ? 'nested-element' : 'nested-element collapsed'}
                            >
                                {Array.isArray(data) ? '' : <span  className="bold">{v}: </span>}
                                {data[v]}
                                {i === a.length - 1 ? '' : ','}
                            </p>
                        )
                    )}
                    {Array.isArray(data) ? ']' : '}'}
                    {!isLast ? ',' : ''}
            </div>
        </>
    );
};

export default TreeView;
