const axios = require('axios');

describe('API test', async () => {
  test('baseURL response test', async () => {
    const { data } = await axios.get('http://localhost:5000');
    expect(data).toEqual('Hello World!');
    expect(typeof data).toEqual('string');
  });
});
