import React, { useRef } from 'react'
import { useDrop } from 'react-dnd';
import SortableItem from './SortableItem';

const Container = ({ moveItem, copyItem, contList, setForm }) => {

    const ref = useRef(null);
    const [{ backgroundColor }, drop] = useDrop({
        accept: ['item', 'sortableitem'],
        drop: (item, monitor) => {
            if (!monitor.didDrop()) {
                if (!contList.find(comp => comp.id === item.id)) {
                    copyItem({ ...item })
                }
            }
        },
        hover: (item, monitor) => {
            if (monitor.isOver({ shallow: true })) {
            }
        },
        collect: monitor => {
            return {
                backgroundColor: monitor.isOver({ shallow: true }) ? 'lightgreen' : 'white'
            }
        }
    })

    const renderItem = (card, index) => {
        return (
            <SortableItem
                key={card.id}
                index={index}
                id={card.id}
                content={card.content}
                style={card.style}
                setForm={setForm}
                viewList={card.viewList}
                moveItem={moveItem}
                copyItem={copyItem}
            />
        );
    };
    drop(ref);
    return (
        <section ref={ref} className="list-container" style={{ backgroundColor }}>
            {contList.map((t, i) => renderItem(t, i))}
        </section>
    )
}

export default Container
