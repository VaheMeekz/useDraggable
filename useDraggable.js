import { useState, useEffect } from 'react'

export default function useDraggable(el) {
  const [{ dx, dy }, setOffset] = useState({ dx: 0, dy: 0 })

  useEffect(() => {
    const handleMouseDown = event => {
      const startX = event.pageX - dx
      const startY = event.pageY - dy

      const handleMouseMove = e => {
        const newDx = e.pageX - startX
        const newDy = e.pageY - startY
        setOffset({ dx: newDx, dy: newDy })
      }

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener(
        'mouseup',
        () => {
          document.removeEventListener('mousemove', handleMouseMove)
        },
        { once: true }
      )
    }

    el.current.addEventListener('mousedown', handleMouseDown)

    return () => {
      el?.current.removeEventListener('mousedown', handleMouseDown)
    }
  }, [dx, dy])

  useEffect(() => {
    el.current.style.transform = `translate3d(${dx}px, ${dy}px, 0)`
    el.current.style.transition = 'transform 300ms cubic-bezier(0, 0, 0.2, 1)'
  }, [dx, dy])
}

////////////////////////////

const DraggableCard = ({ children }) => {
  const cardRef = useRef(null)
  useDraggable(cardRef)

  return (
    <div className="card" ref={cardRef}>
      {children}
    </div>
  )
}

// Draggable Component 

....
  return (
      <DraggableCard>
        .....
      </DraggableCard>
  )
