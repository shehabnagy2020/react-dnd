import React, { useState } from 'react';
import Target from './components/Target';

const App = () => {

  const [firstList, setFirstList] = useState([
    { id: 1, content: 'item 1' },
    { id: 2, content: 'item 2' },
    { id: 3, content: 'item 3' },
    { id: 4, content: 'item 4' },
    { id: 5, content: 'item 5' },
  ])

  const [secondList, setSecondList] = useState([{ id: 6, content: 'item 6' }]);

  const handleDelete = (comp) => {
    if (firstList.find(elem => elem.id === comp.id)) {
      setFirstList(
        firstList.filter(item => item.id !== comp.id)
      );
      setSecondList([...secondList, comp])
      console.log('from first list')
    } else {
      setSecondList(
        secondList.filter(item => item.id !== comp.id)
      );
      setFirstList([...firstList, comp])
      console.log('from second list')
    }
  }

  return (
    <article className="list-container">
      <section className="list-content">
        <Target list={firstList} handleDelete={handleDelete} />
        <Target list={secondList} handleDelete={handleDelete} />
      </section>
    </article>
  )
}

export default App;
