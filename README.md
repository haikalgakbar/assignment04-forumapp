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
### User

| **name**     | **type**      |
| ------------- | ------------- |
| `_id` | `ObjectId` |
| `__v` | `Number` |
| `email` | `String` |
| `password` | `String` |
| `user_name` | `String` |
| `display_name` | `String` |
| `avatar_url` | `String?` |
| `bookmarks` | `[thread: ObjectId(Thread)]?` |

<details open>
<summary> BSON example </summary>

```JSON
{
  "_id": "66372c69cc86e6b1c94167a7",
  "__v": 0,
  "email": "haikal@mail.com",
  "password": "haikal123",
  "user_name": "haikalgakbar",
  "display_name": "haikalgakbar",
  "avatar_url": "cdn.example.com/img/1.jpg",
  "bookmarks": [
    "663734b04bebd3fa7b61d0dd",
  ],
}
```
</details>

### Thread
| **name**     | **type**      |
| ------------- | ------------- |
| `_id` | `ObjectId` |
| `__v` | `Number` |
| `sender` | `ObjectId(User)` |
| `title` | `String` |
| `content` | `String` |
| `img` | `String?` |
| `comments` | `[user: ObjectId(User), comment: String]?` |

<details open>
<summary> BSON example </summary>

```JSON
{
  "_id": "663734b04bebd3fa7b61d0dd",
  "__v": 0,
  "sender": "66372c69cc86e6b1c94167a7",
  "title": "Ngeri! Lorem Ipsum Sit Dolor Amet",
  "content": "Lorem ipsum sit dolor amet...",
  "img": "cdn.example.com/thread/img/1.jpg",
  "comments": [
    {
      "_id": "66373770d61386f174ef3d0a",
      "user": "66372d1bde7c834bb15f809b",
      "comment": "Lorem ipsum sit dolor amet",
    },
  ],
}
```
</details>

## Endpoint

### Auth
| **Name** | **Method** | **Endpoint** |
| ------------- | ------------- | ------------- |
| Register | `POST` | `/auth/register` |
| login | `POST` | `/auth/login` |

### Register
<details open>
<summary> Request Body </summary>

```JSON
{
  "email": "String" (required),
  "password": "String" (required),
  "user_name": "String" (required),
  "display_name": "String" (required),
}
```
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

```JSON
{
  "email": "String" (required),
  "password": "String" (required),
}
```
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
| Create thread | `POST` | `/thread` |
| Create reply | `POST` | `/thread/:id` |
### Create thread
<details open>
<summary> Request Body </summary>

```JSON
{
  "sender": "ObjectId(User)" (required),
  "title": "String" (required),
  "content": "String" (required),
}
```
</details>

<details open>
<summary> Example Request Body </summary>

```JSON
{
  "sender": "66372ee9ddc309fdfffa1666",
  "title": "Ngeri! Lorem Ipsum Sit Dolor Amet",
  "content": "Lorem ipsum sit dolor amet...",
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

```JSON
{
  "user": "ObjectId(User)" (required),
  "comment": "String" (required),
}
```
</details>

<details open>
<summary> Example Request Body </summary>

```JSON
{
  "user": "66372ee9ddc309fdfffa1666",
  "comment": "Lorem ipsum sit dolor amet...",
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
| Update profile | `PATCH` | `/user/:id` |
| Bookmark thread | `PATCH` | `/user/:id/bookmarks` |
| Remove bookmark | `PATCH` | `/user/:id/bookmarks` |
### Update profile
<details open>
<summary> Request Body </summary>

```JSON
{
  "email": "String",
  "password": "String",
  "user_name": "String",
  "display_name": "String",
  "avatar_url": "String",
}
```
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

```JSON
{
  "type": "String" (required),
  "thread": "ObjectId(Thread)" (required),
}
```
</details>

<details open>
<summary> Example Request Body </summary>

```JSON
{
  "type": "add",
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

```JSON
{
  "type": "String" (required),
  "thread": "ObjectId(Thread)" (required),
}
```
</details>

<details open>
<summary> Example Request Body </summary>

```JSON
{
  "type": "remove",
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