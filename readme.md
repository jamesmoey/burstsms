Burst SMS Test App
==================

Configuration
-------------

All configuration is manage by environment variable.

- burstsms_user - Burst SMS Username
- burstsms_password - Burst SMS Password
- bitly_token - Bitly Token

Requirement
-----------

This application has only been tested on

- NodeJS v7
- NodeJS v8

Setup
-----

Install third party dependency

```
npm install
```

Run
---

If you have Docker environment setup. Copy env.dist.ini to env.ini and
update the configuration in the file.

```
docker-compose up
```

Running on your machine directly, you need to pass in the environment
variable.

```
burstsms_user= burstsms_password= bitly_token= npm start
```

Future Todo
===========

- Message Queue to speed up the response to user. It will increase the
reliability and accountability of the application.

- When messaging become asynchronous real time feedback for user.
Notifying them that message has been sent.