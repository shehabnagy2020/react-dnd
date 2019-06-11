import React from 'react';
import { DropTarget, useDrop } from 'react-dnd';
import Item from './Item';

// const collect = (connect, monitor) => {
//     return {
//         connectDropTarget: connect.dropTarget(),
//         over: monitor.isOver()
//     }
// }

const Target = ({ list, handleDelete }) => {

    const [{ backgroundColor }, drop] = useDrop({
        accept: 'item',
        drop: (item, monitor) => {
            handleDelete(item.data)
        },
        collect: (monitor, props) => {
            return {
                backgroundColor: monitor.isOver() ? 'lightgreen' : 'transparent'
            }
        }
    })

    return (
        <ul className="list" ref={drop} style={{ backgroundColor }}>
            {list.map(item => <Item key={item.id} item={item} handleDelete={handleDelete} />)}
        </ul>
    )
}

export default Target
