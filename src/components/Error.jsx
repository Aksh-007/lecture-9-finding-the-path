import React from 'react'
import { useRouteError } from 'react-router-dom';

const Error = () => {
  const err = useRouteError();
   const {status, statusText} = err
  console.log(err)
  return (
    <div className="mt-[100px] h-[50vh]" style={{color:'white'}}>
      <h1>oops !</h1>
      <h2>Something went wrong</h2>
      <span>{status}:{statusText}</span>
    </div>
  )
}

export default Error;
