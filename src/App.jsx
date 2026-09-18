import React, { useState } from 'react'

const App = () => {
 const [downloadUrl,setdownloadUrl] = useState(null)

  const handleupload = async (e)=>{
    e.preventDefault()
      const formdata = new FormData(e.target);

      console.log(formdata)
            
      const file = formdata.get("file");
      const resolution = formdata.get("resolution");
      

      console.log(file,resolution);
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
         <select name='resolution' id='resolution'>
             <option value="Default">Default</option>
          <option value="640 x 360">640 x 360</option>
          <option value="4096 x 2160">4096 x 2160</option>
          <option value="1920 x 1080">1920 x 1080</option>
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