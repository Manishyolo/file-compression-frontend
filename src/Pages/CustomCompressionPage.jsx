import React, { useEffect } from "react";
import { useState } from "react";

const CustomCompressionPage = () => {
  const [downloadUrl, setdownloadUrl] = useState(null);
  const [ImageConfig,setImageConfig] = useState(null);
  const [VideoConfig,setVideoConfig] = useState(null);
  const [Encoders,setEncoders] = useState([]);
  const [file,setFile] = useState(null);

  useEffect(()=>{async function fetchConfigurations(){
    const data = await fetch("http://localhost:3000/api/file/compress/custom/options")
    const result = await data.json()
    const {ImageConfig,VideoConfig} = result;
    setImageConfig(ImageConfig)
    setVideoConfig(VideoConfig)
    console.log(result);
  }
   fetchConfigurations();
},[])

console.log(ImageConfig);

   const handlefilechange = (e)=>{

    const file = e.target.files[0];
           console.log(file);
        setFile(file)
        populateControllers(file)


   }

   const populateControllers = (file)=>{
           let config
           const [type,format] = file.type.split("/");
           if(type === "image"){
             
            config = ImageConfig[format]
          
        console.log(config.encoders)
        setEncoders((prev)=>[...config.encoders]);
           }
           else if(type === "video"){
            config = VideoConfig[format]
            setEncoders((prev)=>[...config.encoders]);
            console.log(config.encoders)
           }
          console.log(type,format)
   }
  

  const handleupload = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);

    console.log(formdata);

    const file = formdata.get("file");
    const Encoder = formdata.get("Encoder");
    const Bitrate = formdata.get("Bitrate");

    console.log(file,Encoder,Bitrate);
    const data = await fetch("http://localhost:3000/api/file/compress/custom", {
      method: "POST",
      body: formdata,
    });
    const result = await data.json();
    setdownloadUrl(result.file.fileurl);
    console.log(result);
  };

  return (
    <>
      <form action="submit" onSubmit={handleupload}>
        
        {file ? (<div className="controllers">
                <label >Select an Encoder</label><br></br>
           <select id="Encoder" name="Encoder">
            {
              Encoders.map((encoder)=>(<option value={`${encoder.codec}`}>{encoder.label}</option>))
            }
          
            
          
           </select><br></br>
               <label >Select an Bitrate</label><br></br>
           <select id="Bitrate" name="Bitrate">
          
            <option value="18">18</option>
             <option value="23">23</option>
              <option value="28">28</option>
               <option value="36">36</option>
           </select><br></br>
         </div>) : ""} 
         




        <input onChange={handlefilechange} type="file" placeholder="upload your file here" name="file" /><br></br>

        <button type="submit">Upload</button>
      </form>
      {downloadUrl ? (
        <a target="blank" href={downloadUrl} download>
          Download file
        </a>
      ) : (
        ""
      )}
    </>
  );
};

export default CustomCompressionPage;
