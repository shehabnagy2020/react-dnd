import React, { useState, useCallback } from 'react';
import Item from './Item';
import Container from './Container';
import { TextInput, Button, StyleSheet } from 'react-native-web'

function App() {

  const [itemList, setItemList] = useState([
    { id: 1, content: 'Button', rendered: false, style: { color: '#f00', width: '80%', margin: '1rem', padding: '10px', display: 'block' } },
    { id: 2, content: 'Switch', rendered: false, style: { width: '80%', margin: '1rem', padding: '10px', display: 'block' } },
    { id: 3, content: 'TextInput', rendered: false, style: { width: '80%', margin: '1rem', padding: '10px', color: '#f00' } },
    {
      id: 4, content: 'View', rendered: false, style: { width: '100%', backgroundColor: '#f0f', margin: '0', padding: '10px', }, inside:
        [
          // { id: 1, content: 'Button', rendered: false, style: { color: '#f00', width: '80%', margin: '1rem', padding: '10px', display: 'block' } }
        ]
    },
  ]);

  const [contList, setContList] = useState([]);

  const [form, setForm] = useState({
    width: '',
    height: '',
    margin: '',
    padding: '',
    display: '',
    color: '',
    backgroundColor: '',
    active: -1
  })

  const moveItem = useCallback(
    (dragIndex, hoverIndex) => {
      let newArray = [...contList];
      const dragItem = newArray[dragIndex];
      newArray[dragIndex] = newArray[hoverIndex];
      newArray[hoverIndex] = dragItem;
      setContList(
        newArray
      )
    },
    [contList],
  )

  const copyItem = (comp) => {
    console.log(comp)
    if (!contList.find(item => item.content === comp.content)) {
      let newComp = { ...comp };
      newComp.rendered = true;
      newComp.id = newComp.id + '1'
      setContList([...contList, newComp])
      return
    }
    console.log(comp)
    // let newCont = [...contList];
    // newCont = newCont.filter(item => item.content === comp.content)

    // setContList(newCont)
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.active !== -1) {
      let newList = [...contList];
      newList[form.active].style = form;
      setContList(newList);
    }
  }

  const renderItem = (card, index) => {
    return (
      <Item
        key={card.id}
        index={index}
        id={card.id}
        content={card.content}
        style={card.style}
        viewList={card.inside}
      />
    );
  };

  return (
    <main className="container">
      <section className="list">
        {itemList.map((t, i) => renderItem(t, i))}
      </section>

      <Container moveItem={moveItem} copyItem={copyItem} contList={contList} setForm={setForm} />

      <form className="form" onSubmit={handleSubmit}>
        <input className="form-input" placeholder="width" id="width" onChange={handleChange} value={form.width} />
        <input className="form-input" placeholder="height" id="height" value={form.height} onChange={handleChange} />
        <input className="form-input" placeholder="margin" id="margin" value={form.margin} onChange={handleChange} />
        <input className="form-input" placeholder="padding" id="padding" value={form.padding} onChange={handleChange} />
        <input className="form-input" placeholder="display" id="display" value={form.display} onChange={handleChange} />
        <input className="form-input" placeholder="color" id="color" value={form.color} onChange={handleChange} />
        <input className="form-input" placeholder="background-color" id="backgroundColor" value={form.backgroundColor} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}

export default App;
