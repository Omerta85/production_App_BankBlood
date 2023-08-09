import React from "react";
import {Layout} from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";

const AdminHome = () => {
    const { user } = useSelector((state) => state.auth);
    return (
        <Layout>
            <div className="container">
                <div className="d-felx flex-column mt-4">
                    <h1>WELCOME ADMIN <i className="text-success">{user?.name}</i></h1>
                    <h3>MANAGE BANK BLOOD APP</h3>
                    <hr/>
                    The Admin Dashboard in the Blood Bank App provides the necessary tools and functionalities for
                    administrators to manage the system effectively. As an admin, you have access to advanced
                    features that allow you to oversee and maintain the blood donation requests and user accounts
                    within the app.
                    <h2>Features</h2>
                    <h5>Manage Blood Donation Requests:</h5>
                    <ol>
                        <li>View a list of all blood donation requests in the system.</li>
                        <li>Edit or update the details of existing blood donation requests.</li>
                        <li>Delete or remove blood donation requests that are no longer relevant or valid.</li>
                        <li>Monitor the urgency and status of blood donation requests.</li>
                    </ol>
                    <h5>Manage User Accounts:</h5>
                    <ol>
                        <li>View a list of all user accounts registered in the app.</li>
                        <li>Edit or update user account information, such as name, email, and contact details.</li>
                        <li>Monitor and manage user roles and permissions within the app.</li>
                        <li>Enable or disable user accounts as necessary.</li>
                    </ol>
                    <h5>Database Management:</h5>
                    <ol>
                        <li>Manage the database of the Blood Bank App.</li>
                        <li> Add new blood donation requests to the database.</li>
                        <li>Ensure the accuracy and completeness of blood donation request information.</li>
                        <li>Perform regular database maintenance and optimization.</li>
                    </ol>
                    <h5>Reports and Analytics:</h5>
                    <ol>
                        <li>Generate reports and analytics on blood donation activities and user engagement.</li>
                        <li>  Gain insights into donation trends, popular blood types, and geographical distribution.</li>
                        <li>Monitor and track the effectiveness of the Blood Bank App in facilitating blood transfusions.</li>
                    </ol>
                    <h2>How to Access the Admin Dashboard</h2>
                    To access the Admin Dashboard and start managing the Blood Bank App, follow these steps:
                    <ul>
                        <li>Log in to the Blood Bank App using your admin credentials.</li>
                        <li>Navigate to the admin section or dashboard within the app.</li>
                        <li>You will be presented with the various management features and options available to you.</li>
                        <li>Use the provided tools and functionalities to effectively manage blood donation requests and
                            user accounts.</li>
                    </ul>
                    <h2>Security Considerations</h2>
                    As an admin, it is crucial to handle the administrative privileges responsibly and maintain the
                    security and privacy of user data. Here are some security considerations to keep in mind:
                    <ul>
                        <li>Always use strong, unique passwords for your admin account.</li>
                        <li>Regularly review and update user access permissions to ensure appropriate access levels.</li>
                        <li>Follow best practices for data protection and adhere to relevant privacy regulations.</li>
                        <li>Implement security measures to protect the admin dashboard from unauthorized access.</li>
                    </ul>
                    <h2>Conclusion</h2>
                    The Admin Dashboard in the Blood Bank App empowers administrators like you to effectively manage
                    the blood donation requests and user accounts within the system. With the provided features and
                    tools, you can ensure the smooth operation of the app, contribute to saving lives through blood
                    transfusions, and make a positive impact on the community.
                    If you have any questions or need assistance, please refer to the app's documentation or reach
                    out to the support team. Thank you for your commitment to managing the Blood Bank App and
                    promoting the cause of blood donation.
                </div>
            </div>
        </Layout>
    );
};

export {AdminHome};