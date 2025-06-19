// WalletConnect.tsx
import { useConnect, useDisconnect, useAccount } from "wagmi";
import { injected } from "wagmi/connectors";
import Button from "../components/ui/Button";

export default function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div>
      {isConnected ? (
        <div>
          <p>Connected: {address}</p>
          <Button variant="danger" onClick={() => disconnect()}>Disconnect</Button>
        </div>
      ) : (
        <Button variant="primary" onClick={() => connect({ connector: injected() })}>
          Connect Wallet
        </Button>
      )}
    </div>
  );
}
