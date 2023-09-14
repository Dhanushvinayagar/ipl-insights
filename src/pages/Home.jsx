import React, { useState ,useEffect} from 'react'
import axios from 'axios'
import Select from 'react-select'
import { useNavigate } from 'react-router-dom';

function Home() {
    const [data, setData] = useState([]);
    const [newdata, setNewData] = useState([]);

    const [genderData,setGenderdata] = useState("")
    const [yearData,setYeardata] = useState(0)

    const gender = [
        { value: 'men', label: 'Male' },
        { value: 'women', label: 'Female' },
      ]
    var year = []
    const yearNum =  new Date().getFullYear();
    for(var i=2020;i<=yearNum;i++){
        year.push({
            value:i,
            label:i
        });
    }

    useEffect(() => {
            const func = async()=>{
                const response = await axios.get("https://www.mockachino.com/5db99bd2-28c5-46/ipl/table")
                const ipl = response.data
                setData(ipl.points);

            }
        func()
    }, []);


    const handleGender = (e) =>{
        setGenderdata(e.value);
    }

    const handleYear = (e) =>{
        setYeardata(e.value);
    }

    const handleSubmit = () =>{
        console.log(genderData,yearData);
        const newarr= data.filter((element)=>{
            return element.IPLYear === yearData && element.Gender === genderData;
        })
        setNewData(newarr)
        console.log("new data",newdata);
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
            <Select options={gender} className='options' onChange={(e)=>handleGender(e)}/> 
        </div>
        <div className='flex select'>
            <p className='font'>
            Year:
            </p>
            <Select options={year} className='options' onChange={(e)=>handleYear(e)}/> 
        </div>
        <div>
                <button onClick={handleSubmit}>View details</button>
        </div>
      </div>
      <div className="dropdown">
                {
                    newdata.length==0 ?
                    <>
                    </>
                    :
                    (<>
                <table class="table table-bordered">
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
                                                        
                                                            <tr  key={el.TeamID} onClick={()=>handleRoute(el.TeamCode)}>
                                                                            <td >
                                                                                <img src={`${el.TeamLogo}`} />
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
