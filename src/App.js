
import './App.css';
import {useEffect  , useState} from "react"
import Image from './logo.jpg'
import { ReactTyped  , Typed } from "react-typed";
import {HashLoader}  from "react-spinners"; 



function App() {


  const replaceNewlinesWithBr = (text) => {
    return text.replace(/\n\s*\n/g, '<br><br>').replace(/\n/g, '<br>');
  };


  
  const [typed, setTyped] = useState(null);
  const [prompt, setprompt] = useState("")
  const [loading ,setloading]  = useState(false)
  const [strings , setstrings]  = useState(
    ["Ask me anything?"  , "Write a Story About Batman "   , " Write a javascript Program." , 
      "What is Gemini AI? "
    ]
  )
  const [useloop , setuseloop] = useState(true)

  const [speed , setspeed]  = useState(60)


  const fetchData = async(prompt)=>{
    if(loading){
      return 
    }
    setloading(true)
    const response = await fetch("http://localhost:8000/"  , {
      method : "POST" , 
      headers : {"Content-type"  : "application/json"},
      body : JSON.stringify({prompt : prompt})
    })
    const data = await response.json()

    if(data.success){

      setloading(false)
      setprompt("")
      const promptString = replaceNewlinesWithBr(data.data.result)
      
      setstrings([promptString])
    }else{
      setstrings(["Something Went Wrong!"])

    }

    setspeed(10)
    setuseloop(false)
  }


  const handleChange = (e)=>{
    setprompt(e.target.value)
  }


  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
   
        fetchData(prompt)
     
    }
  };

  const handleData  = ()=>{
  fetchData(prompt)
  }

  

  return (

    <div className=' w-screen h-screen bg-zinc-900' > 


    <div className="w-[70%]  h-full mx-auto  flex flex-col space-y-2 ">  

            <div className="logo w-full h-[10%] flex justify-center items-center  space-x-4 ">
            <img src={Image} alt="logo" srcSet="" className="w-[50px]  h-[50px] rounded-full" />
            <div className="text-white font-bold text-2xl" > AlphaBot </div> 
            </div>

            <div className="chatbox h-[75%] no-scrollbar overflow-auto   ">
              {!loading && 

              <ReactTyped strings={strings}  typedRef={setTyped} typeSpeed={speed} style={{color : "white"}}  loop={useloop}/>
            
            }


            {loading && 
            

            <div className="flex flex-col justify-center items-center h-full" > 
              <h3 className="text-white font-bold my-2  " > Generating Response ... </h3> 
            
                 <HashLoader  color="#bd51b2" />
            </div> 
            }

            </div>

            <div className="inputfield h-[10%]">



                <div className=" w-full flex  items-center "> 

                <input type="text" name="prompt" id="prompt" value={prompt}  onChange={handleChange} className='w-[90%]  py-2  px-2 
                rounded-l-lg bg-black border-2 box-border border text-white  border-r-0 focus:outline-none    ' placeholder='Message AlphaBot' style={{
                  paddingTop: "0.54rem",
                  paddingBottom:"0.55rem"
                }}   onKeyDown={handleKeyDown}/>

                <button  className='text-white enabled:py-3.5 enabled:bg-gradient-to-r from-purple-500 to-pink-500 w-[10%] focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-r-lg  text-sm px-5 py-3 text-center disabled:bg-black  disabled:border  ' onClick={handleData} disabled={ prompt.length==0 }>Send</button>

            </div>
        </div>



    </div>



     


        




    </div>
  );
}

export default App;
