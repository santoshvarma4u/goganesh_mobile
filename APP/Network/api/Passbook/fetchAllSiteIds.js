export default build => {
  return build.query({
    query: () => {
      return {
        url: '/userSiteDetails/sites/names',
        method: 'GET',
      };
    },
  });
};
