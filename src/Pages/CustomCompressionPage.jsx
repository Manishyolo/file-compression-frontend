import React from "react";
import { useState } from "react";

const CustomCompressionPage = () => {
  const [downloadUrl, setdownloadUrl] = useState(null);

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

          <label >Select an Encoder</label><br></br>
           <select id="Encoder" name="Encoder">
          
            <option value={"libx264"}>H.264</option>
             <option value={"libx265"}>H.265</option>
              <option value={"libvpx-vp9"}>VP9</option>
           </select><br></br>
               <label >Select an Bitrate</label><br></br>
           <select id="Bitrate" name="Bitrate">
          
            <option value="18">18</option>
             <option value="23">23</option>
              <option value="28">28</option>
               <option value="36">36</option>
           </select><br></br>




        <input type="file" placeholder="upload your file here" name="file" /><br></br>

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
