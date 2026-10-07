import React, { useState } from 'react'

const App = () => {
 const [downloadUrl,setdownloadUrl] = useState(null)

  const handleupload = async (e)=>{
    e.preventDefault()
      const formdata = new FormData(e.target);

      console.log(formdata)
            
      const file = formdata.get("file");
      const CompressionLevel = formdata.get("CompressionLevel");
      

      console.log(file,CompressionLevel);
   const data = await fetch("http://localhost:3000/api/file/compress",{
    method:"POST",
    body:formdata

   })
   const result = await data.json();
   setdownloadUrl(result.file.fileurl)
   console.log(result);
  }

  return (
    <div>
       <form action="submit" onSubmit={handleupload}>
         <select name='CompressionLevel' id='CompressionLevel'>
         
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
            <option value="VeryHigh">VeryHigh</option>
              <option value="Ultra">Ultra</option>
                <option value="Psycho">Psycho</option>
                 <option value="Psycho">Ultra Psycho</option>
        </select>
        <input type="file" placeholder='upload your file here' name='file'/>
       
        <button type='submit'>Upload</button>
       </form>
         {
           downloadUrl ? <a target='blank' href={downloadUrl} download>Download file</a> : ""
         }

      
    </div>
  )
}

export default App