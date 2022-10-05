import React, { useState, useEffect } from 'react';


export const UseOnScreen = (ref: React.RefObject<HTMLDivElement>) => {

    const [isIntersecting, setIntersecting] = useState(false)
  
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      {threshold: 0.95}
    )
  
    useEffect(() => {
        if (ref.current) {
            observer.observe(ref.current)
        }
        // Remove the observer as soon as the component is unmounted
        return () => { observer.disconnect() }
    }, [])
  
    return isIntersecting
  }