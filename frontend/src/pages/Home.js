import React, { useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import  Modal  from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';
import axios from "axios";
import "../styles/style.css"
export default function Home(){
    const [searchRecipe, setSearchRecipe] = useState();
    const [search, setSearch] = useState();
    // const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const userdetails = JSON.parse(localStorage.getItem("user-info"));
    // const [fullscreen, setFullscreen] = useState(true);
    const values = [true, 'sm-down', 'md-down', 'lg-down', 'xl-down', 'xxl-down'];
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(true);
  
    function handleShow(breakpoint) {
      setFullscreen(breakpoint);
      setShow(true);
    }
    function onSubmit() {
        axios.get(
            `http://localhost:5500/recipe/search/${search}`,
            {
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userdetails.data.token}`
                }
            })
            .then((response) => {
                // console.log(response.data.data)
                setSearchRecipe(response.data.data)
            })
            .catch(err => console.log(err));
    };
    return (
        <>
         <Modal className="my-modal" show={show} fullscreen={fullscreen} onHide={handleClose} >
         <Modal.Header closeButton>
           <Modal.Title>Search Recipe</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <div style={{"textAlign": "center"}}>
                <form onSubmit={onSubmit} style={{ "text-align": "-webkit-center", "display": "inline-flex" }}>
                    <input type="search" placeholder="Search..." className="form-control bg-muted m-1" style={{width: 500, height:70}} />
                    <button className="btn btn-success m-1" type="submit" >
                      <FontAwesomeIcon icon={faSearch} />
                    </button>
                </form>
            </div>
         </Modal.Body>
         </Modal>
        </>
    )
}