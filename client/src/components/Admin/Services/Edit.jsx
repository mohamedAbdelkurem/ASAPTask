import React, { useState, useEffect } from 'react'
import axios from 'axios';

import { useParams } from "react-router-dom";

export default function Edit() {

    const params = useParams();
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([]);

    const [serviceName, setServiceName] = useState("");
    const [article, setArticle] = useState("");

 
    const getService = async () => {
        console.log("getSrvice")
        const res = await axios.get(`http://localhost:5000/api/service//${params.id}`
        )
        console.log("getSrvice")
        console.log(res.data)
        setData(res.data)
       
        setLoading(false)
    }


    const update = (e) => {
        e.preventDefault()
        
        axios.put(`http://localhost:5000/api/service/${params.id}`, {
            serviceName: serviceName,
        

        }, {

            withCredentials: true,
        }
        )
            .then(function (response) {

                console.log(response);

            })
    }

    useEffect(() => {
        getService();
    }, []);

    return (
        <div>
              {loading ? <p>Loading</p> :
         

<div >
<h1>heeeeey</h1>
<form  onSubmit={(e) => update(e)}>



                    <input   placeholder="title" onChange={(e) => setServiceName(e.target.value)} />

                    <input type="submit" value="Update" />
                </form>
</div>
                
    }
         
        </div>
    )
}
