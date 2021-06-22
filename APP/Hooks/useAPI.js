import react, {useState, useEffect} from 'react';

export default useAPI = apiFunction => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [modified, setModified] = useState(false);
  const request = () => {
    apiFunction()
      .then(response => {
        setLoading(false);
        if (!response.ok) {
          return setError(true);
        }
        if (response.status === 304) {
          setModified(true);
        }
        setError(false);

        setData(response.data.details.data);

        setSuccess(true);
      })
      .catch(error => {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
      });
  };
  useEffect(request, []);

  return {request, data, error, loading, success, modified};
};
