export const tick = () => {
  return {
    type: 'TICK'
  }
}

export const setLevel = (id) => {
  return {
    type: 'SET_LEVEL',
    id
  }
}

export const toggleDriving = () => {
  return {
    type: 'TOGGLE_DRIVING'
  }
}
