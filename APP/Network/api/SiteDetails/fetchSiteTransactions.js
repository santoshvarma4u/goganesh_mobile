export default build => {
  return build.query({
    query: ({uid, sid}) => {
      return {
        url: `/payment/getAllPayments/bySite/${uid}/${sid}`,
        method: 'GET',
      };
    },
  });
};
