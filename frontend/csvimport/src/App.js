import './App.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import TableComponent from './Table';

function App() {

  const [selectedFile, setSelectedFile] = useState("");
  const [fileList , setFileList] = useState([])
  const [listening, setListening]= useState(false);
  const [errorMsg , setErrorMsg] = useState("");
  const [status,setStatus] = useState({});
   useEffect(() => {
     fetchFileList()
     .then(data => {
        console.log("===== File List ======  " , data.data)
        setFileList(data.data)
      })
     if(!listening){
      // fetchFileList()
      
    
    const events = new EventSource(process.env.API_URL/'poll-status');

      events.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
      console.log("parseddd== " ,parsedData.data)
        setStatus(parsedData.data)
      };
    }
      setListening(true)
  },[])

  function fetchFileList(){
    return axios.get(process.env.API_URL/'files',{params: {id : ""}})
  }
  // On file select (from the pop up)
  function onFileChange (event) {
    setErrorMsg('')
    console.log(event.target.files[0])
    // Update the state
    setSelectedFile(event.target.files[0])

  };
  
  // On file upload (click the upload button)
  function onFileUpload(e) {
    e.preventDefault();
    if(!selectedFile){
      setErrorMsg('Please select a file')
      return
    }
    let fileFormat = selectedFile.name.split('.').pop();
    if(fileFormat.toLowerCase() !== 'csv'){
      setErrorMsg('Invalid file format')
      setSelectedFile("")
      return
    }

    if(selectedFile.size > 5000000){
      setErrorMsg('File size too big')
      setSelectedFile("")
      return
    }
    
    // Create an object of formData
    const formData = new FormData();
  
    // Update the formData object
    formData.append(
      "myFile",
      selectedFile,
      selectedFile.name
    );
  
    // Details of the uploaded file
    console.log(selectedFile);
  
    // Request made to the backend api
    // Send formData object
    axios.post(process.env.API_URL/"save", formData)
    .then(data => {
      console.log("save" , data)
      if(data.data.success){
        setFileList([...fileList, data.data.data])
      }
    })
    setSelectedFile("")
  };
  function getFileContent(id){
    axios.get(process.env.API_URL/`file-content/${id}`)
    .then(data => {
      console.log("file content --- " , data)
      if(data.data.success){
        let newArray = fileList.map(file => {
          if(file._id === id){
            file.file_content = data.data.data;
          }
          return file;
        })
        setFileList(newArray)
      }
    })
  }
  return (
    <Container>
      <div style={{marginTop: '3%'}}>
        <h3>Import CSV file</h3>
      </div>
      <div>
        
      <Form onSubmit={(e) => onFileUpload(e)}>
        <Form.Group>
        <Form.File 
          id="custom-file"
          onChange={(e) => onFileChange(e)}
          label={selectedFile.name ?  selectedFile.name : "Upload file(upto 5MB size)"}
          custom
        />
        </Form.Group>
        <span>{errorMsg}</span>
        <br/>
        <Button variant="primary" type="submit">
          Submit
        </Button>
    </Form>
      </div>
      <br/>
      <TableComponent fileList={fileList} getFileContent={(id) => getFileContent(id)} status={status}/>
          </Container>
      
  );
}

export default App;
