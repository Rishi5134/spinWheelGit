import { useAppBridge } from "@shopify/app-bridge-react";
import { getSessionToken } from "@shopify/app-bridge-utils"
import { Button, DataTable, Pagination } from "@shopify/polaris";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import '../Styles/Orders.css';
import Loading from "./Loader/Loading";
import NoOrdersFound from "./NoOrders/NoOrdersFound";
import LoadError from "./Error/LoadError";

const Orders = () => {
    const app = useAppBridge();
    const [orders, setOrders] = useState([]);
    const [lineItems, setLineItems] = useState([]);
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
    const [ordersCount, setordersCount] = useState(0);
    const [pageNumber, setpageNumber] = useState(1);
    const [loadingSucceded, setloadingSucceded] = useState(true);
    const [noOrdersFound, setNoOrdersFound] = useState(false);
    const [error, seterror] = useState(false);
console.log("noOrdersFound", noOrdersFound);
    console.log("LoadingSucceded", loadingSucceded);


    const prevData = () => {
        setBackwardCursor(backwardCursorString)
        setForwardCursor(null)
        setLastNumProd("$numProds")
        setFirstNumProd(null)
        if (prevPage === false) {
            setBackwardCursor(null)
        }
        setpageNumber(pageNumber - 1)
        // getAllOrders(queryFilters)
    }
    const nextData = () => {
        // setCurrentPage(currentPage + 1)
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
    const rowsPerPage = 10
    const count = ordersCount
    const totalPages = Math.ceil(count / rowsPerPage)
    console.log("Total pages: " + totalPages);
    const calculatedRows = orders.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
    console.log("calculatedRows", calculatedRows);



    const [active, setActive] = useState(false);
    const toggleModal = useCallback(() => setActive((active) => !active), []);


    const rows2 = calculatedRows.map((item) => ([
        // [
        //     <img src={
        //         item.node.images.nodes[0].src
        //     } />,
        // ],
        [
            item.node.name,
        ],
        [
            item.node.lineItems.nodes.map((i) => (<><h1>{i.title}</h1></>)),
        ],
        [
            item.node.email,
        ],
        [
            item.node.totalPrice,
        ],
        // [
        //     `${item.node.variants.nodes[0].price}`
        //     // }`,
        // ],

        // [
        //     <div onClick={
        //         () => getSingleOrder(item.node.id)
        //     }>
        //         <Button onClick={toggleModal}><EditMajor />
        //         </Button>
        //     </div>,

        //     // <EditMajor onClick={
        //     //     () => getSingleProdGql(item.node.id)
        //     // }/>,
        // ],
        // [

        //     <div style={
        //         {
        //             width: "2rem",
        //             cursor: "pointer"
        //         }
        //     }
        //         onClick={
        //             // () => getSingleProduct(item.id)
        //             () => setDeleteProdId(item.node.id)
        //         }>
        //         <DeleteMajor onClick={toggleModalDel} />


        //     </div>,
        //     // <DeleteMajor onClick={
        //     //     () => deleteProduct(item.id)
        //     // }/>
        // ],
    ]));
    const ProductID = {
        id: 3937586544769
    }
    const getSingleOrder = async (SingleProdID) => {
        const id = SingleProdID.split('/').splice(-1)
        const token = await getSessionToken(app);
        console.log("token:-", token);
        const config = {
            headers: {
                Authorization: "Bearer " + token,
            }
        }
        body: ProductID
        try {
            const { data } = await axios.get(`/api/order/${id}`, config);
            console.log("Single Order orders", data)
        } catch (error) {
            console.log("Single Order Error", error);
        }

    }

    const getAllOrders = async (queryFilters) => {
        const token = await getSessionToken(app);
        console.log("token:-", token);
        setloadingSucceded(true)
        const config = {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(queryFilters)
        }
        const { data } = await axios.post('/api/orders', queryFilters, config);
        console.log("All orders", data)
        if (data.success === true) {
            setloadingSucceded(false);
        }
        
        if (data.success === false) {
            setloadingSucceded(true);
            seterror(true)
        }
        setordersCount(data.ordersCount.count)
        setForwardCursorString(data.data.body.data.orders.pageInfo.endCursor)
        setBackwardCursorString(data.data.body.data.orders.pageInfo.startCursor)
        setPrevPage(data.data.body.data.orders.pageInfo.hasPreviousPage)
        setNextPage(data.data.body.data.orders.pageInfo.hasNextPage)
        setOrders(data.data.body.data.orders.edges);
        if (data.ordersCount.count === 0) {
            setloadingSucceded(false);
            setNoOrdersFound(true)
        }

        // setCustomerEmail(data.body.data.orders.edges);
    }
    console.log("forwardCursor", forwardCursor);
    console.log("backwardCursor", backwardCursor);
    const queryFilters = {
        reverseValue, searchCategory, forwardCursor, backwardCursor, nextPage, prevPage, firstNumProd, lastNumProd
    }
    useEffect(() => {
        getAllOrders(queryFilters)
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
            <div className="headingBlock">
                <h1>Eco Bag Orders</h1>
            </div>


            {error === true ? <LoadError />:(<>
            
            {!loadingSucceded === false ? <Loading /> : (
                <>
                {!ordersCount ? (<NoOrdersFound />):(<>

                    <div className="tableBlock">
                        <DataTable columnContentTypes={
                            [
                                "text",
                                "text",
                                "text",
                                "numeric"
                            ]
                        }
                            headings={
                                [
                                    "Order",
                                    "Ordered Items",
                                    "Email",
                                    "Total Price"
                                ]
                            }
                            rows={rows2}
                            footerContent={
                                `Showing ${pageNumber} of ${totalPages} results`
                            } />
                        <div className="ordersPagination">
                            <Pagination hasPrevious
                                onPrevious={prevData}
                                hasNext
                                onNext={nextData} />
                        </div>

                    </div>

                </>)}

                </>
            )}
                
            </>)}
        </>
    )
}

export default Orders