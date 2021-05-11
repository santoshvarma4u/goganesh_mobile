import react, {useState} from 'react';

export default useAPI = apiFunction => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const request = async () => {
    setLoading(true);
    const response = await apiFunction();
    setLoading(false);

    if (!response.ok) {
      return setError(true);
    }

    setError(false);
    console.log(response.data.details.data);
    setData(response.data.details.data);
  };

  return {request, data, error, loading};
};
