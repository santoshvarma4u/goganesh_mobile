export default build => {
  return build.query({
    query: ({userId}) => {
      return {
        url: `/customerChat/getCurrentSessionAndMessages/${userId}`,
        method: 'GET',
      };
    },
  });
};
