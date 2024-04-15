import React, { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleDataCount, setVisibleDataCount] = useState(20); // Initially show 20 items
  const [scrollThreshold, setScrollThreshold] = useState(100); // Threshold for fetching more data

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const newData = await response.json();
      setData(newData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleScroll = () => {
    console.log("window.innerHeight:", window.innerHeight);
    console.log("document.documentElement.scrollTop:", document.documentElement.scrollTop);
    console.log("document.documentElement.offsetHeight:", document.documentElement.offsetHeight);
    console.log("scrollThreshold:", scrollThreshold);
    if (
      window.innerHeight + document.documentElement.scrollTop + scrollThreshold >= 
      document.documentElement.offsetHeight
    ) {
      setVisibleDataCount(prevCount => prevCount + 10); // Show additional 10 items when user scrolls
    }
  };
  
 
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="App">
      <h1>Infinite Scroll Example</h1>
      <ul>
        {data.slice(0, visibleDataCount).map((item, index) => (
          <li key={index}>{item.title}</li>
        ))}
      </ul>
      {loading && <p>Loading...</p>}
    </div>
  );
}
