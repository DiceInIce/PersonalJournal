import { useEffect, useRef, useReducer, useState } from "react"
import { INITIAL_STATE, formReducer } from "./JournalForm.state"
import './JournalForm.css'

const JournalForm = ({ onSubmit, onClose, addItem }) => {
  const titleRef = useRef()
  const dateRef = useRef()
  const descRef = useRef()
  const textRef = useRef()
  const markRef = useRef()
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE)
  const { values, isFormReadyToSubmit } = formState
  const [closeBtn, setCloseBtn] = useState('')

  const focusError = (isValid) => {
    switch (true) {
      case !isValid.title:
        titleRef.current.focus();
        break
      case !isValid.date:
        dateRef.current.focus();
        break
      case !isValid.desc:
        descRef.current.focus();
        break
    }
  }

  useEffect(() => {
    if (isFormReadyToSubmit) {
      dispatchForm({ type: 'CLEAR' });
      onSubmit(values)
    }
  }, [isFormReadyToSubmit, values, onSubmit]);

  const onChange = (event) => {
    dispatchForm({ type: 'SET_VALUE', payload: { [event.target.name]: event.target.value } })
  }

  const addJournalItem = (event) => {
    event.preventDefault()
    focusError(formState.isValid)
    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);
    dispatchForm({ type: 'SUBMIT', payload: formProps })
  }

  useEffect(() => {
    if (formState.isFormReadyToSubmit) {
      const item = {
        title: formState.values.title,
        desc: formState.values.desc,
        date: formState.values.date,
        mark: formState.values.mark,
        text: formState.values.text
      };
      addItem(item);
      setCloseBtn(onClose)
    }
  }, [formState.isFormReadyToSubmit]);

  return (
    <form className="journal-form" onSubmit={addJournalItem}>
      <div className="journal-form__group">
        <p className="">Заголовок</p>
        <input type="text" name="title" id="title" value={values.title} ref={titleRef} placeholder="Заголовок" onChange={onChange} className="journal-form__title" />
        <p>Дата</p>
        <input type="date" name="date" id="date" value={values.data} ref={dateRef} onChange={onChange} className="journal-form__date" />
        <p>Описание</p>
        <input type="text" name="desc" id="desc" value={values.desc} ref={descRef} placeholder="Описание" onChange={onChange} className="journal-form__desc" />
        <p>Метка</p>
        <input type="text" name="mark" id="mark" value={values.mark} ref={markRef} placeholder="Метка" onChange={onChange} className="journal-form__mark" />
        <button type="submit" className="btn accent journal-form__btn" onClick={closeBtn}>Сохранить</button>
      </div>
      <div>
        <textarea type="text" name="text" id="" cols="90" rows="30" ref={textRef} value={values.text} onChange={onChange} className="journal-form__textarea"></textarea>
      </div>
    </form>
  )
}
export default JournalForm