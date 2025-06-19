import { http, createConfig } from "wagmi";
import { sepolia } from "viem/chains";
export const config = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  },
});
