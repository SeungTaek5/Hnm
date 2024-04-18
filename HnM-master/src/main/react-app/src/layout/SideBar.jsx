import { useEffect, useState } from "react";
import img_navigation1_1 from "../img/img_navigation1_1.png"
import axios from "axios";
import { Link } from "react-router-dom";

export default function SideBar(props){
    return (<>
        <aside className="area-aside">
            <h2 className="title">학원생관리</h2>

            <nav className="navigation-local">
                <ul>
                    {
                        props.subMenuList.map((r)=>{
                            if(r.mcno == props.subMenu){
                                return (<>
                                    <li>   
                                        <Link to={r.scurl}><img src={img_navigation1_1} alt="" />{r.scname}</Link> 
                                    </li>
                                </>)
                            } else {
                                return null;
                            }
                            
                        })
                    }
                    
                </ul>     
            </nav>
        </aside>
    </>)
}