import React from 'react'
import "./index.scss"
import ReactDOM from 'react-dom'
import BasicMap from './src/router';
import { setMain } from './src/utils/main';

const render = () => {
    ReactDOM.render(<BasicMap />, document.getElementById('app-react'))
}

if (!window.__MICRO_WEB__) {
    render()
}

export const bootstrap = () => {
    console.log('bootstrap')
}

export const mount = (app) => {
    setMain(app);
    render();
    console.log('mount')
}

export const unmount = () => {
    console.log('unmount')
}