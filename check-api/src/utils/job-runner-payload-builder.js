export default ({
  id,
  checkType,
  frequency,
  requestMethod,
  requestUrl,
  script,
}) => {
  if (checkType === 'api') {
    return {
      id,
      frequency,
      requestMethod,
      requestUrl,
    };
  }
  return {
    id,
    frequency,
    requestMethod,
    script,
  };
};
