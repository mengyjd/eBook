import localforage from 'localforage'

export function setLocalForage (key, value, successcb, errorcb) {
  localforage.setItem(key, value).then(value => {
    if (successcb) successcb(value)
  }).catch(err => {
    if (errorcb) errorcb(err)
  })
}

export function getLocalForage (key, successcb, errorcb) {
  localforage.getItem(key).then(value => {
    if (successcb) successcb(value)
  }).catch(err => {
    if (errorcb) errorcb(err)
  })
}

export function removeLocalForage (key, successcb, errorcb) {
  localforage.removeItem(key, successcb, errorcb).then(value => {
    if (successcb) successcb(value)
  }).catch(err => {
    if (errorcb) errorcb(err)
  })
}

export function clearLocalForage (successcb, errorcb) {
  localforage.clear().then(() => {
    if (successcb) successcb()
  }).catch(err => {
    if (errorcb) errorcb(err)
  })
}

export function lengthLocalForage (successcb, errorcb) {
  localforage.length().then(numberOfKeys => {
    if (successcb) successcb(numberOfKeys)
  }).catch(err => {
    if (errorcb) errorcb(err)
  })
}

export function keyLocalForage (keyIndex, successcb, errorcb) {
  localforage.key(keyIndex).then(keyName => {
    if (successcb) successcb(keyName)
  }).catch(err => {
    if (errorcb) errorcb(err)
  })
}

export function keysLocalForage (successcb, errorcb) {
  localforage.keys().then(keys => {
    if (successcb) successcb(keys)
  }).catch(err => {
    if (errorcb) errorcb(err)
  })
}

export function iteratorLocalForage () {
  localforage.iterate(function (value, key, iterationNumber) {
    // console.log([key, value])
  }).then(function () {
    // console.log('Iteration has completed')
  }).catch(function (err) {
    if (err) {
    }
    // console.log(err)
  })
}
