import { useCallback, useEffect, useState } from "react";
import Loading from "./Loading";

const url = 'https://course-api.com/react-tours-project';
import Tours from './Tours'

const App = () => {
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours)
  }

  const fetchTours = async () => {
    setIsLoading(true)
    try {
      const resp = await fetch(url);
      const tours = await resp.json();
      setTours(tours);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchTours();
  }, []);

  if (isLoading) {
    return <main>
      <Loading />
    </main>
  }

  if (tours.length === 0) {
    return <main>
      <div className="title">
        <h2>no tours left</h2>
        <button style={{ marginTop: '2rem' }} className="btn" type="button" onClick={fetchTours}>
          refresh
        </button>
      </div>
    </main>
  }

  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
};
export default App;
