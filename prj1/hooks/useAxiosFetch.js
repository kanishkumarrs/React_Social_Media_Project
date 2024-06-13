import { useState, useEffect } from "react";
import axios from 'axios'

const useAxiosFetch = (dataUrl) => {
    const [data, setData]=useState([])
    const [fetchError, setFetchError]=useState(null)
  return (
    <div>useAxiosFetch</div>
  )
}

export default useAxiosFetch