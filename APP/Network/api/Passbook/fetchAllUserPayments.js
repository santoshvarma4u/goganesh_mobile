export default build => {
  return build.query({
    query: ({uid = 31, page = 1, query}) => {
      return {
        url: `/payment/${uid}?page=${page}${query ? `&${query}` : ''}`,
        method: 'GET',
      };
    },
  });
};
