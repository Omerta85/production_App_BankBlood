import React, {useEffect, useState} from 'react';
import {Layout} from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import moment from "moment";
import {useSelector} from "react-redux";

const Consumer = () => {
    const {user} = useSelector((state) => state.auth)
    const[data, setData] =  useState([])
    //find donor records
    const getDonors = async() => {
        try {
            const {data} = await API.post('/inventory/get-inventory-hospital', {
                filters:{
                    inventoryType: 'вихід',
                    hospital: user?._id,
                }
            })
            // console.log(data)
            if(data?.success){
                setData(data?.inventory)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getDonors();
    }, [])


    return (
        <Layout>
            <div className='container'>
            <table className="table ">
                <thead>
                <tr>
                    <th scope="col">BLOOD GROUP</th>
                    <th scope="col">INVENTORY TYPE</th>
                    <th scope="col">QUANTITY</th>
                    <th scope="col">EMAIL</th>
                    <th scope="col">DATE</th>
                </tr>
                </thead>
                <tbody>
                {data?.map((record) => (
                    <tr key={record._id}>
                        <td>{record.bloodGroup}</td>
                        <td>{record.inventoryType}</td>
                        <td>{record.quantity}</td>
                        <td>{record.email}</td>
                        <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </Layout>
    );
}
export {Consumer};