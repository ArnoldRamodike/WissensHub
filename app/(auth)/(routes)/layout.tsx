import React from 'react'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='h-full items-center justify-center mt-20 mx-8'>
        {children}
    </div>
  )
}

export default layout