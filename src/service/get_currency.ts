export  async function getCurrencyService(): Promise<any>{
    //console.log('getting currency from service')
    const data = await (await fetch('https://api.exchangerate-api.com/v4/latest/USD')).json()
    return data
}