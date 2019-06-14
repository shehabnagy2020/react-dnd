import React, { useRef, useState } from 'react'
import { View } from 'react-native-web'
import { useDrop } from 'react-dnd';
import SortableItem from './SortableItem';

const CustomView = ({ style, setForm, moveItem, copyItem, viewList, timeout }) => {

    const ref = useRef(null);
    const [{ backgroundColor }, drop] = useDrop({
        accept: ['item', 'sortableitem'],
        drop: (item, monitor) => {
            if (!monitor.didDrop()) {
                clearTimeout(timeout)
                console.log('dropped')
            }
        },
        collect: monitor => {
            return {
                backgroundColor: monitor.isOver({ shallow: true }) ? 'lightgreen' : style.backgroundColor
            }
        }
    })

    const { active, ...myStyle } = style;
    drop(ref)

    const renderItem = (card, index) => {
        return (
            <SortableItem
                key={card.id}
                index={index}
                id={card.id}
                content={card.content}
                style={card.style}
                setForm={setForm}
                moveItem={moveItem}
            />
        );
    };

    return (
        <div ref={ref} ><View style={{ ...myStyle, backgroundColor }} >
            {viewList.map((t, i) => renderItem(t, i))}
        </View></div>
    )
}

export default CustomView
