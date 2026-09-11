import React, { useState } from 'react'

const App = () => {
 const [downloadUrl,setdownloadUrl] = useState(null)

  const handleupload = async (e)=>{
    e.preventDefault()
      const formdata = new FormData(e.target);

      const file = formdata.get("file")
      console.log(file)
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

        <input type="file" placeholder='upload your file here' name='file'/>
        <button type='submit'>Upload</button>
       </form>
         {
           downloadUrl ? <a href={downloadUrl} download>Download file</a> : ""
         }

      
    </div>
  )
}

export default App