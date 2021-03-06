// Capitalize first letter of a string
export const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1)

// Generate an random numerical ID
export const setID = () =>
  parseInt(
    Math.random()
      .toString()
      .slice(2)
  )

// Dynamically label creatures based on presence of tag/number inputs
export const setLabel = (tag, number) => {
  if (tag && number) {
    return `${tag} ${number}`
  } else if (tag) {
    return tag
  } else if (number) {
    return number.toString()
  }
  return ''
}

// Ensure all initiative rolls take up two spaces
export const initiativeLength = initiative => {
  const il = initiative.toString()
  return il.length === 1 ? ` ${il}` : il
}
