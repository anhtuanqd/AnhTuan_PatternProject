import { useEffect, useState } from 'react'

export const Debounce = (callback, timeDelay) => {
  const [debounce, setDebounce] = useState()

  useEffect(() => {
    const handleTimeout = setTimeout(() => {
      setDebounce(callback)
    }, timeDelay)

    return () => {
      clearTimeout(handleTimeout)
    }
  }, [callback, timeDelay])
  return debounce
}
