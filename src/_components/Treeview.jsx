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
     isParentExpanded = true //if the first element is opened
 }) => {

    const [isExpanded, setIsToggled] = CustomReact.useState(expanded);

    useEffect(()=>
        {
            setIsToggled(expanded)
        }, [expanded]
    );

    return (
        <>
            <div
                style={{marginLeft: isChildElement ? 16 : 4 + 'px'}}
                className={isParentExpanded ? 'nested-element' : 'nested-element collapsed'}
            >

                <span
                      className={isExpanded ? 'expander' : 'expander closed'}
                      onClick={() => setIsToggled(!isExpanded)}
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
                                expanded={isExpanded}
                                isParentExpanded={isParentExpanded && isExpanded}
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
