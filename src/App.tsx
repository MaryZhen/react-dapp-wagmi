import Header from './components/Header'
import WithDraw from './components/WithDraw'
import Balance from './components/Balance'
import PublishMessage from './components/PublishMessage'
import MessageList from './components/MessageList'

function App() {
  return (
    <div className="App">
      <Header />
      <WithDraw />
      <Balance />
      <PublishMessage />
      <MessageList />
    </div>
  )
}

export default App