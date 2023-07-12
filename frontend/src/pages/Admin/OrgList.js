import React, {useEffect, useState} from "react"
import {Layout} from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import moment from "moment/moment";

const OrgList = () => {
    const[data, setData] =  useState([])
    //find donor records
    const getOrg = async() => {
        try {
            const {data} = await API.get('/admin/org-list');
            // console.log(data)
            if(data?.success){
                setData(data?.organizationData)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getOrg();
    }, [])

    //delete function
    const handleDelete = async (id) => {
        try{
            let answer = window.prompt(
                "Are You SUre Want To Delete This Organization",
                "Sure"
            );
            if (!answer) return;
            const { data } = await API.delete(`/admin/delete/${id}`);
            alert(data?.message);
            window.location.reload();
        }catch (error) {
            console.log(error)
        }
    }

    return (
        <Layout>
            <table className="table ">
                <thead>
                <tr>
                    <th scope="col">NAME</th>
                    <th scope="col">EMAIL</th>
                    <th scope="col">PHONE</th>
                    <th scope="col">DATE</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {data?.map((record) => (
                    <tr key={record._id}>
                        <td>{record.organizationName}</td>
                        <td>{record.email}</td>
                        <td>{record.phone}</td>
                        <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                        <td>
                            <button
                                className="btn btn-danger"
                                onClick={()=>handleDelete(record._id)}
                            >
                                DELETE
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </Layout>
    );
}
export {OrgList};