import React, { Component } from "react"
import styled from "styled-components"

import Button from "../Component/Button/Button"
import Display from "../Component/Display/Display"

const initialState = {
    displayValues: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component {

    state = { ...initialState }

    constructor(props) {
        super(props)

        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    clearMemory() {
        this.setState({ ...initialState })
    }

    setOperation(operation) {
        if (this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true })
        } else {
            const equals = operation === '='
            const currentOperation = this.state.operation

            const values = [...this.state.values]

            try {
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
                if (isNaN(values[0]) || !isFinite(values[0])) {
                    this.clearMemory()
                    return
                }
            } catch (e) {
                values[0] = this.state.values[0]
            }

            values[1] = 0

            this.setState({
                displayValues: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
    }

    addDigit(n) {
        if (n === '.' && this.state.displayValues.includes('.')) {
            return
        }
        const clearDisplay = this.state.displayValues === '0' || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displayValues
        const displayValues = currentValue + n
        this.setState({ displayValues, clearDisplay: false })

        if (n !== '.') {
            const i = this.state.current
            const newValue = parseFloat(displayValues)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({ values })
            console.log(values)
        }
    }

    render() {
        return (
            <Container>
                <h2>Calculadora</h2>
                <div className="calculator">
                    <Display value={this.state.displayValues} />
                    <Button label="AC" click={this.clearMemory} triple />
                    <Button label="/" click={this.setOperation} operator />
                    <Button label="7" click={this.addDigit} />
                    <Button label="8" click={this.addDigit} />
                    <Button label="9" click={this.addDigit} />
                    <Button label="*" click={this.setOperation} operator />
                    <Button label="4" click={this.addDigit} />
                    <Button label="5" click={this.addDigit} />
                    <Button label="6" click={this.addDigit} />
                    <Button label="-" click={this.setOperation} operator />
                    <Button label="1" click={this.addDigit} />
                    <Button label="2" click={this.addDigit} />
                    <Button label="3" click={this.addDigit} />
                    <Button label="+" click={this.setOperation} operator />
                    <Button label="0" click={this.addDigit} double />
                    <Button label="." click={this.addDigit} />
                    <Button label="=" click={this.setOperation} operator />
                </div>
            </Container >
        )
    }
}

const Container = styled.div`
    font-family: 'Roboto', monospace;

    display: flex;
    flex-direction: Column;
    justify-content: center;
    height: 98vh;
    align-items: center;
    align-text: center;
    background-color: #c1c1c1;

    .calculator {
        display: grid;
        justify-content: center;

        height: 320px;
        width: 235px;
        border-radius: 10px;
        overflow: hidden;

        grid-template-columns: repeat(4, 25%);
        gri-template-rows: 1 fr 48px 48px 48px 48px 48px;
    }
`