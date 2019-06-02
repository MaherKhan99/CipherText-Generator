import React from 'react';
import './App.css';
import appContext from './context';
import Dropdown from './dropdown';
import Button from '@material-ui/core/Button';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      methods: [],
      displayDropdowns: [],
      appValue: ''
    }
    this.handleAddDropdown = this.handleAddDropdown.bind(this)
    this.handleRemoveDropdown = this.handleRemoveDropdown.bind(this)
  }

  handleAddDropdown(e) {
    const {displayDropdowns} = this.state;
    this.methodChange = this.methodChange.bind(this);
    this.onAppValueChange = this.onAppValueChange.bind(this);
    this.setState({displayDropdowns: displayDropdowns.concat(<Dropdown key={displayDropdowns.length} methodChange={this.methodChange} onAppValueChange={this.onAppValueChange} />)})
  }

  handleRemoveDropdown () {
    const{methods, displayDropdowns} = this.state;
    displayDropdowns.pop();
    methods.pop();
    let newDropdowns = Array.from(displayDropdowns); //make a deep copy
    let newMethods = Array.from(methods);
    this.setState({methods: newMethods, displayDropdowns: newDropdowns}) // react does not recognize .pop as a change in the virtual dom
  }

  methodChange(newMethod) {
    const {methods} = this.state
    this.setState({methods: [...methods, newMethod]})
  }

  onAppValueChange(inputValue) {
    this.setState({appValue: inputValue})
  }

  render () {
    const {displayDropdowns} = this.state;
    return (
        <div>
          <h1>Cipher Text Generator!</h1>
          <div className="button-div">
            <Button variant="contained" color="primary" onClick={this.handleAddDropdown} id="add-button">Add Method</Button>
            {displayDropdowns.length > 0 &&
              <Button variant="contained" color="secondary" onClick={this.handleRemoveDropdown} id="remove-button">Remove Method</Button>
            }
          </div>
            <appContext.Provider value={this.state.appValue}>
              {displayDropdowns}
            </appContext.Provider>
        </div>
    );
  }
}

export default App;
