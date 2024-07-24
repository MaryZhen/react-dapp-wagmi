import {
    getDefaultConfig,
  } from '@rainbow-me/rainbowkit';
import {
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    sepolia
  } from 'wagmi/chains';
// const INFURA_PRIVATEKEY = import.meta.env.INFURA_PRIVATEKEY;

// console.info('sepolia====', sepolia)
const config: any = getDefaultConfig({
    appName: 'My Wagmi Project',
    projectId: '9320576b52fea108db7634255b1cd746',
    chains: [mainnet, polygon, optimism, arbitrum, base, sepolia],
  })
  // config.rpcUrls.eth_sepolia = `https://sepolia.infura.io/v3/${INFURA_PRIVATEKEY}`;
export default config;