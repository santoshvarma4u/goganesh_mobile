export default build => {
  return build.query({
    query: ({uid, page = 1, query}) => {
      return {
        url: `/payment/getUserPayments/${uid}?page=${page}${
          query ? `&${query}` : ''
        }`,
        method: 'GET',
      };
    },
  });
};
