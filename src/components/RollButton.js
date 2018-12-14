import React from 'react'

const RollButton = ({ rollFunction }) => {
  return (
    <button className="btn btn-primary" onClick={rollFunction} style={{ width: '100%' }}>
      Roll Initiative
    </button>
  )
}

export default RollButton
