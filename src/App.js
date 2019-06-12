import React, { useState, useCallback } from 'react';
import Item from './Item';

function App() {

  const [itemList, setItemList] = useState([
    { id: 1, content: 'Item 1', style: { width: '80%', margin: '1rem', padding: '10px', display: 'block' } },
    { id: 2, content: 'Item 2', style: { width: '80%', margin: '1rem', padding: '10px', display: 'block' } },
    { id: 3, content: 'Item 3', style: { width: '80%', margin: '1rem', padding: '10px', display: 'block' } },
    { id: 4, content: 'Item 4', style: { width: '80%', margin: '1rem', padding: '10px', display: 'block' } },
    { id: 5, content: 'Item 5', style: { width: '80%', margin: '1rem', padding: '10px', display: 'block' } },
  ]);

  const [form, setForm] = useState({
    width: '0',
    margin: '0',
    padding: '0',
    display: 'block',
    active: -1
  })

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
        style={card.style}
        setForm={setForm}
      />
    );
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.active !== -1) {
      let newList = [...itemList]
      newList[form.active].style = form;
      setItemList(newList)
      console.log(itemList)
    }
  }

  return (
    <main className="container">
      <section className="list">
        {itemList.map((t, i) => renderItem(t, i))}
      </section>
      <form className="form" onSubmit={handleSubmit}>
        <input className="form-input" placeholder="width" id="width" onChange={handleChange} value={form.width} />
        <input className="form-input" placeholder="margin" id="margin" value={form.margin} onChange={handleChange} />
        <input className="form-input" placeholder="padding" id="padding" value={form.padding} onChange={handleChange} />
        <input className="form-input" placeholder="display" id="display" value={form.display} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}

export default App;
