export const tick = (dt) => {
  return {
    type: 'TICK',
    dt
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
