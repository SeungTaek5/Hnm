import axios from "axios";
import { useEffect, useState } from "react";

export default function SelectGroup(props){
    const [selectGroup, setSelectGroup] = useState([]);
    //그룹출력
    useEffect ( () => {
        //출력시 radio default값

        axios.get('/adminManaging/group/get.do')
            .then(response => {
                setSelectGroup(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return(<>
        <div class="insertGroupMain">
        {
            selectGroup.map((glist=>{
                return(<>
                    <div class="insertGroupMain_element">   
                        <input type="radio" name="group" value={glist.gno} onChange={(e)=>{props.setAgroupValue(e.target.value); console.log(props.agroupValue)}}/>
                        <div>
                            {glist.gname}
                        </div>
                    </div>
                </>);
            }))
        }
        </div>
    </>);
}