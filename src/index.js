import { useEffect } from 'react'
import PropTypes from 'prop-types'

/**
 * Invoke callbacks with params in dependencies and attach signal to the request.
 * Return a list of abortController.
 * @constructor
 * @param {Array} callbacks - The array contains api requests .
 * @param {Array} dependencies - The params of above requests .
 * @param {Object} signal - The controller object that allows you to abort one or more Web requests as and when desired
 */
const handleOnAttachSignalToFunctions = (callbacks, dependencies) => {
  return callbacks.map((func) => {
    // * Create abort controller signal
    // eslint-disable-next-line no-undef
    const abortController = new AbortController()
    const signal = abortController.signal

    if (typeof func !== 'function') return new Error('Expect a function')
    if (dependencies.length > 0) {
      const [params] = dependencies
      func(params, signal)
    } else {
      func(signal)
    }
    return abortController
  })
}

/**
 * Custom Hook To Make API Request Attach With AbortController Signal To Prevent Memory Leaks
 * @constructor
 * @param {Array} callbacks - The array contains api requests.
 * @param {Array} dependencies - The array contain params of above requests.
 * @param {Boolean} isSetTimeout - The boolean flag to determine we should wrap callback inside a timer
 * @param {Number} milliseconds - The Number of milliseconds to wait before executing.
 */
const useAbortControllerEffect = (
  callbacks = [],
  dependencies = [],
  isSetTimeout = false,
  milliseconds = 1
) => {
  useEffect(() => {
    // * Check if callback is empty
    if (callbacks.length <= 0) {
      return
    }

    let callbackWithTimeout, abortControllers
    // * Attach a signal to a request to an API
    if (isSetTimeout) {
      callbackWithTimeout = setTimeout(() => {
        abortControllers = handleOnAttachSignalToFunctions(
          callbacks,
          dependencies
        )
      }, milliseconds)
    } else {
      abortControllers = handleOnAttachSignalToFunctions(
        callbacks,
        dependencies
      )
    }

    // * Cancel Subscription
    return () => {
      if (abortControllers) {
        abortControllers.forEach((c) => {
          c.abort()
        })
      }
      clearTimeout(callbackWithTimeout)
    }
  }, dependencies)
}

useAbortControllerEffect.propTypes = {
  callbacks: PropTypes.array,
  dependencies: PropTypes.array,
  isSetTimeout: PropTypes.bool,
  milliseconds: PropTypes.number
}

export default useAbortControllerEffect
