import './CardButton.css'

const CardButton = ({ children, onClick }) => {
  return (
    <button className='card-btn' onClick={onClick}>
      {children}
    </button>
  )
}

export default CardButton