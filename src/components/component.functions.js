import React from 'react'

// Generate an 18-digit numerical ID
export const setID = () =>
  Math.random()
    .toString()
    .slice(2)

// Dynamically label creatures based on presence of tag/number inputs
export const setLabel = (tag, number) => {
  if (tag && number) {
    return `${tag} ${number}`
  } else if (tag) {
    return tag
  } else if (number) {
    return number
  }
}

// Ensure all initiative rolls take up two spaces
export const initiativeLength = initiative => {
  const il = initiative.toString()
  return il.length === 1 ? <span>&nbsp;{il}</span> : il
}
