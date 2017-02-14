## Step 1: Setup the react app.

Fork the zootopia repository from fresh5447/zootopia to your GitHub account.
Clone from your fork of the zootopia repo. `git clone <url>`
checkout the react-start branch `git checkout react-start`
in your terminal run `npm install` to install all prior dependencies
create a react app: `create-react-app client` -this will put all the react files into the directory client
delete the unneeded files that were created by `create-react-app`, leave only index.js and index.css
commit this step to GitHub. --when committing DOUBLECHECK you are in the root of your project
`git status` -shows what files need to be committed
`git add -A` -adds all current files
`git commit -m "(write a description of what you just did)"`-commits your code to GitHub


## Step 2: Build out App
Create an App file `App.js` within src directory
you can either right click on the src directory in atom and choose create file or
within the src directory in your terminal you can run `touch App.js`
import React   `import React from 'react'` - put './(file name)' when importing your own files
Create a stateful component that is meant to display the desired view
`var App = React.createClass({})`
  and will keep track of the desired view through a state variable
  ```
    getInitialState: function () {
      return (
        {activeComponent: 'Home', activeId: null}
      );
    },

  ```
the state variable that keeps track of the active view is `activeComponent`
`activeId` is for keeping track of which animal is going to be updated

Create a function `updateActiveComponent` that will change the current state
`this.setState({})`
Commit changes to GitHub

Create a function `renderProperComponent` that uses the activeComponent state variable to determine which component to return based on conditional statements
```
  if(this.state.activeComponent==='Home'){
    return(<Home updateActiveComponent={this.updateActiveComponent}/>);
  } else {
    return null;
  }
```
Include the output of renderProperComponent in App render function
Make sure to export App `export default App;`
import this into index.js `import App from './App';`
Commit this step to GitHub

##Step 3: Creating the HomeView
Create a Home.js file within the src directory
Create a stateless component that will render a heading, a viewAll button, and a postNew button
`<Button bsStyle="danger" onClick={ () => props.updateActiveComponent('viewAll')}>View all animals </Button>`
You will need to `import {Button} from 'react-bootstrap'` in Home.js
Then in your terminal run `npm install --save react-bootstrap` within your client directory
export Home
import Home into App
commit this step to GitHub

##Step 4: Viewing all animals
Create an AnimalsContainer.js file within the src directory
import React
import AnimalsTable
import jquery `import $ from 'jquery'`
in your terminal and within the client directory install jquery `npm install --save jquery`
Create a stateful component that will display the AnimalsTable
After declaring the state create a function `componentWillMount` that will get the animals from the server
    --componentWillMount is a special React call that runs just before render
Add a function to `getAnimalsFromServer` using a jquery ajax call
commit this step to GitHub

##Step 5: Creating the AnimalsTable
Create a new file `AnimalsTable.js` within the src directory
import React
import {Table, Button} from react-bootstrap
Create a stateless component that will return a table full of your animals
You will need to create a variable to map the array of animals and created a table row for each of the animals
```  
var Animals = props.animals.map(function (item) {
    return (<tr> <td> item.name </td> <td> item.species </td> <tr>);
```
##Step 6: Set up simultaneous server running
Create a file in Zootopia called Procfile.dev
within the file put
```
web: cd client && npm start
api: PORT=3001 npm run server
```
in the scripts object of package.json contained in zootopia add
```
"dev": "nf start -p 3000 --procfile Procfile.dev",
"server": "node server.js"
```
in package.json contained in src add  `"proxy": "http://localhost:3001/",`

##Step 7: Deleting an animals
Within Animals container create a new function called `deleteHandler` that makes a jquery ajax call
pass it the parameter id
in AnimalsTable add a button to the end of the table row that calls deleteHandler

##Step 8: posting an animal
Create a new file within src called `PostAnimalForm.js`
Create a new file within src called `PostAnimalContainer.js`

Add route for `postNew` in App that renders PostAnimalContainer

in `PostAnimalForm` import React
import Form, FormControl, FormGroup, and Button from react-bootstrap
create a stateless component that will display a form
pass onChange and onClick handlers from PostAnimalContainer to PostAnimalForm

in `PostAnimalContainer` create a stateful component
within that component create your `onChangeHandler` function and your `onClickHandler` Function
Your onChangeHandler updates the appropriate state variable
your onClick function runs a post request on your api with the state as its data
pass these as props to your PostAnimalForm

submit thi step to GitHub

##Step 9: Updating an animal
Create a new file within src called `EditAnimalForm.js`
Create a new file within src called `EditAnimalContainer.js`

Add route for `editAnimal` in App that renders EditAnimalContainer

in `EditAnimalForm` import React
import Form, FormControl, FormGroup, and Button from react-bootstrap
create a stateless component that will display a form
pass onChange and onClick handlers from EditAnimalContainer to EditAnimalForm

in `EditAnimalContainer` create a stateful component
within that component create your `onChangeHandler` function and your `onClickHandler` Function
Your onChangeHandler updates the appropriate state variable
your onClick function runs a post request on your api with the state as its data
pass these as props to your EditAnimalForm

In `AnimalsContainer` create an `updateHandler` function that will update the activeComponent to the editAnimal view with the correct id
pass the updateHandler in as a prop

commit this step to GitHub













.
