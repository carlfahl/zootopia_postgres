## Step 1: Setup the react app.

Fork the zootopia repository from fresh5447/zootopia to your GitHub account.
Clone from your fork of the zootopia repo. `git clone <url>`
checkout the react-start branch `git checkout react-start`
create a react app: `create-react-app client` -this will put all the react files into the directory client
delete the unneeded files that were created by `create-react-app`, leave only index.js and index.css
commit this step to GitHub. --when committing doublecheck you are in the root of your project
`git status` -shows what files need to be committed
`git add -A` -adds all current files
`git commit -m "(write a description of what you just did)"`-commits your code to GitHub


## Step 2: Build out App.js
Create an App.js file `touch App.js` within src directory
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
import Home into App.js
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





.
