import { useState, useEffect } from "react"

export function useLocalStorage(key) {
  const [data, setData] = useState()

  useEffect(() => {
    const res = JSON.parse(localStorage.getItem(key));
    
    if (res) res.map(el => el.date = new Date(el.date))

    console.log(res)

    if (res) setData(res)
  }, [])

  const saveData = (newData) => {
    localStorage.setItem(key, JSON.stringify(newData));
    setData(newData);
    console.log(newData)
  }

  return [data, saveData]
}

