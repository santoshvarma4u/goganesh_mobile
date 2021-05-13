import react, {useState, useEffect} from 'react';

export default useAPI = apiFunction => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const request = async () => {
    try {
      const response = await apiFunction();
      setLoading(false);
      if (!response.ok) {
        return setError(true);
      }
      setError(false);
      console.log(response.data.details.data);
      setData(response.data.details.data);
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    }
  };
  useEffect(request, []);

  return {request, data, error, loading};
};
