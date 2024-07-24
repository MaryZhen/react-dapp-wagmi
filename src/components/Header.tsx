import { ConnectButton } from '@rainbow-me/rainbowkit'

function Header() {

  return (
    <div className='header'>
      <div className='logo'>My Wagmi Project</div>
      <ConnectButton />
    </div>
  )
}

export default Header
