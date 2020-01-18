# news-explror-api
---
This project is a graduation work in Yandex.Praktikum web-development course.
## Demo
api.nayakunin-news-explorer.ru
---
## Instalation
- To download this project on your machine run
`git clone https://github.com/nayakunin/news-explorer-api.git`
- Then run `npm install` to install all dependencies.
## Availible Scripts
- `npm run start`
Runs project without hot-reload on `http://localhost:3000`
- `npm run dev`
Runs project with hot-reload on `http://localhost:3000`
---
## API routes
These calls are **not** availible without authorization:
- **URL**
/users/me
- **Method**
`GET`
- **URL Params**
None
- **Data Params**
None
- **Success Response:**
    - **Code:** 200
    - **Content:**
        ```json
        {
            "_id": "5e20b2b5f0f0441124bc648f",
            "email" : "email@mail.ru",
            "name": "name"
        }
        ```

- **Error Response:**
    * **Code:** 404
    **Content:**
    `{ error : "User does not exist" }`
- **URL**
/articles
- **Method**
`GET`
- **URL Params**
None
- **Data Params**
`id=[integer]`
- **Success Response:**
    * **Code:** 200
    **Content:**
    ```json
    {
        "data": [
            {
                "_id": "5e216cf07abb7931ec4e1cdb",
                "keyword": "word",
                "title": "title",
                "date": "date",
                "source": "source",
                "link": "link.com",
                "image": "image.com",
                "__v": 0
            }
        ]
    }
    ```
- **URL**
/articles
- **Method**
`POST`
- **URL Params**
None
- **Data Params**
    ```json
    {
    	"keyword": [string],
    	"title": [string],
    	"text": [string],
    	"date": [string],
    	"source": [string],
    	"link": [string, link],
    	"image": [string, link]
    }
    ```
- **Success Response:**
    * **Code:** 200
    **Content:**
    ```json
    {
        "data": {
            "_id": "5e2321ee118ac73894010a5d",
            "keyword": "keyword",
            "title": "title",
            "date": "25324341",
            "source": "source",
            "link": "link.com",
            "image": "image.com",
            "__v": 0
        }
    }
    ```
- **URL**
/articles/:articleId
- **Method**
`DELETE`
- **URL Params**
`articleId=[integer]`
- **Data Params**
`id=[integer]`
- **Success Response:**
    * **Code:** 200
    **Content:**
        ```json
        {
            "data": {
                "_id": "5e2321ee118ac73894010a5d",
                "keyword": "keyword",
                "title": "title",
                "date": "25324341",
                "source": "source",
                "link": "link.com",
                "image": "image.com",
                "__v": 0
            }
        }
        ```
- **Error Response:**
    * **Code:** 404
    **Content:**
    `{ error : "Article is not found" }`
---
This calls are availible without authorization:
- **URL**
/signup
- **Method**
`POST`
- **URL Params**
None
- **Data Params**
    ```json
    {
        "email": [string, email],
        "password": [string, minlength=8],
        "name": [string, minlenght=2, maxlength=30]
    }
    ```
- **Success Response:**
    * **Code:** 200
    **Content:**
        ```json
        {
            "_id": "5e20b2b5f0f0441124bc648f",
            "email" : "email@mail.ru",
            "name": "name"
        }
        ```

- **Error Response:**
    * **Code:** 404
    **Content:**
    `{ error : "User does not exist" }`

- **URL**
/signin
- **Method**
`POST`
- **URL Params**
None
- **Data Params**
    ```json
    {
        "email": [string, email],
        "password": [string, minlength=8],
    }
    ```
- **Success Response:**
    * **Code:** 201
    **Content:**
        ```json
        {
            "user": {
                "_id": "5e231ad0b15cea255053fb9b",
                "email": "lel@mail.ru",
                "password": "$2a$10$23e1nU6/qqmF5Y1IFLZF8eVhniSErAFJ33M/l6kfZYKCP.STfvg3O",
                "name": "name",
                "__v": 0
            },
            "token": "eyJhbGciOiJIUzI1NiIsIn000CI6IkpXVCJ9.eyJfaWQiOiI1ZTIzMWFkMGIxNWNlYTI1NTA1M2ZiOWIiLCJpYXQiOjE1NzkzNjIyODUsImV4cCI6MTU3OTk2NzA4NX0.If2E8tpRI6QG2eCfgkMlejQdQFE-dzi_kl-_s2quaJI"
        }
        ```

- **Error Response:**
    * **Code:** 404
    **Content:**
    `{ error : "User does not exist" }`



