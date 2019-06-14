import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd';
import * as $ from 'jquery'

const Item = ({ id, content, style, viewList }) => {

    const ref = useRef(null);
    const [, drag] = useDrag({
        item: { type: 'item', content, id, style, viewList },
    })
    drag(ref)
    return (
        <>
            {<div ref={ref} className="list-item" > {content}</div>}
        </>
    )
}

export default Item
