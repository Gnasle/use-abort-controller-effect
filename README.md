# use-abort-controller-ssp

> custom hook made by combine useEffect and AbortController to attach a signal property which is passed into requests and an abort() method which is whenever you want to cancel a request

[![NPM](https://img.shields.io/npm/v/use-abort-controller-ssp.svg)](https://www.npmjs.com/package/use-abort-controller-ssp) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-abort-controller-ssp
```

## Usage

```jsx
import React, { Component } from 'react'

import MyComponent from 'use-abort-controller-ssp'
import 'use-abort-controller-ssp/dist/index.css'

class Example extends Component {
  render() {
    return <MyComponent />
  }
}
```

## License

MIT © [Gnasle](https://github.com/Gnasle)
