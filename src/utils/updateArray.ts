export const updateArray = <T, U extends keyof T, V extends keyof T>(params: {
    array: Array<T>
    testKey: keyof T
    testValue: T[U]
    updateKey: keyof T
    updateValue: T[V]
    testFailValue?: T[V]
  }): Array<T> => {
    const {
      array,
      testKey,
      testValue,
      updateKey,
      updateValue,
      testFailValue,
    } = params
    return array.map(item => {
      if (item[testKey] === testValue) {
        item[updateKey] = updateValue
      } else if (testFailValue !== undefined) {
        item[updateKey] = testFailValue
      }
      return item
    })
  }
  