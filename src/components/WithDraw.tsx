import { message, Button, Spin } from 'antd'
import { type BaseError, useAccount } from 'wagmi'
import { writeContract, waitForTransactionReceipt } from '@wagmi/core'
import contractABI from '../abi/TodoContract.json'
import config from '../util/config'
import { useState } from 'react'

function WithDraw() {
    const { isConnected } = useAccount()
    const [isWithdraw, setIsWithdraw] = useState<boolean>(false)
    const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS
    if (!isConnected) {
      return <></>
    }
    // 我要提款
    const getWithdraw = async () => {
        setIsWithdraw(true)
      try {
        const result = await writeContract(config, {
          abi: contractABI.abi,
          address: contractAddress,
          functionName: 'withdraw',
        })
        console.log("发起提款", result)
        const txReceipt = await waitForTransactionReceipt(config, { hash: result })
        console.log("等待提款", txReceipt)
        if (txReceipt.status === 'success') {
            message.success('提款成功')
        }
        setIsWithdraw(false)
      } catch (error) {
        setIsWithdraw(false)
        console.error('error', error)
        message.error(`提款失败：${(error as BaseError)?.details}`)
      }
    }
    
    return (
        <>
        <Button type="primary" onClick={getWithdraw} disabled={!isConnected}>
            <Spin spinning={isWithdraw} />我要提款
        </Button>
        </>
    )
  }
  
  export default WithDraw
