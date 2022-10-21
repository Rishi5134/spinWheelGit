import { useAppBridge } from "@shopify/app-bridge-react";
import { getSessionToken } from "@shopify/app-bridge-utils"
import { Badge, Button, Card, DataTable, MediaCard, Pagination, Tag } from "@shopify/polaris";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { EditMajor, DeleteMajor } from '@shopify/polaris-icons';
import '../../Styles/DiscountOrders.css';
import Loading from "../Loader/Loading";
import Error from "../Error/Error";
import NoOrdersFound from "../Orders/NoOrdersFound";
import {
    DiscountsMajor
} from '@shopify/polaris-icons';


const DiscountOrders = () => {

    const app = useAppBridge();

    const [orders, setOrders] = useState([]);
    const [searchCategory, setSearchCategory] = useState(null)
    const [reverseValue, setReverseValue] = useState(false)
    const [forwardCursor, setForwardCursor] = useState(null);
    const [backwardCursor, setBackwardCursor] = useState(null);
    const [backwardCursorString, setBackwardCursorString] = useState(null);
    const [forwardCursorString, setForwardCursorString] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const [nextPage, setNextPage] = useState(null);
    const [firstNumProd, setFirstNumProd] = useState("$numProds");
    const [lastNumProd, setLastNumProd] = useState(null);
    const [count, setCount] = useState(0);
    const [pageLoading, setpageLoading] = useState(false);
    const [pageNumber, setpageNumber] = useState(1);
    const [errorOccurred, seterrorOccurred] = useState(false);
    const [noOrders, setnoOrders] = useState(false);

    const prevData = () => {
        setBackwardCursor(backwardCursorString)
        setForwardCursor(null)
        setLastNumProd("$numProds")
        setFirstNumProd(null)
        if (prevPage === false) {
            setBackwardCursor(null)
        }
        setpageNumber(pageNumber - 1)
    }
    const nextData = () => {
        //  setCurrentPage(currentPage + 1)
        setLastNumProd(null)
        setFirstNumProd("$numProds")
        setForwardCursor(forwardCursorString)
        setBackwardCursor(null)
        if (nextPage === false) {
            setForwardCursor(null)
        }
        setpageNumber(pageNumber + 1)
    }

    const cssNextEnable = `
#nextURL {
    pointer-events: none !important;
}
`
    const cssNextDisable = `
#nextURL {
    pointer-events: auto !important;
}
`
    const cssPrevDisable = `
#previousURL {
    pointer-events: none !important;
}
`
    const cssPrevEnable = `
#previousURL {
    pointer-events: auto !important;
}
`

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 7
    const totalPages = Math.ceil(count / rowsPerPage)
    const calculatedRows = orders.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)


    const rows2 = calculatedRows.map((item) => (
        [

            [
                item.node.name,
            ],
            [
                item.node.lineItems.nodes.map((i) => (<><h1>{i.title}</h1></>)),
            ],
            [
                item.node.email === null ? <p>Not Provided</p> : item.node.email,
            ],
            [
                item.node.discountCode === null ? <p>Null</p> : item.node.discountCode,


            ],

        ]));



    const getAllOrders = async (queryFilters) => {

        setpageLoading(true)
        const token = await getSessionToken(app);
        
        const config = {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(queryFilters)
        }
        const { data } = await axios.post('/api/orders', queryFilters, config);
    

        if (data.success === false) {
            setpageLoading(false)
            seterrorOccurred(true)
        }
        if (data.OrdersCount.count === 0) {
            setpageLoading(false)
            setnoOrders(true)
        }
        setForwardCursorString(data.data.body.data.orders.pageInfo.endCursor)
        setBackwardCursorString(data.data.body.data.orders.pageInfo.startCursor)
        setPrevPage(data.data.body.data.orders.pageInfo.hasPreviousPage)
        setNextPage(data.data.body.data.orders.pageInfo.hasNextPage)
        setOrders(data.data.body.data.orders.edges);
        // setCustomerEmail(data.body.data.orders.edges);
        setCount(data.OrdersCount.count)
        setpageLoading(false)
    }


    const queryFilters = {
        reverseValue, searchCategory, forwardCursor, backwardCursor, nextPage, prevPage, firstNumProd, lastNumProd
    }
    useEffect(() => {
        getAllOrders(queryFilters);

        // getSingleOrder()
    }, [reverseValue, searchCategory, forwardCursor, backwardCursor, nextPage, prevPage, firstNumProd, lastNumProd])
    return (
        <>



            {
                nextPage !== true ? <style>{cssNextEnable}</style> : <style>{cssNextDisable}</style>
            }
            {
                prevPage !== true ? <style>{cssPrevDisable}</style> : <style>{cssPrevEnable}</style>
            }
            <div className="discountOrders">
                <h1>Discount Order List</h1>
            </div>

            {noOrders === true ? <NoOrdersFound /> : (<>

                {pageLoading === true ? <Loading /> : (<>
                    {errorOccurred === true ? <Error /> : (<>

                    
                        <div className="mediaCard">
                            {calculatedRows.map((item) => (
                                <div className="mainMediaBlock" key={item.node.id} >

                                    <Card title={item.node.name} >
                                        <div className="mediaData" >
                                            <p className="email">{item.node.email === null ? <p>Not Provided</p> : item.node.email}</p>
                                            <p className="totalPrice">{item.node.currencyCode && item.node.currencyCode} {item.node.totalPrice && item.node.totalPrice}</p>
                                            <div className="badges">{item.node.lineItems.nodes.map((i) => (<div key={i.id} className="badgeData"><Badge className="badge">{i.title}</Badge></div>))}</div>
                                            <>{item.node.discountCode === null ? <p>Null</p> : <Tag><DiscountsMajor />{item.node.discountCode}</Tag>}</>
                                        </div>
                                    </Card>
                                </div>
                            ))}
                        </div>

                    </>)}
                </>)}

            </>)}
            <div className="ordersPagination">
                <Pagination hasPrevious
                    onPrevious={prevData}
                    hasNext
                    onNext={nextData} />
            </div>

        </>
    )
}

export default DiscountOrders