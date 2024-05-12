import Button from '../Button/Button'
import './Layout.css'
import ArchiveIcon from '../../images/archive.svg'
import CalendarIcon from '../../images/calendar.svg'
import FolderIcon from '../../images/folder.svg'
import { useState } from 'react'


const Layout = ({ data, selectedItemId, handleChange, handleDeleteClick }) => {
  const selectedItem = selectedItemId && data.find(item => item.id === selectedItemId) || 0;

  const formattedDate = new Intl.DateTimeFormat('ru-RU').format(selectedItem.date);
  
  const [isEditing, setIsEditing] = useState(false);
  const [isActive, setIsActive] = useState('Изменить')

  const handleEditClick = () => {
    setIsEditing(true);
    setIsActive('Сохранить')
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    setIsActive('Изменить')
  };

  const handleTextareaChange = (event) => {
    handleChange(event.target.value);
  };


  return (
    <>
      {selectedItem ? (
        <div className='layout-wrapper'>
          <div className='layout__header'>
            <h1>{selectedItem.title}</h1>
            {/* <button className='btn'> */}
            <img src={ArchiveIcon} alt="" />
            {/* </button> */}
          </div>
          <div className='layout__desc'>
            <div className='desc__item'>
              <img src={CalendarIcon} alt="" />
              <p>Дата</p>
              <div>{formattedDate}</div>
            </div>
            <div className='desc__item'>
              <img src={FolderIcon} alt="" />
              <p>Метки</p>
              <div>{selectedItem.mark}</div>
            </div>
          </div>
          {isEditing ? (
            <textarea
              className='textarea'
              value={selectedItem.text}
              onChange={handleTextareaChange}
            />
          ) : (
            <pre className='layout__body' >
              {selectedItem.text}
            </pre>
          )}

          <div className="layout__footer">
            {isEditing ? (
              <Button onClick={handleSaveClick} isActive={isActive} />
            ) : (
              <Button onClick={handleEditClick} isActive={isActive} />
            )}

            <Button onClick={handleDeleteClick} isActive={'Удалить'} />
          </div>
        </div>
      ) : 
      (<div className='layout-empty'>Выберите запись или создайте новую</div>)}
    </>
  )
}

export default Layout