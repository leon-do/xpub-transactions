const xpubs = [
'xpub6CvWX8vx5E1tLAayeLjBWgLDrd68QyuBCmxaey6oFaNCTr71au1q8pKJbHWafbetqwWGmNsMFqt6LU1bBVvi1627LGwP6tqRFGHVPfHU5C3',

]



//============================================================================




const axios = require('axios')
const fs = require('fs')


getTx(xpubs)
async function getTx(_xpubs) {
    let transactions = []

    // get list of transactions
    for (const xpub of _xpubs) {
        const response = await axios.get(`https://blockchain.info/multiaddr?active=${xpub}`)
        const txHash = response.data.txs.map(val => val.hash)
        await delay(500)
        console.log(txHash)
        transactions = transactions.concat(txHash)
    }

    // get data from each transaction
    let txData = []
    for (const transaction of transactions) {
        const response = await axios.get(`https://api.blockcypher.com/v1/btc/main/txs/${transaction}?token=09a2614082274cd0aad9d8b158991de1`)
        const data = response.data
        await delay(500)
        console.log(data)
        txData.push(data)
    }

    // write to file
    fs.writeFileSync('./output.txt', JSON.stringify(txData), 'utf8')

}


async function delay(ms){
    return new Promise (res => {
        setTimeout(() => {
            res(ms)
        }, ms)
    })
}
