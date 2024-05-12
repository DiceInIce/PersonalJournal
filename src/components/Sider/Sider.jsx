import React, { useEffect, useReducer, useState } from 'react'
import CardButton from '../CardButton/CardButton'
import JournalItem from '../JournalItem/JournalItem'
import './Sider.css'
import '../CardButton/CardButton.css'
import Plus from '../../images/plus.svg'
import Logo from '../../images/logo.svg'

import { formReducer, INITIAL_STATE } from '../JournalForm/JournalForm.state'
import Modal from '../Modal/Modal'
import JournalForm from '../JournalForm/JournalForm'

const Sider = ({ data, addItem, onSelectItem }) => {

  const [formValidState, setFormValidState] = useState(INITIAL_STATE)
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    let timerId;
    if (!formValidState.date || !formValidState.desc || !formValidState.title) {
      // focusError(formValidState.isValid)
      if (!formState.isValid.date || formState.isValid.desc || formState.isValid.title) {
        timerId = setTimeout(() => {
          console.log('Очистка состояния');
          setFormValidState(INITIAL_STATE);
          dispatchForm({ type: 'RESET_VALIDITY' })
        }, 2000)
      }
    }


    return () => {
      clearTimeout(timerId)
    }
  }, [formValidState])

  return (
    <div className='sider-wrapper'>
      <img src={Logo} alt="" className='sider__logo' />

      <button className='card-btn new' onClick={openModal}>
        <img src={Plus} alt="" />
        Новое воспоминание
      </button>

      <div className="sider__buttons">
        {data.map((item) => {
          return (
            <CardButton key={item.id} onClick={() => onSelectItem(item.id)}>
              <JournalItem
                title={item.title}
                date={item.date}
                desc={item.desc} />
            </CardButton>
          )
        })}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>Новое воспоминание</h2>
        <JournalForm onSubmit={dispatchForm} onClose={closeModal} addItem={addItem} />
      </Modal>
    </div>
  )
}

export default Sider