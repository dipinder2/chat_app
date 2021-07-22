import {useState,useEffect} from 'react';
import io from 'socket.io-client'

const Chat = (props) => {
  	const [socket] = useState(() => io(':8000'));
 	const [msg,setMsg] = useState({"client":socket.id,"msg":""})
 	const[submitted,setSubmitted] = useState(false)
 	const [messages,setMessages] = useState([])
  useEffect(() => {
    socket.on('Welcome', data => {
    	setMsg({...msg,["client"]:socket.id})
    } )
	socket.on("newMsg",data=> {
		setMessages(messages =>{ return [...messages,data]})
	})
	//dismounting
    return () => socket.disconnect(true);
  }, []);
 
  const handleSubmit = e =>{
  	e.preventDefault();
  	socket.emit("msg",msg)
  	setSubmitted(!submitted)
  	setMsg({"client":socket.id,"msg":""})
  }


  return (
    <div className="App">
      <h1>Mern Chat</h1>
      <ul className="list" style={{display:"flex",flexDirection:"column",width:"300px", height:"400px",margin:"auto",overflow:"scroll"}}>
      {

            	messages.map(msg =>{ 
    				if(msg["client"]!==socket.id){
						return (<li 
							style={{width:"47%",height:"auto",marginTop:"5px",borderRadius:"4px",alignSelf: 'flex-start',textAlign:"center",listStyleType:"none",background:"gray",color:"white"}}>{msg.client}:<br/>{msg.msg}</li>)
    					}
            		return <li style={{width:"47%",height:"auto",marginTop:"5px",borderRadius:"4px",alignSelf: 'flex-end',textAlign:"center",listStyleType:"none",background:"green",color:"white"}}>You said:<br/>{msg.msg}</li>
            	})
       }
      </ul>
      <form onSubmit={handleSubmit}>
      <input name="msg" value={msg.msg} onChange={(e) =>setMsg({...msg, [e.target.name]:e.target.value})} type="text" />
      <input type="submit" value="send"/>
      </form>
    </div>
  )
}

export default Chat;