import React from 'react';
import CaeserCipher from './caeserCipher';
import Sha256 from './sha256';
import Md5 from './md5';
import Ripemd160 from './ripemd160';
import appContext from './context';

class Dropdown extends React.Component {

  state = {
    method: '',
    value: '',
    isDisabled: false
  }

  handleMethodChange = (e) => {
    this.setState({method: e.target.value})
    this.disableDropdown()
    this.props.methodChange(e.target.value)
  }

  onValueChange(inputValue) {
    this.setState({value: inputValue})
  } 
  
  disableDropdown() {
    this.setState({isDisabled: true})
  }
  
  componentDidUpdate() {
    this.props.onAppValueChange(this.state.value)
  }

  render () {
    const {method, isDisabled} = this.state;
    this.onValueChange = this.onValueChange.bind(this)
    return (
      <div>
        <select className='select-css' onChange={this.handleMethodChange} disabled={isDisabled ? true : false}>
          <option value="">Method</option>
          <option>Caeser Cipher</option>
          <option>SHA256 Encryption</option>
          <option>MD5 Encryption</option>
          <option>RIPEMD-160 Encryption</option>
        </select>
        {method === "Caeser Cipher" &&
          <appContext.Consumer>
            {value => <CaeserCipher inputValue={value} onValueChange={this.onValueChange} />}
          </appContext.Consumer>
        }
        {method === "SHA256 Encryption" &&
          <appContext.Consumer>
            {value => <Sha256 inputValue={value} onValueChange={this.onValueChange} />}
          </appContext.Consumer>
        }
        {method === "MD5 Encryption" &&
          <appContext.Consumer>
            {value => <Md5 inputValue={value} onValueChange={this.onValueChange} />}
          </appContext.Consumer>
        }
        {method === "RIPEMD-160 Encryption" &&
        <appContext.Consumer>
          {value => <Ripemd160 inputValue={value} onValueChange={this.onValueChange} />}
        </appContext.Consumer>
        }
      </div>
    )
    }
}

export default Dropdown;