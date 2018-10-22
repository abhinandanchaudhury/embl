This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Below you will find some information on how to perform common tasks.<br>

To start the express server run
1. Expected node version to be greater than 6, > 8 is recommended.
2. Install dependencies by running npm install
3. npm start or yarn start - to start the express server (yarn to be installed globally).
2. To run unit test run yarn test (ALL test cases are not covered due to lack of time).
3. To run test coverage by Istanabul run yarn test --coverage

The server will start by default at 8080 port if there is no node environment port set.
For local application will serve from
http://localhost:8080/

To gather important statistics during production please go to the url
[url hosted]/api/status

For local to gather important statistics please go to the url
http://localhost:8080/api/status

[TODO:]
Please note: This is for assignment purpose only and more fine tuning can be done. Containerization (docker) or Kubernatics with resource manager can be thought of for sharing resources and agent injection. Auto scaling capabilities can be configured/binded if deployed to cloud in a pool. Also, logging splunk logs and .jenkins files needs to be there so that jenkins builds run smoothly for deployment(if using jenkins). 
