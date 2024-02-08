import { useState, useEffect } from 'react'
import data from './resources/countryData.json'
import './App.css'

function App() {

  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])
  const [displayData, setDisplayData] = useState(true)

  useEffect(()=>{
    const filteredItem = data.filter((item)=> item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setResults(filteredItem)
  },[searchTerm])

  const keyOnClick = (event) => {
    if (event.key === 'Escape') {
      setDisplayData(false);
      console.log("Escape") // Hide the displayed data on Escape key press
    }
  };

  useEffect(() => {
    setDisplayData(true);
  }, [searchTerm]);


  // Attach the event listener when the component mounts
  useEffect(() => {
    document.addEventListener('keydown', keyOnClick);
    return () => {
      document.removeEventListener('keydown', keyOnClick);
    };
  });


  return (
    <>
      <div>
        <input type="text" placeholder='' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
        <div className="display">
          {searchTerm.length>0 && displayData ?(
            results.map((item)=>(
              <p className="dataDisplay" key={item.code}>{item.name}</p>
            ))
          ):(<p>Search something...</p>)}
        </div>
      </div>
    </>
  )
}

export default App
