import { useEffect } from 'react'
import { formatEther } from 'viem'
import { readContract } from '@wagmi/core'
import contractABI from '../abi/TodoContract.json'
import { useState } from 'react'
import config from '../util/config'

export function useBalance() {
    const [balance, setBalance] = useState<string>('0')
    const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS
    function getBalance() {
        readContract(config, {
            address: contractAddress, // 合约地址
            abi: contractABI.abi, // ABI文件
            functionName: 'getBalance',
          }).then((bigNumber: any) => {
            const amount = (bigNumber === '' || bigNumber === undefined || bigNumber === null)  ? '0.00' : formatEther(bigNumber).toString();
            setBalance(amount)
          }).catch(error => {
            console.error('error', error)
          })
    }
    // 读取合约账户余额  
    useEffect(() => {
        getBalance()
  }, [contractAddress, contractABI])
    return {
        balance,
        getBalance
    }
}
export default useBalance