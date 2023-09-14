import React from 'react'

function Members({data,name}) {
  return (
    <div>
        <img src={data} width={"60px"} height={"50px"}/>
        <p>{name}</p>
    </div>
  )
}

export default Members
