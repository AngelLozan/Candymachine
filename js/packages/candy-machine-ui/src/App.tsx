import './App.css';

import { useMemo } from 'react';
import * as anchor from '@project-serum/anchor';
import Home from './Home';
import React from "react";
import { clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Login from './Login';
// import ProtectedRoute from './ProtectedRoute';

// import Signin from './components/Signin';
// import ProtectedRoute, { ProtecteRouteProps } from './components/ProtectedRoute';
// import { useSessionContext } from "./components/SessionContext";
// import { Route, Routes } from 'react-router';

import {
  getPhantomWallet,
  getSlopeWallet,
  getSolflareWallet,
  getSolletWallet,
  getSolletExtensionWallet,
} from '@solana/wallet-adapter-wallets';

import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletDialogProvider } from '@solana/wallet-adapter-material-ui';

import { ThemeProvider, createTheme } from '@material-ui/core';



const theme = createTheme({
  palette: {
    type: 'dark',
  },
});

const getCandyMachineId = (): anchor.web3.PublicKey | undefined => {
  try {
    const candyMachineId = new anchor.web3.PublicKey(
      process.env.REACT_APP_CANDY_MACHINE_ID!,
    );

    return candyMachineId;
  } catch (e) {
    console.log('Failed to construct CandyMachineId', e);
    return undefined;
  }
};

const candyMachineId = getCandyMachineId();
const network = process.env.REACT_APP_SOLANA_NETWORK as WalletAdapterNetwork;
const rpcHost = process.env.REACT_APP_SOLANA_RPC_HOST!;
const connection = new anchor.web3.Connection(rpcHost
  ? rpcHost
  : anchor.web3.clusterApiUrl('devnet'));

const startDateSeed = parseInt(process.env.REACT_APP_CANDY_START_DATE!, 10);
const txTimeoutInMilliseconds = 30000;



const App: React.FC = () => {
  
  const endpoint = useMemo(() => clusterApiUrl(network), []);

  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSolflareWallet(),
      getSlopeWallet(),
      getSolletWallet({ network }),
      getSolletExtensionWallet({ network }),
    ],
    [],
  );

  // const [isAuth, setIsAuth] = useState(false);
  // const [sessionContext, updateSessionContext] = useSessionContext();

  // const setRedirectPath = (path: string) => {
  //   updateSessionContext({...sessionContext, redirectPath: path});
  // }

  // const defaultProtectedRouteProps: ProtectedRouteProps = {
  //   isAuthenticated: !!sessionContext.isAuthenticated,
  //   authenticationPath: '/signin',
  //   redirectPath: sessionContext.redirectPath,
  //   setRedirectPath: setRedirectPath
  // };

  return (
 
    <ThemeProvider theme={theme}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletDialogProvider>
            <Home
              candyMachineId={candyMachineId}
              connection={connection}
              startDate={startDateSeed}
              txTimeout={txTimeoutInMilliseconds}
              rpcHost={rpcHost}
            /> 
          </WalletDialogProvider>
        </WalletProvider>
      </ConnectionProvider>
    </ThemeProvider>
 
  );
};

export default App;
