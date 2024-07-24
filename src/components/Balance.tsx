import { useCallback } from 'react'
import { formatEther } from 'viem'
import { readContract } from '@wagmi/core'
import contractABI from '../abi/TodoContract.json'
import { useState } from 'react'
import config from '../util/config'
import { Card } from 'antd'
import WithDraw from './WithDraw'

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
      <Card title="Balance">
          <div style={{fontSize: '24px', fontWeight: 'bolder', marginBottom: '30px'}}>{balance}</div>
          <WithDraw />
      </Card>
        
    )
}

export default Todo
