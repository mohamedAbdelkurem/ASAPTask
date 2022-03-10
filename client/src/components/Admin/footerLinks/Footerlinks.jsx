import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { MAIN_COLOR } from "../../../utilities/theme";
import {
    Button,
    Form,
    Grid,
    Segment,
     Icon, Image
} from "semantic-ui-react";

import { useParams } from "react-router-dom";
import axios from 'axios';

import '../../../utilities/my.css'
import { getFooterLinks } from '../../../redux/footer';

export default function Footerlinks() {
  const dispatch = useDispatch();
  const params = useParams();
  const [link, setLink] = useState("");

  const footers = useSelector((state) => state.footers);

  const createFooter = (e) => {
    // e.preventDefault()

    axios.post('http://localhost:5000/api/footer', {
      link: link,
      
    }
        , {

            withCredentials: true,
        }
    )
        .then(function (response) {
            console.log(response);
            dispatch(getFooterLinks());

        })
}


  useEffect(() => {

    dispatch(getFooterLinks());

  }, []);

  return (
    <div>Footerlinks

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
                        <p style={{ textAlign: 'center', padding: '20px', fontSize: '25px' }}>  <Icon size="large" name="hdd" />  Create a  <span style={{ color: 'blue' }}>   Footer Links </span> </p>

                        <Form
                            size="large"
                            onSubmit={(e) =>createFooter() }
                        // error={errors}
                        >



                            <Segment stacked>
                                <Form.Input
                                    fluid
                                    name="Service Name"

                                    iconPosition="left"
                                    placeholder="Link"
                                    onChange={(e) => setLink(e.target.value)}
                                    autoComplete="Link"
                                    focus
                                    label=" Link"
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

    </div>
  )
}
