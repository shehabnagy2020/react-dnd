import React, { useState, useCallback } from 'react';
import Item from './Item';

function App() {

  const [itemList, setItemList] = useState([
    { id: 1, content: 'Item 1' },
    { id: 2, content: 'Item 2' },
    { id: 3, content: 'Item 3' },
    { id: 4, content: 'Item 4' },
    { id: 5, content: 'Item 5' },
  ]);

  const moveItem = useCallback(
    (dragIndex, hoverIndex) => {
      let newArray = [...itemList];
      const dragItem = newArray[dragIndex];
      newArray[dragIndex] = newArray[hoverIndex];
      newArray[hoverIndex] = dragItem;
      setItemList(
        newArray
      )
    },
    [itemList],
  )

  const renderItem = (card, index) => {
    return (
      <Item
        key={card.id}
        index={index}
        id={card.id}
        content={card.content}
        moveItem={moveItem}
      />
    );
  };

  return (
    <main className="container">
      <section className="list">
        {itemList.map((t, i) => renderItem(t, i))}</section>
    </main>
  );
}

export default App;
