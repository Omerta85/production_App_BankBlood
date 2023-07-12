import React, {useEffect, useState} from 'react'
import {Layout} from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import moment from "moment";

const Hospital = () => {
    const[data, setData] =  useState([])
    //find donor records
    const getHospital = async() => {
        try {
            const {data} = await API.get('/inventory/get-hospital')
            // console.log(data)
            if(data?.success){
                setData(data?.hospital)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getHospital();
    }, [])


    return (
        <Layout>
            <table className="table ">
                <thead>
                <tr>
                    <th scope="col">NAME</th>
                    <th scope="col">EMAIL</th>
                    <th scope="col">PHONE</th>
                    <th scope="col">ADDRESS</th>
                    <th scope="col">DATE</th>
                </tr>
                </thead>
                <tbody>
                {data?.map((record) => (
                    <tr key={record._id}>
                        <td>{record.hospitalName}</td>
                        <td>{record.email}</td>
                        <td>{record.phone}</td>
                        <td>{record.address}</td>
                        <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </Layout>
    );
}
export {Hospital};