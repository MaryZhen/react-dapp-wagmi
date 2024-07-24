// src/components/Todo.tsx
import { readContract } from '@wagmi/core'
import { useCallback, useState } from 'react'
import { type BaseError, useAccount } from 'wagmi'
import config from '../util/config'
import contractABI from '../abi/TodoContract.json'
import { message, Table } from 'antd'
import type { TableProps } from 'antd'
import { timestampToDateTime } from '../util'

interface DataType {
    id: string;
    key: string;
    author: string;
    message: number;
    timestamp: string;
  }
  
  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <span>{text.toString()}</span>,
    },
    {
      title: 'author',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'message',
      dataIndex: 'message',
      key: 'message',
    },
    {
      title: 'timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (text) => (<span>{timestampToDateTime(Number(text))}</span>),
    },
  ];
function Todo() {
    const { isConnected, chainId } = useAccount()
    const [messageApi, contextHolder] = message.useMessage()
    const [todoList, setTodoList] = useState<DataType[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS

    // 读取消息列表
    useCallback(async () => {
        setLoading(true)
        setTodoList([])
        try {
          const result = await readContract(config, {
            address: contractAddress,
            abi: contractABI.abi,
            functionName: 'getTodoList',
          })
          console.log('读取消息列表', result)
          const arr = (result as DataType[])
          if (arr && arr.length) {
            const dataSource = arr.map((item: DataType) => {
              return {
                key: item.id.toString(),
                id: item.id.toString(),
                author: item.author,
                message: item.message,
                timestamp: item.timestamp.toString(),
              }
            }).sort((a, b) => Number(b.timestamp) - Number(a.timestamp))

            setTodoList(dataSource)
          }
          setLoading(false)
        } catch (error) {
          setLoading(false)
          console.error('error', error)
          messageApi.open({
            type: 'error',
            duration: 4,
            content: `读取消息列表失败：${(error as BaseError)?.details || (error as BaseError)?.shortMessage}`,
          })
        }
    }, [])
    
    return (
        <>
        {contextHolder}
        <Table loading={loading} columns={columns} dataSource={isConnected && chainId === 1337 ? todoList : []} pagination={{ pageSize: 6 }} />
        </>
    )
}

export default Todo