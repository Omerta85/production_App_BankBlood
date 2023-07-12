import React, {useState, useEffect} from 'react'
import {Header} from "../../components/shared/Layout/Header";
import API from "../../services/API";
import moment from "moment/moment";

const Analytics = () => {
    const [data, setData] = useState([])
    const [inventoryData, setInventoryData] = useState([])
    const colors = [
        '#A4BE7B',
        "#45CFDD",
        "#FFA41B",
        "#525FE1",
        "#1B6B93",
        "#17594A",
        "#FF9B9B",
        "#435B66"
    ]
    //Get blood group data
    const getBloodGroupData = async( )=>{
        try{
           const {data} = await API.get('/analytics/bloodGroups-data')
            if(data?.success){
                setData(data?.bloodGroupData);
                //console.log(data);
            }
        }catch (error) {
            console.log(error)
        }
    };

    //lifrecycle method
    useEffect(() => {
      getBloodGroupData()
    }, [])
    //get function
    const getBloodRecords = async () => {
        try {
            const{data} = await API.get('/inventory/get-recent-inventory')
            if(data?.success){
                setInventoryData(data?.inventory);
                console.log(data);
            }
        }catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getBloodRecords();
    }, [])
    return (
        <>
          <Header/>
            <div className="d-flex flex-row flex-wrap">
                {data?.map((record,i) => (
                    <div className="card m-2 p-1"
                         key={i}
                         style={{ width: "18rem", backgroundColor:`${colors[i]}`
                    }}>
                        <div className="card-body">
                            <h1 className="card-title bg-light text-dark text-center mb-3">
                                {record.bloodGroup}
                            </h1>
                            <p className="card-text">
                                TOTAL IN: <b>{record.totalIn}</b> (ML)
                            </p>
                            <p className="card-text">
                                TOTAL OUT: <b>{record.totalOut}</b> (ML)
                            </p>
                        </div>
                        <div className="car-footer text-light bg-dark text-center">
                            TOTAL AVAILABLE: <b>{record.availabeBlood}</b> (ML)
                        </div>
                    </div>
                ))}
            </div>
            <div className="container my-3">
                <h1 className="my-3">RECENT BLOOD TRANSACTIONS</h1>
                <table className="table ">
                    <thead>
                    <tr>
                        <th scope="col">BLOOD GROUP</th>
                        <th scope="col">INVENTORY TYPE</th>
                        <th scope="col">QUANTITY</th>
                        <th scope="col">DONOR EMAIL</th>
                        <th scope="col">TIME & DATA</th>
                    </tr>
                    </thead>
                    <tbody>
                    {inventoryData?.map((record) => (
                        <tr key={record._id}>
                            <td>{record.bloodGroup}</td>
                            <td>{record.inventoryType}</td>
                            <td>{record.quantity} (ML)</td>
                            <td>{record.email}</td>
                            <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
export {Analytics};