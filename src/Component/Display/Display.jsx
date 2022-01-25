import React from "react"
import styled from "styled-components"

export default props => (
    <Container>
        <div>{props.value}</div>
    </Container>
)

const Container = styled.div`
    grid-column: span 4;
    background-color: #0004;

    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 20px;
    font-size: 2em;
    margin-right: 1px;
`