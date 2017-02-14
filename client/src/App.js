import React from 'react';
import Home from './Home';
import AnimalsContainer from './AnimalsContainer';
import PostAnimalContainer from './PostAnimalContainer';

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
    if (this.state.activeComponent === 'Home') {
      return (<Home updateActiveComponent={this.updateActiveComponent} />);
    } else if (this.state.activeComponent === 'viewAll') {
      return (<AnimalsContainer updateActiveComponent={this.updateActiveComponent} />);
    } else if (this.state.activeComponent === 'postNew') {
      return (<PostAnimalContainer updateActiveComponent={this.updateActiveComponent} />);
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
