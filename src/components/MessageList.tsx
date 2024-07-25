// src/components/Todo.tsx
import { readContract } from '@wagmi/core'
import { useEffect, useState } from 'react'
import {  useAccount } from 'wagmi'
import config from '../util/config'
import contractABI from '../abi/TodoContract.json'
import { Table } from 'antd'
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
      render: (text) => {
        const timestamp = Number(text)
        const res = timestampToDateTime(timestamp)
        return (<span>{res}</span>)
      } ,
    },
  ];
function Todo() {
    const { isConnected, chainId } = useAccount()
    const [todoList, setTodoList] = useState<DataType[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS

    // 读取消息列表
    useEffect(() => {
      setLoading(true)
      setTodoList([])
        readContract(config, {
          address: contractAddress,
          abi: contractABI.abi,
          functionName: 'getPlayList',
        }).then(result => {
          const arr = (result as DataType[])
          console.info('读取消息列表', arr)
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
            console.info('dataSource', dataSource)
            setTodoList(dataSource)
          }
          setLoading(false)
        }).catch(error => {
          setLoading(false)
          console.error('error', error)
        })
    }, [contractAddress, isConnected, chainId])
    
    return (
        <>
        <Table loading={loading} columns={columns} dataSource={todoList} pagination={{ pageSize: 6 }} />
        </>
    )
}

export default Todo