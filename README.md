# API Design for Forum App

## Requirement / User Stories
- As a user, I want to be able to Register
- As a user, I want to be able to Log In
- As a user, I want to be able to Create new Thread
- As a user, I want to be able to Create new Reply (on a Thread)
- As a user I want to be able to Update my Personal profile
- As a user, I want to be able to Save/Bookmark Threads
- As a user, I want to be able to UnSave/UnBM Threads

## Core Entity
### Users

| **name**     | **type**      |
| ------------- | ------------- |
| `_id` | `ObjectId` |
| `__v` | `Number` |
| `email` | `String` |
| `password` | `String` |
| `user_name` | `String` |
| `display_name` | `String` |
| `avatar_url` | `String?` |
| `bookmarks` | `[ObjectId(Threads)]?` |

<details open>
<summary> JSON example </summary>

```JSON
{
  "_id": "6639a3d06f5ad817adcd0e2c",
  "__v": 0,
  "email": "haikal@mail.com",
  "password": "$2b$12$UY6RrT5VbjdwpQkrBmmb7.A7OTsbjo1zvKU3FVMoJqtchKGelD8FS",
  "user_name": "haikalgakbar",
  "display_name": "haikalgakbar",
  "avatar_url": "cdn.example.com/img/1.jpg",
  "bookmarks": [
    "663734b04bebd3fa7b61d0dd",
  ],
}
```
</details>

### Threads
| **name**     | **type**      |
| ------------- | ------------- |
| `_id` | `ObjectId` |
| `__v` | `Number` |
| `sender` | `ObjectId(Users)` |
| `title` | `String` |
| `content` | `String` |
| `img` | `String?` |
| `comments` | `[ObjectId(Comments)]?` |

<details open>
<summary> JSON example </summary>

```JSON
{
  "_id": "663734b04bebd3fa7b61d0dd",
  "__v": 0,
  "sender": "66372c69cc86e6b1c94167a7",
  "title": "Ngeri! Lorem Ipsum Sit Dolor Amet",
  "content": "Lorem ipsum sit dolor amet...",
  "img": "cdn.example.com/thread/img/1.jpg",
  "comments": [
    "663734b04bebd3fa7b61d0dd",
  ],
}
```
</details>

### Comments
| **name**     | **type**      |
| ------------- | ------------- |
| `_id` | `ObjectId` |
| `__v` | `Number` |
| `sender` | `ObjectId(Users)` |
| `thread` | `ObjectId(Threads)` |
| `content` | `String` |

<details open>
<summary> JSON example </summary>

```JSON
{
  "_id": "663734b04bebd3fa7b61d0dd",
  "__v": 0,
  "sender": "66372c69cc86e6b1c94167a7",
  "thread": "66372c69cc86e6b1c94167a7",
  "content": "Lorem ipsum sit dolor amet...",
}
```
</details>

## Endpoint

### Auth
| **Name** | **Method** | **Endpoint** |
| ------------- | ------------- | ------------- |
| [Register](#register) | `POST` | `/auth/register` |
| [Login](#login) | `POST` | `/auth/login` |

### Register
<details open>
<summary> Request Body </summary>

| **Name** | **Value** | |
| ------------- | ------------- | ------------- |
| email | `String` | `required` |
| password | `String` | `required` |
| user_name | `String` | `required` |
| display_name | `String` | `required` |
</details>

<details open>
<summary> Example Request Body </summary>

```JSON
{
  "email": "haikal@mail.com",
  "password": "123",
  "user_name": "haikalgakbar",
  "display_name": "haikalgakbar",
}
```
</details>

<details open>
<summary> Response </summary>

| **Type** | **Status Code** | **Message** |
| ------------- | ------------- | ------------- |
| `Success` | `201` | `Add new user success.` |
| `Error in client` | `400` | `Invalid data.` / `Data must be string.` |
| `Error in server` | `500` | `Error from server.` |
</details>

### Login
<details open>
<summary> Request Body </summary>

| **Name** | **Value** | |
| ------------- | ------------- | ------------- |
| email | `String` | `required` |
| password | `String` | `required` |
</details>

<details open>
<summary> Example Request Body </summary>

```JSON
{
  "email": "haikal@mail.com",
  "password": "123",
}
```
</details>

<details open>
<summary> Response </summary>

| **Type** | **Status Code** | **Message** |
| ------------- | ------------- | ------------- |
| `Success` | `201` | `Login success.` |
| `Error in client` | `404` | `Incorrect email or password` |
| `Error in server` | `500` | `Error from server.` |
</details>


### Thread
| **Name** | **Method** | **Endpoint** |
| ------------- | ------------- | ------------- |
| [Create thread](#create-thread) | `POST` | `/thread` |
| [Create reply](#create-reply) | `POST` | `/thread/:id` |
### Create thread
<details open>
<summary> Request Body </summary>

| **Name** | **Value** | |
| ------------- | ------------- | ------------- |
| title | `String` | `required` |
| content | `String` | `required` |
| img | `String` |  |
</details>

<details open>
<summary> Example Request Body </summary>

```JSON
{
  "title": "Ngeri! Lorem Ipsum Sit Dolor Amet",
  "content": "Lorem ipsum sit dolor amet...",
  "img": "cdn.example.com/thread/img/1.jpg",
}
```
</details>

<details open>
<summary> Response </summary>

| **Type** | **Status Code** | **Message** |
| ------------- | ------------- | ------------- |
| `Success` | `201` | `Add new thread success.` |
| `Error in client` | `400` | `Invalid sender ID.` / `Sender not found.` / `Data must be in string.` |
| `Error in server` | `500` | `Error from server.` |
</details>

### Create reply
<details open>
<summary> Request Body </summary>

| **Name** | **Value** | |
| ------------- | ------------- | ------------- |
| content | `String` | `required` |
</details>

<details open>
<summary> Example Request Body </summary>

```JSON
{
  "content": "Lorem ipsum sit dolor amet...",
}
```
</details>

<details open>
<summary> Response </summary>

| **Type** | **Status Code** | **Message** |
| ------------- | ------------- | ------------- |
| `Success` | `201` | `Add new comment success.` |
| `Error in client` | `400` | `Invalid thread ID.` / `Invalid user ID.` / `Must include comment.` / `Comment must be in string.`|
| `Error in server` | `500` | `Error from server.` |
</details>


### User
| **Name** | **Method** | **Endpoint** |
| ------------- | ------------- | ------------- |
| [Update profile](#update-profile) | `PATCH` | `/user/:id` |
| [Bookmark thread](#bookmark-thread) | `POST` | `/user/:id/bookmarks` |
| [Remove bookmark](#remove-bookmark) | `DELETE` | `/user/:id/bookmarks` |
### Update profile
<details open>
<summary> Request Body </summary>

| **Name** | **Value** | |
| ------------- | ------------- | ------------- |
| email | `String` | |
| password | `String` | |
| user_name | `String` | |
| display_name | `String` | |
| avatar_url | `String` | |
</details>

<details open>
<summary> Example Request Body </summary>

```JSON
{
  "email": "haikalgakbar@gmail",
  "password": "123",
  "user_name": "haikalgakbar",
  "display_name": "haikalgakbar",
  "avatar_url": "cdn.example.com/img/1.jpg",
}
```
</details>

<details open>
<summary> Response </summary>

| **Result** | **Status Code** | **Message** |
| ------------- | ------------- | ------------- |
| `Success` | `201` | `Update user success.` |
| `Error in client` | `400` | `Invalid ID.` / `User not found.`|
| `Error in server` | `500` | `Error from server.` |
</details>

### Bookmark thread
<details open>
<summary> Request Body </summary>

| **Name** | **Value** | |
| ------------- | ------------- | ------------- |
| thread | `ObjectId(Thread)` | `required` |
</details>

<details open>
<summary> Example Request Body </summary>

```JSON
{
  "thread": "66372ee9ddc309fdfffa1666",
}
```
</details>

<details open>
<summary> Response </summary>

| **Type** | **Status Code** | **Message** |
| ------------- | ------------- | ------------- |
| `Success` | `201` | `Bookmark added.` |
| `Error in client` | `400` | `Invalid user id.` / `User not found.` / `Invalid thread id.` / `Thread not found`|
| `Error in server` | `500` | `Error from server.` |
</details>

### Remove bookmark
<details open>
<summary> Request Body </summary>

| **Name** | **Value** | |
| ------------- | ------------- | ------------- |
| thread | `ObjectId(Thread)` | `required` |
</details>

<details open>
<summary> Example Request Body </summary>

```JSON
{
  "thread": "66372ee9ddc309fdfffa1666",
}
```
</details>

<details open>
<summary> Response </summary>

| **Type** | **Status Code** | **Message** |
| ------------- | ------------- | ------------- |
| `Success` | `201` | `Bookmark removed.` |
| `Error in client` | `400` | `Invalid user id.` / `User not found.` / `Invalid thread id.` / `Thread not found`|
| `Error in server` | `500` | `Error from server.` |
</details>


# Other Endpoint

| **Name** | **Method** | **Endpoint** |
| ------------- | ------------- | ------------- |
| [Get all threads](#get-all-threads) | `GET` | `/api/threads` |
| [Get all users](#get-all-users) | `GET` | `/api/users`|

### Get all threads
<details open>
<summary> Example result </summary>

```JSON
[
  {
    "_id": "663efe6ebacf7217e95a3221",
    "sender": {
      "_id": "663dd5950f58423d8b9ce6a6",
      "email": "skibidi@mail.com",
      "user_name": "change password to 12345",
      "display_name": "test",
      "avatar_url": ""
    },
    "title": "Test Title",
    "content": "Test content",
    "img": "",
    "comments": [
      {
        "_id": "663f17756b0c7ed28245e02b",
        "sender": {
          "user_name": "change password to 12345",
          "display_name": "test",
          "avatar_url": ""
        },
        "content": "test comment"
      }
    ],
    "__v": 0
  }
]
```
</details>

<details open>
<summary> Response </summary>

| **Type** | **Status Code** | **Message** |
| ------------- | ------------- | ------------- |
| `Success` | `201` |  |
| `Error in server` | `500` | `Error from server.` |
</details>

### Get all users
<details open>
<summary> Example result </summary>

```JSON
[
  {
    "_id": "6639a3d06f5ad817adcd0e2c",
    "email": "haikal@mail.com",
    "password": "$2b$12$UY6RrT5VbjdwpQkrBmmb7.A7OTsbjo1zvKU3FVMoJqtchKGelD8FS",
    "user_name": "haikalgakbar",
    "display_name": "haikalgakbar",
    "avatar_url": "",
    "bookmarks": [
      {
        "_id": "663efe6ebacf7217e95a3221",
        "sender": {
          "_id": "663dd5950f58423d8b9ce6a6",
          "user_name": "change password to 12345",
          "display_name": "test",
          "avatar_url": ""
        },
        "title": "Test Title",
        "content": "Test content"
      }
    ],
    "__v": 0
  }
]
```
</details>

<details open>
<summary> Response </summary>

| **Type** | **Status Code** | **Message** |
| ------------- | ------------- | ------------- |
| `Success` | `201` |  |
| `Error in server` | `500` | `Error from server.` |
</details>