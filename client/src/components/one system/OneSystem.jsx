import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro' 


import { faCoffee } from '@fortawesome/free-solid-svg-icons'

import { MAIN_COLOR } from "../../utilities/theme";
import {
    Button,
    Form,
    Grid,
    Segment,
    Card, Icon, Image
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from 'axios';

import '../../utilities/my.css'
import { getServices } from '../../redux/service';

export default function OneSystem() {
    const dispatch = useDispatch();
    const services = useSelector((state) => state.services);
    useEffect(() => {

        dispatch(getServices());
    
      }, []);
  return (
    <div> 

<h1> One System , any Industry</h1>
<p> see which industries caters to and learn more industry specfic information about our software .Of course , if you don't see your industry , that doesnot mean our software is not right for you, Our configurable system can be used by any organization in any industry </p>

<div>

{services.services.map((item) => (

  <div className='serviceItem' key={item.id}>
<img src={item.imageUrn} />

    <h1>{item.serviceName}</h1>
    {/* <FontAwesomeIcon icon={brands('twitter')} /> */}
    <FontAwesomeIcon  color = 'red'icon={faCoffee} />
  
  </div>

))}
</div>
    </div>
  )
}
