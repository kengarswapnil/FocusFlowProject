async function loadStatus(tasks){
  try{
    const res = await fetch('http://localhost:3000/api/tasks')
    .then((res)=>res.json())
    .then((data)=>{
      let completed = data.filter((task)=>task.status === 'completed').length;
      let pending = data.filter((task)=> task.status === 'pending').length;

      document.getElementById('Completed').innerText = completed;
       document.getElementById('pending').innerText = pending;
    })

  }catch(err){
    console.log(err)
  }
}

loadStatus()