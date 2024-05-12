export const INITIAL_STATE = {
  isValid: {
    title: true,
    desc: true,
    date: true,
  },
  values: {
    title: '',
    desc: '',
    date: '',
    mark: '',
    text: '',
  },
  isFormReadyToSubmit: false
}

export function formReducer(state, action) {
  switch (action.type) {
    case 'SET_VALUE': return {...state, values: {
      ...state.values, ...action.payload
    }}
    case 'CLEAR': return {...state, values: INITIAL_STATE.values, isFormReadyToSubmit: false}
    case 'RESET_VALIDITY':
      return { ...state, isValid: INITIAL_STATE.isValid }
    case 'SUBMIT': {
      const titleValidity = action.payload.title?.trim().length
      const descValidity = action.payload.desc?.trim().length
      const dateValidity = action.payload.date.trim().length
      
      return {
        values: action.payload,
        ...state,
        isValid: { title: titleValidity, desc: descValidity, date: dateValidity },
        isFormReadyToSubmit: titleValidity && descValidity && dateValidity
      }
    }
  }
}
