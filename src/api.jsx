const HOST = 'https://jsonplaceholder.typicode.com'

const apiGet = (path, externaliseError = false) => {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    }

    fetch(HOST + path, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          externaliseError
            ? reject(data.error) // need to catch later if doing this
            : alert(data.error);
        } else {
          resolve(data);
        }
      });
  });
};

export default apiGet;