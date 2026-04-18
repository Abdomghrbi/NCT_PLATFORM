import React from 'react'
import { useRive, useStateMachineInput } from '@rive-app/react-canvas'

function Whale({ onTap }) {
  const { rive, RiveComponent } = useRive({
    src: '/whale.riv',
    stateMachines: 'State Machine 1',
    autoplay: true,
  })

  const tapInput = useStateMachineInput(rive, 'State Machine 1', 'tap')

  const handleClick = () => {
    if (tapInput) {
      tapInput.fire()
    }
    onTap()
  }

  return (
    <div 
      onClick={handleClick}
      style={{
        width: '280px',
        height: '280px',
        cursor: 'pointer',
        filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))'
      }}
    >
      <RiveComponent />
    </div>
  )
}

export default Whale
