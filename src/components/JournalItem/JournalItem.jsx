import React from 'react'
import './JournalItem.css'

const JournalItem = ({ title, date, desc }) => {
  const formateDate = new Intl.DateTimeFormat('ru-RU').format(date);
  return (
    <div className='journal-item'>
      <h2 className='journal-item__header'>{title}</h2>
      <h2 className='journal-item__body'>
        <div className='journal-item__date'>{formateDate}</div>
        <div className='journal-item__text'>{desc}</div>
        <span></span>
      </h2>
    </div>
  )
}

export default JournalItem