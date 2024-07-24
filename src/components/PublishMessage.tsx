import { type BaseError, useWriteContract, useAccount } from 'wagmi'
import { parseEther } from 'viem'
import contractABI from '../abi/TodoContract.json'
import { message, Input, Button } from 'antd'
import { useState } from 'react'
function Todo() {
  const [msg, setMsg] = useState<string>('')
  const { isConnected } = useAccount()
  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS
  const [isLoading, setIsLoading] = useState<boolean>(false)
  
  const { isPending, writeContractAsync } = useWriteContract() 
  // 发布消息
  const publishMsg = async () => {
    setIsLoading(true)
    try {
      const result = await writeContractAsync({
        abi: contractABI.abi,
        address: contractAddress,
        functionName: 'published',
        args: [msg.trim()],
        value: parseEther('0.005'),
      })
      setMsg('')
      console.log("发布消息", result)
      message.success('发布消息成功!')
    } catch (error) {
      console.error('error', error)
      message.error(`发布消息失败：${(error as BaseError)?.details}`)
    }
  }

  // 监听消息发布
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMsg(e.target.value)
  }
  
  return (
      <>
        <div className="item">
        <Input value={msg} count={{
          show: true,
          max: 50,
        }} maxLength={50} placeholder="请输入消息内容" onInput={handleChange}></Input>
        <Button type='primary' loading={ isLoading } onClick={publishMsg} disabled={!isConnected || !msg}>{isPending ? '确认中...' : '发布消息'}</Button>
      </div>
      </>
  )
}

export default Todo