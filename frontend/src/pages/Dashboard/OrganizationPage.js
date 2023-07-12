import  React, {useEffect, useState} from 'react'
import {Layout} from "../../components/shared/Layout/Layout";

import API from "../../services/API";
import moment from "moment";
import {useSelector} from "react-redux";

const OrganizationPage = () => {
    //get current user
    const {user} = useSelector((state) => state.auth)
    const[data, setData] =  useState([])
    //find org records
    const getOrg = async() => {
        try {
            if(user?.role === 'donor'){
                const {data} = await API.get('/inventory/get-organization')
                // console.log(data)
                if(data?.success){
                    setData(data?.organizations)
                }
            }
            if(user?.role === 'hospital'){
                const {data} = await API.get('/inventory/get-organization-for-hospital')
                // console.log(data)
                if(data?.success){
                    setData(data?.organizations)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getOrg();
    }, [user])


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
                        <td>{record.organizationName}</td>
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
export {OrganizationPage};