import React from 'react'

function Player({data}) {
  return (
    <div>
        <img src={data} width={"60px"} height={"50px"}/>
    </div>
  )
}

export default Player
