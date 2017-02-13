import React from 'react';
import Home from './Home';

var App = React.createClass({
  getInitialState: function () {
    return (
      {activeComponent: 'Home', activeId: null}
    );
  },
  updateActiveComponent: function (comp, id) {
    this.setState({activeComponent: comp, activeId: id})
  },
  renderProperComponent: function () {
    if(this.state.activeComponent==='Home'){
      return(<Home updateActiveComponent={this.updateActiveComponent}/>);
    } else {
      return null;
    }
  },
  render: function () {
    return(
      <div>
        {this.renderProperComponent()}
      </div>
    )
  }
});


export default App;
