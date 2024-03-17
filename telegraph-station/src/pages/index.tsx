import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react'
import SideBar from '@/components/Sidebar'
import RetroTable from '@/components/Users/Table'
import InputBox from '@/components/Users/InputBox'
import Login from '../components/login'
import ReceivedMessages from '@/components/ReceivedMessages'
import BroadCasts from '@/components/BroadCasts'
import Help from '@/components/Help'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [show, setShow] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userMessages, setUserMessages] = useState({});
  const [showMessageState, setShowMessageState] = useState(false);
  const [userData, setUserData] = useState({})

  const authenticationHandler = (value: boolean) => {
    setIsAuthenticated(value);
  }

  const handleState = (value: number) => {
    setShowMessageState(false);
    setShow(value);
  }

  const handleUserMessages = (user: any) => {
    console.log("From main")
    console.log(user._id);
    setUserData(user);
    setShowMessageState(true);
  }

  const handleSetShow = () => {
    setShow(0);
    setShowMessageState(false);
  }

  return (
    <>
      {
        !isAuthenticated ? <Login isAuthenticated={isAuthenticated} setIsAuthenticated={authenticationHandler} /> : (
          <main
            className={`flex flex-row bg-[#EAD196] overflow-hidden ${inter.className}`}
          >
            <div className='w-1/4'>
              <SideBar state={show} setState={handleState} />
            </div>
            {
              showMessageState ? (
                <ReceivedMessages userData={userData} setShow={handleSetShow}/>
              ) : (
                <>

                  <div className='w-3/4 justify-center align-center items-center min-h-screen items-center overflow-hidden'>
                    {
                      show === 0 ? <RetroTable usrMsg={userData} setUsrMsg={handleUserMessages}/> : 
                      show === 1 ?
                      <InputBox /> : show === 2 ? <BroadCasts /> : <Help />
                    }
                  </div>
                </>
              )
            }

          </main>
        )
      }
    </>
  )
}
