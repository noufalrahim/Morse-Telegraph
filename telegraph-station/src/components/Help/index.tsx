import React from 'react';
export default function Help(){
    return(
        <div className='w-full px-16 align-center text-center justify-center flex-col py-10'>
            <h1
            className='text-3xl text-center text-black mb-5'
            >Help</h1>
            <img src={"/morseCodes.png"} alt="help" className='w-full h-auto' />
        </div>
    )
}