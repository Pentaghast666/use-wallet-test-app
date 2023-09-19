import React from 'react'
import { useWallet } from '@txnlab/use-wallet'
import { Modal, Select } from 'flowbite-react'
import Button from './Button'
// import { LiaHandPointRightSolid } from 'react-icons/lia'

// eslint-disable-next-line react/prop-types
const WalletConnect = ({className, showConnect, setShowConnect}) => {
  const { providers, activeAccount } = useWallet()
  // const [ showProviders, setShowProviders ] = React.useState(true)

  
  return (
    <>


      <Modal show={showConnect} size='md' popup onClose={()=>setShowConnect(false)}>
        <Modal.Header />
        <Modal.Body>
          <ul>
            {providers?.map(provider => {
              return (
                <>
                  <li key={provider.name} className={`my-2 p-2 ${provider.isActive?'bg-[#ec008c] rounded-lg':''}`}>
                    <div className='sm:flex sm:justify-between'>

                      <div className='flex justify-center'>
                        <img className="w-10 h-10 rounded-full" alt={`${provider.metadata.name} icon`} src={provider.metadata.icon} />
                        <span className='font-medium pl-4 pt-2'>{provider.metadata.name}</span>
                      </div>
                      
                      <div>
                        <div className='w-full sm:w-32 mt-2'>
                          {provider.isConnected && <Button onClick={provider.disconnect} className='bg-slate-500 border-slate-500'>Disconnect</Button>}
                          {!provider.isConnected && <Button onClick={provider.connect}>Connect</Button>}
                        </div>
                      </div>
                    </div>

                    <div>
                      {provider.isActive && provider.accounts.length && (
                        <Select
                          value={activeAccount?.address}
                          onChange={(e) => provider.setActiveAccount(e.target.value)}
                          className='mt-2'
                        >
                          {provider.accounts.map((account) => (
                            <option key={account.address} value={account.address} className='text-ellipsis overflow-hidden'>
                              {account.address.substring(0, 15)}
                            </option>
                          ))}
                        </Select>
                      )}
                    </div>
                    
                  </li>

                </>
              )
            })}
          </ul>

        </Modal.Body>
      </Modal>
    </>
  )
}

export default WalletConnect