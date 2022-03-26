# some notes

- Try to use function declaration
- Try to export postman_collection.json
- Try to use curl to implement quick validation
- In project we need to add 3 initializations
  - for git
  - for TypeScript
  - for npm

---

## Why sessions & refreshToken / accessToken ?

- if a hacker get the access token ,
  - it be valid for him only 15 min
  - we have full controll of the session , so we can delete or make it invalid
- if hacker have access to refresh token and access token
  - we have a control to delete the session , but in old approach we don't'
- hacker need to put header in the request so crsuf is mush difficult

- in old approach we can revoke the token by change user password but it rquier the old password , so if user forget it we lost because there is no way to kick the hacker out unless we make user un active
- so we need session to delete the access of the hacker when we deleting the session

## Todos

---

- [x] Do some basic search
- [x] Do some basic search
- [ ] ~~Do some basic search~~

```js
const a = "hello world";
```

### Steps to implement refreshToken & accessToken

---

- Create random access token and refresh token secret key
  - we can use
  ```js
  crypto.randomBytes(64).toString("hex");
  ```
- create JWT for refreshToken and accessToekn and send refesh as a cookie and sent access token as a json when user succesfully logged in
- verify JWT access token in headers
- create jwtRefreshTokenHandler
  - get a cookie if not exist 204
  - if exist check if it refer to active user
    - if not clear cookie and send 204
  - check if active user have this refreshToken in db
    - if not clearcookie and send 204
  - check for validation of JWT refreshToken
    - if it expire or foundUser.name not equal decodedusername clear cookie and send 403
  - then generate access token and send it to user
- handle logout
  - get a cookie if not exist return 204
  - get the user having this token in db if not exist clear cookie
  - delete refreshtoken from db
  - clear cookie

**we need to store rtoken in db cause if hacker can steal it he could get access long time**

**you need to add list of allowd origin**
