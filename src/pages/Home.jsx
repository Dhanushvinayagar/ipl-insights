import React, { useState ,useEffect} from 'react'
import axios from 'axios'
import Select from 'react-select'
import { useNavigate } from 'react-router-dom';

function Home() {
    const [data, setData] = useState([]);
    const [newdata, setNewData] = useState([]);

    const [genderData,setGenderdata] = useState("")
    const [yearData,setYeardata] = useState(0)

    const [apiCall,setapiCall] = useState(true)

    const gender = [
        { value: 'men', label: 'Male' },
        { value: 'women', label: 'Female' },
    ]
    var [year,setYear] = useState([])
    

    useEffect(() => {
        const func = async(apiCall)=>{
            if(apiCall){
                const response = await axios.get("https://www.mockachino.com/5db99bd2-28c5-46/ipl/table")
                const ipl = response.data
                setData(ipl.points);
                console.log("api called");
                setapiCall(false)
            }
            
        }
        func(apiCall)
        console.log("api call",apiCall);
        console.log(yearData);

    }, [genderData,yearData,year,newdata]);

    const handleGender = (e) =>{
        setGenderdata(e.value);

        const s = new Set()
        data.filter(el=>{
                if(el.Gender == e.value){
                    s.add(el.IPLYear);
                }
            }
        )

        const yearSet =  [...s].sort()
        let arrayYear = []
        for(var i=0;i<yearSet.length;i++){
            arrayYear.push({
                    value:yearSet[i],
                    label:yearSet[i]
                });
        }
        setYear(arrayYear);

    }

    const handleYear = (e) =>{    
        setYeardata(e.value);
        const newarr= data.filter((element)=>{
            return element.IPLYear === yearData && element.Gender === genderData;
        })
        setNewData(newarr)
        // console.log("new data",newdata);
    }


    
    const navigate=useNavigate();

    const handleRoute = (id) =>{
        id=id.toLowerCase();
        navigate(`/${id}`)
    }


  return (
    <div>
      Home
      <div className='flex'>
        <div className='flex select'>
           <p className='font'>
            Gender:
            </p> 
            <Select options={gender} className='options' onChange={handleGender}/> 
        </div>
        <div className='flex select'>
            <p className='font'>
            Year:
            </p>
            <Select options={year} className='options' onChange={handleYear}/> 
        </div>
        

      </div>
      <div className="dropdown">
                {
                    newdata.length==0 ?(
                        <>
                        </>
                    )
                    :
                    (<>
                <table className="table table-bordered">
                     <thead>
                                <tr>
                                        <th >Logo</th>
                                        <th >Team</th>
                                        <th >P</th>
                                        <th >W</th>
                                        <th >L</th>
                                        <th >NR</th>
                                        <th >NRR</th>
                                        <th >FOR</th>
                                        <th >AGANIST</th>
                                        <th >PTS</th>
                                        <th >RECENTFORM</th>
                                </tr>
                    </thead>
                    <tbody>
                                    {    
                                        newdata.map((el,key)=>
                                                {
                                                    return(
                                                        <>
                                                        
                                                            <tr className="table-row"  key={el.TeamID} onClick={()=>handleRoute(el.TeamCode)} >
                                                                            <td className='logo'>
                                                                                <img src={`${el.TeamLogo}`} width={"50px"} height={"50px"} />
                                                                            </td>
                                                                            <td>{el.TeamCode}</td>
                                                                            <td >{el.Matches}</td>
                                                                            <td >{el.Wins}</td>
                                                                            <td >{el.Loss}</td>
                                                                            <td >{el.NoResult}</td>
                                                                            <td >{el.NetRunRate}</td>
                                                                            <td >{el.ForTeams}</td>
                                                                            <td >{el.AgainstTeam}</td>
                                                                            <td >{el.Points}</td>
                                                                            <td >{el.Performance}</td> 
                                                            </tr>    
                                                    </>
                                                    )
                                                }
                                        )
                                    }  
                                </tbody>
                        </table>
                   </>)
                }
        </div>
    </div>
  )
}

export default Home
