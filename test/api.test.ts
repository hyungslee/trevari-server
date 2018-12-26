import axios from 'axios';

describe('API test', async () => {

  test('baseURL response test', async () => {
    const { data } = await axios.get('http://localhost:5000');
    jest.setTimeout(10000);
    expect(data.name).toEqual('Anne');
    expect(data.message).toEqual('hi');
  });
});
