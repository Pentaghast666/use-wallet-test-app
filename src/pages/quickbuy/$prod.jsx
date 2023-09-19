import React from 'react'
import { useParams } from 'react-router-dom'

import constants from '../../constants.json'
import data from '../../constants/data.json'

import { useWallet } from '@txnlab/use-wallet'
import WalletConnect from '../../components/WalletConnect'

import { AiOutlineRightCircle } from 'react-icons/ai'




const ProductDetail = () => {
  const { prod } = useParams()
  // const [ productOptions, setProductOptions ] = React.useState({qty:1})

  const { activeAccount, activeAddress, signTransactions, sendTransactions, clients, getAccountInfo } = useWallet()
  const [ accInfo, setAccInfo ] = React.useState()

  const [ showConnect, setShowConnect ] = React.useState(false)


  React.useEffect(() => {
    console.log('GET ACTIVE ACC EFFECT', activeAccount)
    if (!activeAccount)
      return

    console.log(getAccountInfo)

    // setTimeout(() => {
      getAccountInfo().then(info => {
        console.log('GOT ACC INFO', info)
        setAccInfo(info)
      })
    // }, 5000)

  }, [activeAccount])

  React.useEffect(() => {
    console.log('ACC INFO EFFECT', accInfo)
  }, [accInfo])


  // Test for product
  const product = data.items.find(i => i.id == prod)
  if (!product){
    return (
      <div className='lead'>Invalid product</div>
    )
  }


  return (
    <div className='max-w-screen-lg mx-auto pt-4'>
      <div className='p-4'>

        <div className=' flex justify-end mb-2'>
          {activeAccount && (
            <button className='flex items-center' onClick={()=>setShowConnect(true)}>{activeAccount.name} - {activeAccount.address.substring(0, 6)} &nbsp; <AiOutlineRightCircle className=''/></button>
          )}
          {!activeAccount && (
            <button className='flex items-center' onClick={()=>setShowConnect(true)}>Connect &nbsp; <AiOutlineRightCircle/></button>
          )}
        </div>
      

        <div className='text-end'>
          <WalletConnect className='w-fit' showConnect={showConnect} setShowConnect={setShowConnect} />
        </div>

        
        <div className=''>
          <div className='auto-cols-min'>Address = {accInfo?.address}</div>
          <div className='auto-cols-min'>Asset Count = {accInfo?.assets?.length}</div>
        </div>

      </div>
    </div>
  )
}

export default ProductDetail