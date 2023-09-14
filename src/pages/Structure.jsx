import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom'

// react flow---->
import 'reactflow/dist/style.css';
import ReactFlow, { Controls, Background } from 'reactflow';
import Player from './Player';
import Members from './Members';
// ----------end

function Structure() {
    
    const {id} = useParams()
    
    // react flow  ----->
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    // ---------end
    
  
    useEffect(()=>{
        const func= async(id) =>{
            const response = await axios.get("https://www.mockachino.com/5db99bd2-28c5-46/ipl/list/players")
            const players = response.data.players

            const team = players.filter(el=>el.team==id)

            const captain = team.filter(el=>el.role.includes('Captain'))

            const batsman = team.filter(el=>el.role.includes('batsman'))
            const bowler = team.filter(el=>el.role.includes('bowler'))
            const allrounder = team.filter(el=>el.role.includes('All-rounder'))
            const keeper = team.filter(el=>el.role.includes('Wicket-keeper'))

            const array = [batsman,bowler,allrounder,keeper,captain]
           
            // react flow ------->

            
            var initialNodes = [
                {
                id: '1',
                data: { label: <div>
                                    <h3>{id}</h3>
                                </div> },
                position: { x: 400, y: -40 },
                style: { width: 60, height: 70 }
                },
                {
                id: '2',
                data: { label: <div style={{"padding-right":"3px"}}>
                        <Player data={array[4][0].image} />
                       <h6>
                        Captain
                        </h6> 
                </div> },
                position: { x: 395, y: 80 },
                style:  { width: 70, height: 85 }
                },
                {
                id: '3',
                data: { label: <div>Batsmen</div> },
                position: { x: 100, y: 250 },
                style: { width: 100, height: 50 }
                },
                {
                id: '4',
                data: { label: <div>Bowler</div> },
                position: { x: 350, y: 250 },
                style: { width: 100, height: 50 }
                },
                {
                id: '5',
                data: { label: <div>All rounder</div> },
                position: { x: 600, y: 250 },
                style: { width: 100, height: 50 }
                },
                {
                id: '6',
                data: { label: <div>Wicket keeper</div> },
                position: { x: 800, y: 250 },
                style: { width: 100, height: 50 }
                }
            ];
            
            const initialEdges = [
                { id: 'e1-2', source: '1', target: '2' },
                { id: 'e2-3', source: '2', target: '3'},
                { id: 'e2-4', source: '2', target: '4'},
                { id: 'e2-5', source: '2', target: '5'},
                { id: 'e2-6', source: '2', target: '6'},
            ];
            
            var val1=-130;
            const val2=400;
            for(var i=7;i<7+array[0].length;i++){
                let obj= {
                    id: String(i),
                    data: { label:
                        <div style={{"padding-right":"3px"}}>
                            <Members data={array[0][i-7].image} name={array[0][i-7].name}/>
                        </div> },
                    position: { x: val1, y: val2 },
                    style: { width: 100, height: 100 }
                }
                initialNodes.push(obj)
                val1=val1+130
                // console.log(obj,array[0][i-7].name);
            }

            for(var j=7;j<=6+array[0].length;j++){
                const obj=  {
                    id: 'e3-'+j,
                    source: '3', 
                    target: String(j) 
                };
                initialEdges.push(obj)
                // console.log(obj);
            }
            for(var p=i;p<i+array[1].length;p++){
                let obj= {
                    id: String(p),
                    data: { label:
                        <div style={{"padding-right":"3px"}}>
                            <Members data={array[1][p-i].image} name={array[1][p-i].name}/>
                        </div> },
                    position: { x: val1, y: val2 },
                    style: { width: 100, height: 100 }
                }
                initialNodes.push(obj)
                val1=val1+130
                // console.log(obj,array[1][p-i].name);
            }

            for(var l=j;l<j+array[1].length;l++){
                const obj=  {
                    id: 'e4-'+l,
                    source: '4', 
                    target: String(l) 
                };
                initialEdges.push(obj)
                // console.log(obj);
            }

            for(i=p;i<p+array[2].length;i++){
                let obj= {
                    id: String(i),
                    data: { label:
                        <div style={{"padding-right":"3px"}}>
                            <Members data={array[2][i-p].image} name={array[2][i-p].name}/>
                        </div> },
                    position: { x: val1, y: val2 },
                    style: { width: 100, height: 100 }
                }
                initialNodes.push(obj)
                val1=val1+130
                console.log("length",array[2].length);
                console.log(obj,array[2][i-p].name);
            }

            for(j=l;j<l+array[2].length;j++){
                const obj=  {
                    id: 'e5-'+j,
                    source: '5', 
                    target: String(j) 
                };
                initialEdges.push(obj)
                console.log(j);
                console.log(obj);
            }

            for(p=i;p<i+array[3].length;p++){
                let obj= {
                    id: String(p),
                    data: { label:
                        <div style={{"padding-right":"3px"}}>
                            <Members data={array[3][p-i].image} name={array[3][p-i].name}/>
                        </div> },
                    position: { x: val1, y: val2 },
                    style: { width: 100, height: 100 }
                }
                initialNodes.push(obj)
                val1=val1+130
                console.log("length",array[3].length);
                console.log(obj,array[3][p-i].name);
            }

            for(l=j;l<j+array[3].length;l++){
                const obj=  {
                    id: 'e6-'+l,
                    source: '6', 
                    target: String(l) 
                };
                initialEdges.push(obj)
                console.log(l);
                console.log(obj);
            }
            
            setNodes(initialNodes)
            setEdges(initialEdges)

            // ------------end
        }
        func(id)
    },[])

   

    return (
            <div style={{ width: '100vw', height: '100vh' }}>

                    <ReactFlow nodes={nodes} edges={edges} fitView >
                        <Background />
                        <Controls />
                    </ReactFlow>;

            </div>
  )
}

export default Structure
