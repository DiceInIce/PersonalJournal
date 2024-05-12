
import Sider from './components/Sider/Sider'

import './App.css'
import Layout from './components/Layout/Layout'
import { useEffect, useState } from 'react'
import { useLocalStorage } from './hooks/use-localstorage.hook'

const INITIAL_DATA = [{
  id: 1,
  title: 'Поход в горы',
  date: new Date(),
  text: `Горные походы открывают удивительные природные ландшафты, испытывают туристов физически и морально,
дают возможность почувствовать себя первопроходцем. У горных походов свои секреты, приобщиться к которым можно только 
в команде единомышленников и профессионалов.\n\nРазличают альпинизм и горный туризм. Если в альпинизме главная цель – покорение вершины, то горный туризм – это длительное путешествие в горах,
связанное с прохождением многочисленных препятствий. В нем огромную роль играет физическая подготовка путешественников, их выносливость,
способность переносить большие нагрузки и тяжести в условиях высокогорья. Поход по горам – это следование определенному, заранее продуманному,
маршруту через ущелья, перевалы, долины, ледники, озера и водопады. У каждого маршрута своя степень сложности,
подразумевающая преодоление разнообразных трудностей рельефа. Основная же цель в горном походе – не покорение вершин, а преодоление перевалов.\n\n
Большое значение в горном туризме придается бытовому обустройству в походе, ведь все необходимое для жизнеобеспечения группы нужно нести с собой\nв рюкзаке и вес каждого килограмма ноши на высоте ощущается особенно сильно.
Существует множество способов существенно облегчить вес рюкзака и тем самым высвободить силы для перехода.`,
  desc: 'Думал, что очень много вермени займет написание',
  mark: 'Спорт'
},
{
  id: 2,
  title: 'Новая заметка',
  date: new Date(),
  text: "Различают альпинизм и горный туризм. Если в альпинизме главная цель – покорение вершины, то горный туризм – это длительное путешествие в горах, связанное с прохождением многочисленных препятствий. В нем огромную роль играет физическая подготовка путешественников, их выносливость, способность переносить большие нагрузки и тяжести в условиях высокогорья.",
  desc: 'Создал новую заметку',
  mark: 'Разное'
}]

function App() {
  const [data, saveData] = useLocalStorage('data');
  const [items, setItems] = useState(data ||INITIAL_DATA);
  const [selectedItemId, setSelectedItemId] = useState(1);

  useEffect(() => {
    setItems(data || INITIAL_DATA);
  }, [data]);

  const addItem = function (item) {
    const newItems = [
      ...items,
      {
        text: item.text,
        title: item.title,
        date: new Date(item.date),
        mark: item.mark,
        desc: item.desc,
        id: items.length ? Math.max(...items.map(i => i.id)) + 1 : 1
      }
    ];

    setItems(newItems);
    saveData(newItems)
  }
  const handleChangeText = (newText) => {
    const updatedItems = items.map(item => {
      if (item.id === selectedItemId) {
        return { ...item, text: newText };
      }
      return item;
    });
    setItems(updatedItems);
    saveData(updatedItems)
  };

  const handleDeleteClick = () => {
    const updatedDeletedItems = items.filter(item => item.id !== selectedItemId);
    setItems(updatedDeletedItems);
    saveData(updatedDeletedItems)
  }


  return (
    <>
      <Sider data={items} addItem={addItem} onSelectItem={(itemId) => setSelectedItemId(itemId)} />
      <Layout data={items} selectedItemId={selectedItemId} handleChange={handleChangeText} handleDeleteClick={handleDeleteClick} />
    </>
  )
}


export default App
