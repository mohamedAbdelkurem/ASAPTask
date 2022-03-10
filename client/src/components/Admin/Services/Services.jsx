import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { MAIN_COLOR } from "../../../utilities/theme";
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

import '../../../utilities/my.css'
import { getServices } from '../../../redux/service';

export default function Services() {
  const dispatch = useDispatch();
  const params = useParams();
  const [serviceName, setServiceName] = useState("");


  const services = useSelector((state) => state.services);

  const createService = (e) => {
    // e.preventDefault()

    axios.post('http://localhost:5000/api/service', {
      serviceName: serviceName,
      
    }
        , {

            withCredentials: true,
        }
    )
        .then(function (response) {
            console.log(response);
            dispatch(getServices());

        })
}

const deleteService = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/service/${id}`);
    dispatch(getServices());
    
  } catch (error) {
    console.log(error)
  }
};

  useEffect(() => {

    dispatch(getServices());

  }, []);

  return (

    <div>Services



      <div>
      <Grid
                    padded
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    textAlign="center"
                >
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <p style={{ textAlign: 'center', padding: '20px', fontSize: '25px' }}>  <Icon size="large" name="hdd" />  Create a  <span style={{ color: 'blue' }}>   Service</span> </p>

                        <Form
                            size="large"
                            onSubmit={(e) =>createService() }
                        // error={errors}
                        >



                            <Segment stacked>
                                <Form.Input
                                    fluid
                                    name="Service Name"

                                    iconPosition="left"
                                    placeholder="Service Name"
                                    onChange={(e) => setServiceName(e.target.value)}
                                    autoComplete="Name"
                                    focus
                                    label=" Service Name"
                                    type="text"
                                    required
                                // error={errors && errors.noVisit}
                                />
{/* 
                                <Form.TextArea
                                    fluid
                                    name="Description"


                                    placeholder="Description"
                                    onChange={(e) => SetTaskDesc(e.target.value)}
                                    autoComplete="Name"
                                    focus
                                    label="Description"
                                    type="text"
                                   
                                // error={errors && errors.noVisit}
                                /> */}
                            


    



                                <Button color={MAIN_COLOR} fluid size="large" >
                                    Add 
                                </Button>
                            
                            </Segment>
                        </Form>
                       
                              
                         
                    </Grid.Column>
                </Grid>
      </div>
      <div>

      {services.services.map((item) => (
        <div key={item.id}>

          <h1>{item.serviceName}</h1>
          <Link to={`/edit/${item.id}`}>
              <button style={{ color: "blue" }} >update Service</button>
            </Link>
            <button style={{ color: "red" }} onClick={() => { deleteService(item.id) }}>delete</button>
        </div>
    
      ))}
      </div>
    </div>
  )
}
