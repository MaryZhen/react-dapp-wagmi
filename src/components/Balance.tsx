import { Card } from 'antd'
import WithDraw from './WithDraw'
import {useBalance} from '../hook/useBalance'

function Todo() {
  const { balance } = useBalance()
    return (
      <Card title="Balance">
          <div style={{fontSize: '24px', fontWeight: 'bolder', marginBottom: '30px'}}>{balance}</div>
          <WithDraw />
      </Card>
        
    )
}

export default Todo
