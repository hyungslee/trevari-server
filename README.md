# server

Trevari Server

## Quick Start

Get started developing...

```shell
# install dependencies
npm install

# run in development mode
npm run dev

# run tests
npm run test
```

---

## Install Dependencies

Install all package dependencies (one time operation)

```shell
npm install
```

## Run It
#### Run in *development* mode:
Runs the application is development mode. Should not be used in production

```shell
npm run dev
```

or debug it

```shell
npm run dev:debug
```

#### Run in *production* mode:

Compiles the application and starts it in production production mode.

```shell
npm run compile
npm start
```

## Test It

Run the Mocha unit tests

```shell
npm test
```

or debug them

```shell
npm run test:debug
```

## Try It
* Open you're browser to [http://localhost:5000](http://localhost:5000)
* Invoke the `/` endpoint
  ```shell
  curl http://localhost:5000/
  ```


## Debug It

#### Debug the server:

```
npm run dev:debug
```

#### Debug Tests

```
npm run test:debug
```
## Implemented Endpoints:

### Users

#### checkEmailAvailability
To check whether the email is in use before attempting to sign up
```
http://localhost:5000/users/checkEmailAvailability
```
Include the following data in the request's body:
```
{
    "email":"testemail@mail.com"
}
```
#### Sign Up
To create a new user
```
http://localhost:5000/users/signup
```
Include the following data in the request's body:
```
{
    "email":"testemail@mail.com",
    "name":"testname",
    "password":"testpw",
    "phoneNumber": 123 (has to be an integer)
}
```
#### Log In
To log in as an existing user
```
http://localhost:5000/users/login
```
Include the following data in the request's body:
```
{
    "email":"testemail@mail.com",
    "password":"testpw"
}
```

## Books
### Book Search By Title
Search books whose title contains a specific input
```
http://localhost:5000/books/searchByTitle
```
Include the following data in the request's body:
```
{
    "input":"hi"
}
```
### Book Search By ISBN
Search book whose ISBN matches the ISBN in the request's body. Only returns one book.
```
http://localhost:5000/books/searchByISBN
```
Include the following data in the request's body:
```
{
    "isbn":"1158510241 9791158510244"
}
```
### Book Search By Author
Search books by author
```
http://localhost:5000/books/searchByAuthor
```
Include the following data in the request's body:
```
{
    "input":"김"
}
```
### Get Book By its ID
Retrieve info about a book with a specifid id
```
http://localhost:5000/books/getBookById
```
Include the following data in the request's body:
```
{
    "id":0 (integer)
}
```
## Bookmarks
### Add bookmark
Add a bookmark to a book as a user
```
http://localhost:5000/bookmarks/addBookmark
```
Include the following data in the request's body:
```
{
    "bookId":0 (integer)
    "userId":0 (integer)
}
```

### Delete bookmark
Deletes the bookmark of a user
```
http://localhost:5000/bookmarks/deleteBookmark
```
Include the following data in the request's body:
```
{
    "bookmarkId":0 (integer)
    "userId":0 (integer)
}
```
### Get My Bookmarks
Get all the bookmarks for a user
```
http://localhost:5000/bookmarks/getMyBookmarks
```
Include the following data in the request's body:
```
{
    "userId":0 (integer)
}
```
## Reviews
### Add a Review
Add a review of a book
```
http://localhost:5000/reviews/addReview
```
Include the following data in the request's body:
```
{
    "userId":0 (integer),
    "bookId":0,
    "text":"this is the text of the review",
    "score":2.5 (float, scoring from 0 to 5)
}
```
### Edit a Review
Edit review of a book
```
http://localhost:5000/reviews/editReview
```
Include the following data in the request's body:
```
{
    "userId":0 (integer),
    "bookId":0,
    "text":"this is the new text of the review",
    "score":4.5 (float, scoring from 0 to 5)
}
```
### Delete a Review
To  delete the  review of a book
```
http://localhost:5000/reviews/deleteReview
```
Include the following data in the request's body:
```
{
    "userId":0 (integer),
    "bookId":0
}
```

### Get my Reviews
Get all the reviews of a user
```
http://localhost:5000/reviews/getMyReviews
```
Include the following data in the request's body:
```
{
    "userId":0 (integer)
}
```
