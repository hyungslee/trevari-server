const axios = require('axios');

describe('users', () => {
  const randEmail = Math.random()
    .toString(36)
    .substring(7);
  test('email check after before signup', () => {
    const body = {
      email: randEmail,
    };
    axios({
      url: 'http://localhost:5000/users/email',
      method: 'get',
      data: body,
    }).then(response => {
      expect(response.data).toEqual(true);
    });
  });
  test('signup', () => {
    // jest.setTimeout(30000);
    const body = {
      email: randEmail,
      name: 'hi',
      phoneNumber: 12344,
      password: 'pw',
    };
    axios({
      url: 'http://localhost:5000/users/user',
      method: 'post',
      data: body,
    }).then(response => {
      expect(response.status).toEqual(200);
      expect(typeof response.data).toEqual('object');
      expect(response.data.id).toBeDefined();
      expect(response.data.email).toEqual(randEmail);
    });
  });
  test('email check after user signup', () => {
    const body = {
      email: randEmail,
    };
    axios({
      url: 'http://localhost:5000/users/email',
      method: 'get',
      data: body,
    }).then(response => {
      expect(response.data).toEqual(false);
    });
  });
});

describe('books', () => {
  test('search by title', () => {
    const body = {
      input: 'mundo',
    };
    axios({
      url: 'http://localhost:5000/books/search/title',
      method: 'get',
      data: body,
    }).then(response => {
      const resdata = response.data;
      expect(resdata).toBeDefined();
      expect(response.status).toEqual(200);
      resdata.each(book => {
        expect(book.title.toLowerCase()).toContain(body.input);
      });
    });
  });
  test('search by author', () => {
    const body = {
      input: 'Fernando de Rojas',
    };
    axios({
      url: 'http://localhost:5000/books/search/author',
      method: 'get',
      data: body,
    }).then(response => {
      const resdata = response.data;
      expect(resdata).toBeDefined();
      expect(response.status).toEqual(200);
      resdata.each(book => {
        expect(book.author).toEqual(body.input);
      });
    });
  });

  test('search by isbn', () => {
    const body = {
      input: '8927732081 9788927732082',
    };
    axios({
      url: 'http://localhost:5000/books/search/isbn',
      method: 'get',
      data: body,
    }).then(response => {
      const resdata = response.data;
      expect(resdata).toBeDefined();
      expect(response.status).toEqual(200);
      expect(resdata.isbn).toEqual(body.input);
    });
  });

  test('get book data  by book id', () => {
    const body = {
      id: 100,
    };
    axios({
      url: 'http://localhost:5000/books/search/isbn',
      method: 'get',
      data: body,
    }).then(response => {
      console.log(response);
      const resdata = response.data;
      expect(resdata).toBeDefined();
      expect(response.status).toEqual(200);
      expect(resdata.id).toEqual(body.id);
    });
  });
});

describe('bookmarks', () => {
  let bookmarkId;
  test('add bookmark', () => {
    const body = {
      userId: 10,
      bookId: 50,
    };
    axios
      .post('http://localhost:5000/bookmarks/bookmark', body)
      .then(response => {
        expect(response.status).toEqual(200);
        bookmarkId = response.data.id;
      });
  });
  test('get user bookmarks', () => {
    const body = {
      userId: 10,
    };
    axios
      .get('http://localhost:5000/bookmarks/my-bookmark', body)
      .then(response => {
        expect(response.status).toEqual(200);
        response.data.forEach(bookmark => {
          expect(bookmark.user_id).toEqual(body.userId);
        });
      });
  });
  test('delete bookmark', () => {
    const body = {
      userId: 10,
      bookmarkId,
    };
    axios
      .delete('http://localhost:5000/bookmarks/bookmark', body)
      .then(response => {
        expect(response.status).toEqual(200);
      });
  });
});

describe('reviews', () => {
  test('add review', () => {
    const body = {
      userId: 10,
      bookId: 50,
      text: 'like',
      score: 2.5,
    };
    axios.post('http://localhost:5000/reviews/review', body).then(response => {
      expect(response.status).toEqual(200);
      expect(response.data).toEqual(true);
    });
  });
  test('get reviews', () => {
    const body = {
      userId: 10,
    };
    axios
      .get('http://localhost:5000/reviews/my-reviews', body)
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.data).toBeDefined();
        response.data.forEach(review => {
          expect(review.user_id).toEqual(body.userId);
        });
      });
  });
  test('edit reviews', () => {
    const body = {
      userId: 10,
      bookId: 50,
      text: 'dislike',
      score: 0.0,
    };
    axios.put('http://localhost:5000/reviews/review', body).then(response => {
      expect(response.status).toEqual(200);
      expect(response.data).toEqual(true);
    });
  });
  test('delete review', () => {
    const body = {
      userId: 10,
      bookId: 50,
    };
    axios.delete('http://localhost:5000/reviews/review', body).then(response => {
      expect(response.status).toEqual(200);
      expect(response.data).toEqual(true);
    });
  });
});
