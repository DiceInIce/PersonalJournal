
export const INITIAL_STATE = {
  isValid: {
    title: true,
    desc: true,
    date: true,
  },
  values: {
    title: undefined,
    desc: undefined,
    date: undefined,
    
  },
  isFormReadyToSubmit: false
}

export function formReducer(state, action) {
  switch (action.type) {
    case 'RESET_VALIDITY':
      return { ...state, isValid: INITIAL_STATE.isValid }
    case 'SUBMIT': {
      const titleValidity = action.payload.title?.trim().lenght
      const descValidity = action.payload.desc?.trim().lenght
      const dateValidity = action.payload.date.trim().lenght

      return {
        values: action.payload,
        isValid: { title: titleValidity, desc: descValidity, date: dateValidity },
        isFormReadyToSubmit: titleValidity && descValidity && dateValidity
      }
    }
  }
}