import React from 'react';
import CryptoJS from 'crypto-js';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';



class Sha256 extends React.Component {

    state = {
        isSubmitted: false,
    }

    generateCipher = (value) => {
        let cipherText = CryptoJS.SHA256(value);
        return cipherText;
    }


    handleChange = (e) => {
        this.props.onValueChange(e.target.value)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({isSubmitted: true});
    }

    render () {
        const {value, isSubmitted} = this.state;
        return (
            <div>
                <h1>SHA256 Encyption:</h1>
                <form id="sha256-form" onSubmit={this.handleSubmit}>
                    <label>Input text: <Input id="sha256-input" type="text" onChange={this.handleChange} value={this.props.inputValue}/></label>
                    <Button type="submit">Generate Cipher Text!</Button>
                </form>
                {isSubmitted &&
                    <textarea disabled value={`SHA256 Encryption: ${this.generateCipher(value)}`} />
                }
            </div>
            
        )
    }
}

export default Sha256;