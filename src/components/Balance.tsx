import { useCallback } from 'react'
import { formatEther } from 'viem'
import { readContract } from '@wagmi/core'
import contractABI from '../abi/TodoContract.json'
import { useState } from 'react'
import config from '../util/config'

function Todo() {
    const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS

    const [balance, setBalance] = useState<string>('0.0')

    // 读取合约账户余额  
    useCallback(async () => {
        try {
          const bigNumber: any = await readContract(config, {
            address: contractAddress, // 合约地址
            abi: contractABI.abi, // ABI文件
            functionName: 'getBalance',
          })
          console.log('读取合约账户余额', bigNumber)
          const amount = (bigNumber === '' || bigNumber === undefined || bigNumber === null)  ? '0.0' : formatEther(bigNumber).toString();
          setBalance(amount)
        } catch (error) {
          console.error('error', error)
        }
    }, [contractAddress])
    return (
        <div>{balance}</div>
    )
}

export default Todo
