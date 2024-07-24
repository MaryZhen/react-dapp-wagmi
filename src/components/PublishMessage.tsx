import { type BaseError, useWriteContract, useAccount } from 'wagmi'
import { parseEther } from 'viem'
import contractABI from '../abi/TodoContract.json'
import { message, Input, Button, Card } from 'antd'
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
      console.log("sendmessage", result)
      message.success('send message success!')
    } catch (error) {
      console.error('error', error)
      message.error(`send message failed ${(error as BaseError)?.details}`)
    }
  }

  // 监听消息发布
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMsg(e.target.value)
  }
  
  return (
      <Card title="SendMessage">
          <div style={{marginBottom: '30px'}}>
            <Input
              value={msg} count={{
                show: true,
                max: 50,
              }}
              size='large'
              maxLength={50}
              placeholder="please input message"
              onInput={handleChange}
            ></Input>
          </div>
          <Button
            type='primary'
            loading={ isLoading }
            onClick={publishMsg}
            disabled={!isConnected || !msg}
          >
            {isPending ? 'Confirming...' : 'send message'}
          </Button>
      </Card>
  )
}

export default Todo