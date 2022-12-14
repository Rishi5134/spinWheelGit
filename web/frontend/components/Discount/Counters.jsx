import { Card, Heading, TextContainer } from "@shopify/polaris"
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import '../../Styles/counters.css';
import Loading from "../Loader/Loading";

const Counters = () => {

    const [counterData, setCounterData] = useState([]);
    const [error, seterror] = useState([]);
    const getCounters = async () => {
        try {
            const { data } = await axios.get('/api/spincounters');

            setCounterData(data.data)
        } catch (error) {
            seterror(error.data)
        }
    }
    useEffect(() => {
        getCounters()
    }, [])
    return (
        <div className="countersDiv">

            <Card>
                <div className="counterMainBlock">

                    <TextContainer>
                        <div className="counterHeading">
                            {error && <p>{error}</p>}

                            <h1>Spin Wheel App Counters</h1>
                        </div>
                        <div className="counterBlocks">
                            {!counterData ? (<><Loading /></>) : counterData.map((i) => (<>
                                <span key={i._id}></span>
                                <Card sectioned>
                                    <Heading>Opened</Heading>
                                    {i.openedSpinwheel}
                                </Card>
                                <Card sectioned>
                                    <Heading>Spinned</Heading>
                                    {i.spinned}
                                </Card>
                                <Card sectioned>
                                    <Heading>Closed</Heading>
                                    {i.closedSpinwheel}

                                </Card>
                            </>))}
                        </div>

                    </TextContainer>
                </div>
            </Card>
        </div>
    )
}

export default Counters