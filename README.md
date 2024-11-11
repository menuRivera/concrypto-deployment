# concrypto
Pay with Crypto is an innovative payment processing platform designed to seamlessly integrate cryptocurrency payments into any business model. Our service functions similarly to Stripe, but with a focus on supporting a wide range of cryptocurrencies across multiple blockchain networks.

Key features of Pay with Crypto:

- Multi-chain support: Accept payments from popular blockchains like Ethereum, Bitcoin, Solana, and more
- Easy integration: Simple API and SDK for quick implementation into existing systems
- Real-time conversion: Instant fiat-to-crypto conversion to protect against market volatility

With Pay with Crypto, businesses can tap into the growing cryptocurrency market without the complexities of direct blockchain integration. Our platform handles all the technical aspects, allowing you to focus on your core business while offering customers the flexibility to pay with their preferred digital assets.

## Components 
### Dashbaord 
A dashboard for users to manage their connected wallets as well as their api keys

### Payment UI
A UI for people to pay using crypto

## Todo
- [x] Api key creation
- [x] Chain management
- [x] Api key management
    - [x] chains selection
- [x] POST /api/session endpoint (to handle create session requests from the sdk)
- [ ] Notification webhook 
- [ ] Add session_type field on dashboard
- [ ] Wallets (react components)
    - [ ] evm
        - [x] Validate tx
        - [x] Fix the change-chain flow @ `use-evm-wallet.ts` hook
        - [ ] fix the add chain flow (not urgent)
        - [ ] Custom tokens
    - [x] Near
        - [x] Validate tx
        - [ ] Custom tokens
