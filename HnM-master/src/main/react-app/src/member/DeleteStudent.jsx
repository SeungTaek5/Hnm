import axios from "axios";

export default function DeleteStudent(props){
    axios.delete("/student/delete/delete.do")
    .then(response =>{

    })
    .catch(error=> {console.log(error);})
}