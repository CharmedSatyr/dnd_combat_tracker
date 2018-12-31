export const sortCreaturesArray = array =>
  array
    .sort((a, b) => (a.name > b.name ? -1 : 1)) // by name
    .sort((a, b) => a.number && b.number && a.number - b.number) // by tag number
    .sort((a, b) => (b.advantage ? 1 : -1)) // by advantage
    .sort((a, b) => b.modifier - a.modifier) // by modifier
    .sort((a, b) => a.order - b.order) // by order

// Roll a d20 and account for modifier
export const d20 = (modifier = 0) => {
  try {
    const mod = parseInt(modifier)
    const min = 1 + mod
    const max = 20 + mod
    return Math.floor(Math.random() * (max - (min + 1)) + min)
  } catch (err) {
    console.error('d20 Error:', err)
  }
}

// Roll a d20 with advantage and account for modifier
export const d20A = (modifier = 0) => {
  const roll1 = d20(modifier)
  const roll2 = d20(modifier)
  return roll1 >= roll2 ? roll1 : roll2
}
