import React, { useState } from 'react'

const Demo = () => {
    let [value,setValue] = useState(1)
    
    const plus = () =>{
        // console.log("hii");
        // value+=9   
        setValue(value + 1)
        // console.log(value);
    }
    
    const minus = () =>{
        // console.log("demo");
        if (value > 1) {
            setValue(value - 1)
        }
    }

    // const fifty = () =>{
    //     // console.log("hii");
    //     // value+=9   
    //     setValue(value += 50)
    //     // console.log(value);
    // }

    
    
  return (
    <>
    <div style={{margin:'30px'}}>
    <h1>welcome to demo pages</h1>
        <button onClick={minus}>---</button>
                <h2>{value}</h2>
        <button onClick={plus}>+++</button>
        {/* <button onClick={fifty}>50+</button>
         */}
         
    </div>
  
    </>
  )
}

export default Demo
