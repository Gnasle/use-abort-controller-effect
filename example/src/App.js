import React from 'react'

import useAbortControllerEffect from 'use-abort-controller-ssp'

const testRequest = async (signal) => {
  await fetch('https://random-data-api.com/api/company/random_company', {
    signal: signal
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
  // *** Please Open Your Console On Browser To See What Happened ***
}

const App = () => {
  useAbortControllerEffect([testRequest], [])
  return <></>
}

export default App
