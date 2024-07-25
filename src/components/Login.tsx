import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccountEffect } from 'wagmi'
import { useNavigate } from 'react-router-dom';
export default function Login() {
    const navigate = useNavigate()
    useAccountEffect({
        onConnect(data) {
            console.log('Connected!', data)
            localStorage.setItem('account', data.address)
            navigate('/')
        }
    })
    return (
        <div className="loginContainer">
            <div className="loginImg" />
            <ConnectButton />
            <div className='desc'>Please click the button to sign in with signature!</div>
        </div>
    )
}