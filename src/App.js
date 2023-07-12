import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project'
const App = () => {
  const [tours, setTours] = useState([])
  const [loading, setLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id)
    setTours(newTours)
  }

  const fetchTours = async () => {
    try {
      const response = await fetch(url)
      const tours = await response.json()
      setLoading(false)
      setTours(tours)
    } catch (error) {
      setLoading(false)
      setIsError(true)
      console.error(
        'There has been a problem with your fetch operation:',
        error
      )
    }
  }

  useEffect(() => {
    fetchTours()
  }, [])

  if (isError) {
    return (
      <div>
        <h1>Error: 404</h1>
        <h3>{isError}</h3>
      </div>
    )
  }
  if (loading) {
    return (
      <div className="loading">
        <Loading />
      </div>
    )
  }

  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>no tours left</h2>
          <button onClick={fetchTours} className="btn">
            refresh
          </button>
        </div>
      </main>
    )
  }
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  )
}

export default App
