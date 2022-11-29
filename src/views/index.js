const allView = import.meta.glob('./*.vue', { eager: true })
export default Object.keys(allView).reduce((previousValue, currentValue) => {
    let regExp = new RegExp('\\./(.*?)\\.vue')
    let name = currentValue.replace(regExp, '$1')
    previousValue[name] = allView[currentValue].default
    return previousValue
}, {})
