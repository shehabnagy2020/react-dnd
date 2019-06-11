import React from 'react';
import { DragPreviewImage, useDrag } from 'react-dnd';
import img from '../assets/logo.png';

// const itemSource = {
//     beginDrag: (props) => props.item,
//     endDrag: (props, monitor, component) => {
//         if (monitor.didDrop()) {
//             return props.handleDelete(props.item)
//         }
//     }
// }

const Item = ({ item, handleDelete }) => {

    const [{ opacity }, drag, preview] = useDrag({
        item: { data: item, type: 'item' },
        collect: (monitor, props) => {
            return {
                opacity: monitor.isDragging() ? 0 : 1
            }
        }
    })

    return (
        <>
            <DragPreviewImage src={img} connect={preview} />
            <li ref={drag} className="list-item" style={{ opacity }}>{item.content}</li>
        </>
    )
}

export default Item
