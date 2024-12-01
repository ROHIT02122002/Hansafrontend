import Bodycontent from "../components/bodycontent/Bodycontent";
import Header from "../components/header/Header";
import "./Dashboard.css";

const Dashboard = () => {
    return (
        <div className="dashboard">
            <Header />
            <Bodycontent />
        </div>
    );
};

export default Dashboard;
