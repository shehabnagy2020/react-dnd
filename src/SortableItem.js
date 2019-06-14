import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd';
import * as $ from 'jquery'
import { TouchableOpacity, TextInput, Text, Switch, View } from 'react-native-web'
import CustomView from './CustomView';


const SortableItem = ({ index, id, content, style, setForm, moveItem, viewList, copyItem }) => {

    const ref = useRef(null);
    let timeout;
    const [, drag] = useDrag({
        item: { type: 'sortableitem', index, id, content, style, viewList },
    })
    const [, drop] = useDrop({
        accept: 'sortableitem',
        drop: (item, monitor) => {
            clearTimeout(timeout)
        },
        hover: (item, monitor) => {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            if (dragIndex === hoverIndex) {
                clearTimeout(timeout)
                return
            }
            const hoverBoundingRect = ref.current.getBoundingClientRect()
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            if (content === 'View') {
                if (!timeout) {
                    timeout = setTimeout(() => {
                        moveItem(dragIndex, hoverIndex)
                        item.index = hoverIndex
                    }, 1000)
                    return
                }
                return
            }
            moveItem(dragIndex, hoverIndex)
            item.index = hoverIndex
        },
    })

    const handleFocus = (e) => {
        let elem = $(e.target);
        elem.addClass('active').siblings().removeClass('active');
        setForm({
            ...style,
            active: index
        })
    }

    const checkItem = (comp) => {
        switch (comp) {
            case 'Button':
                return <TouchableOpacity style={{ ...style }} onPress={_ => { }} ><Text style={{ color: style.color }}>Builder</Text></TouchableOpacity>
            case 'TextInput':
                return <TextInput style={{ ...style }} value="Builder" />
            case 'Switch':
                return <Switch />
            case 'View':
                return <CustomView setForm={setForm} timeout={timeout}
                    moveItem={moveItem} copyItem={copyItem} style={{ ...style }} viewList={viewList} />
            default:
                break;
        }
    }
    drop(drag(ref))
    return (
        <div ref={ref} onClick={handleFocus}>{checkItem(content)}</div>
    )
}

export default SortableItem
