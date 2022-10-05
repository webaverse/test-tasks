# fullstack web3 test by ivyroot

# frameworks used

Backend is an express app
Frontend is a React app made with Create React App

# run in dev

in /frontend `npm start`
in /backend `npm dev`


# run in prod

in /frontend build static site with `npm build` then serve build directory e.g. `http-server build`
in /backend `npm serve`


# caching notes
- currencies will only query the backend for best marketplace after they have been visible on the page for > 1 second
- ReactQuery will cache backend results for 5 minutes
- backend will cache coinstat lookups for 1 minute
