import React from "react";
import { useState } from "react";

const CustomCompressionPage = () => {
  const [downloadUrl, setdownloadUrl] = useState(null);

  const handleupload = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);

    console.log(formdata);

    const file = formdata.get("file");
    const CompressionLevel = formdata.get("CompressionLevel");

    console.log(file, CompressionLevel);
    const data = await fetch("http://localhost:3000/api/file/compress", {
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
          <input type="number" min="1" max="128" id="VideoBitrate"/>
          <label for="VideoBitrate">Video Bitrate</label>




        <input type="file" placeholder="upload your file here" name="file" />

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
