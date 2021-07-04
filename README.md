
## Installations

### Node

* For Linux:
```
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
sudo apt-get install -y nodejs
```

* For Mac:
```
brew install node
```

### MongoDB

Install the community edition [here](https://docs.mongodb.com/manual/installation/#mongodb-community-edition-installation-tutorials).


### React

```
npm install -g create-react-app
```

## Running the code

* Run Mongo daemon:
```
sudo mongod
```
Mongo will be running on port 27017.


* Run Express Backend:
* Backend will be running on port 4000
```
cd backend/
npm install
npm start
```

* Run React Frontend:
* Frontend will be running on port 3000
```
cd frontend
npm install/
npm start
```

Navigate to [http://localhost:3000/](http://localhost:3000/) in your browser.

