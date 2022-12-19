import React, { useEffect, useState } from 'react';
import Cards from './Cards';
import Sector from './Sector';

const Home = () => {



  const [sectors, setSector] = useState([]);

  useEffect(() => {
    fetch(`https://todo-aplication-server.vercel.app/sectors`)
        .then(res => res.json())
        .then(data => setSector(data))
}, []);



  const handleAddText = event =>{
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const sector = form.sector.value;

  


  const service = {
    title: name,
    sector: sector
  }
  console.log(service);

  


  fetch('https://todo-aplication-server.vercel.app/message', {
    method: 'POST',
    headers: {
        'content-type': 'application/json'
    },
    body: JSON.stringify(service)
})
    .then(res => res.json())
    .then(data => {
        if(data.acknowledged){
            form.reset(); 
            
          
        }
    })
    .catch(err => console.error(err))
}


const [message, setMessage] = useState([]);

  useEffect(() => {
    fetch(`https://todo-aplication-server.vercel.app/message`)
        .then(res => res.json())
        .then(data => setMessage(data))
}, [handleAddText]);

  

const handleDelete = id =>{
  
      fetch(`https://todo-aplication-server.vercel.app/message/${id}`, {
          method: 'DELETE'
      })
      .then(res => res.json())
      .then(data => {
          if (data.deletedCount > 0){
              const remaining = message.filter(rev => rev._id !== id);
              setMessage(remaining);
          }
      })
  }



  return (
    <div>
      <h1 className='text-[#0f2c37] font-bold'>TODO Aplication</h1>
      <h2 className='' >Please enter your name and pick the Sectors you are currently involved in.</h2>
      <div className="mockup-phone border-primary mt-6">
  <div className="camera"></div> 
  <div className="display">
    <div className="artboard  phone-1  bg-[#0f2c37]">



   <form onSubmit={handleAddText}>
    <input name='name' type="text" placeholder="Name" className="input w-full max-w-xs mt-12 text-black" required />


    <label class="label">
    <span class="label-text text-white mt-2">Select one Sector</span>
    </label>
    <select name='sector' className="select w-full max-w-xs text-black ">
    {
      sectors.map(sector =><Sector
        key={sector._id}
        sector={sector}
      ></Sector>)
    }
    </select>
    

    <input type="checkbox" className="checkbox-secondary mr-2" required /><span className='text-sm'>Agree to Terms and Conditions</span> <br />

    <input type="submit" value="Save" className="btn my-3" />
    </form>
     <div>
     {
          message.map(text => <Cards
          key={text._id}
          text={text}
          handleDelete={handleDelete}
          ></Cards>)
      }
     </div>

    </div>
  </div>
</div>
    </div>
  );
};

export default Home;