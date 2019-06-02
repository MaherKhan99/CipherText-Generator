import React from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

class CaeserCipher extends React.Component {
    state =  {
        offset: null,
        isSubmitted: false
    }

    generateCipher = (value, offset) => {
        let cipherText = "";
        for(let i = 0; i < value.length; i++) {
            let character = value[i];
            if(character.match(/[A-Za-z]/)) { 
                let code = value.charCodeAt(i);
                if((code >= 65) && (code <= 90)) {
                    character = String.fromCharCode(((code - 65 + offset) % 26) + 65);
                }
                else if ((code >= 97) && (code <= 122)) {
                    character = String.fromCharCode(((code - 97 + offset) % 26) + 97);
                }
            } 
            cipherText += character;
        } 
        return cipherText;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({isSubmitted: true})
    }

    handleValueChange = (e) => {
        this.props.onValueChange(e.target.value)
    }

    handleOffsetChange = (e) => {
        this.setState({offset: parseInt(e.target.value)})
    }

    render () {
        const {offset, isSubmitted} = this.state;
        return (
            <div>
                <h1>Caeser Cipher:</h1>
                <form id="caeser-form" onSubmit={this.handleSubmit}>
                    <label>Input text: <Input id="caeser-input2" type="text" required onChange={this.handleValueChange} value={this.props.inputValue} /></label>
                    <label>Offset: <Input id="caeser-input" type="number" required onChange={this.handleOffsetChange} /></label>
                    <Button type="submit">Generate Cipher Text!</Button>
                </form>
                {isSubmitted && 
                    <textarea 
                    disabled 
                    value={`Caeser Cipher of offset ${isNaN(offset) ? 0 : offset}: ${this.generateCipher(this.props.inputValue, offset)}`} 
                    />
                }
            </div>
        )
    }
}

export default CaeserCipher;