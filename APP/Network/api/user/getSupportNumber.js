export default build => {
  return build.query({
    query: ({uid}) => {
      return {
        url: `/users/getSupportNumber/uid/${uid}`,
        method: 'GET',
      };
    },
  });
};
