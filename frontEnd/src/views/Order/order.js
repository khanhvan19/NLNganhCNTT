import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Tabs from "../../components/Tabs/tabs";
import { constants } from '../../stores'
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faShareFromSquare } from "@fortawesome/free-solid-svg-icons";
import styles from './Order.module.css'

function Order() {
    const [statusType, setStatusType] = useState(constants.ORDER_ITEM[0].value)
    const currentUser = (localStorage.user) ? JSON.parse(localStorage.user) : '';
    const [orders, setOrders] = useState([])

    const formatMoney = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    })

    useEffect(() => {
        axios
        .get("http://localhost:5000/api/order/status/", {
            params: {
                status: statusType,
                user:  currentUser._id,
            } ,
        })
        .then((res) => {
            setOrders(res.data)
        })
        .catch((err) => {
            console.log(err)
        });
    }, [statusType])

    const handleChangeTab = (value) => {
        setStatusType(value)
    }

    return ( 
        <Container>
            <div className="box my-3">
                <div className={styles.tabs}>
                   <Tabs 
                        items={constants.ORDER_ITEM}
                        current={statusType}
                        onTabsChange={value => handleChangeTab(value)}
                    /> 
                </div>
                
                { (orders.length !== 0) 
                ? (
                    <div className="px-2">
                        <table className="table">
                            <thead className="text-center">
                                <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">Thời gian đặt</th>
                                    <th scope="col">Tổng giá trị</th>
                                    <th scope="col">Hình thức thanh toán</th>
                                    <th scope="col">Trạng thái</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((item, index) => (
                                    <tr key={index}>
                                        <th className="text-center align-middle">{index + 1}</th>
                                        <td className="text-center align-middle">{new Date(Date.parse(item.createdAt)).toLocaleString()}</td>
                                        <td className="text-center align-middle">{formatMoney.format(item.total)}</td>
                                        <td className="text-center align-middle">{item.payment}</td>
                                        <td className="text-center align-middle">{item.status}</td>
                                        <td className="text-center align-middle">
                                            <Link className={styles.btnDetail} to={`/order/${item._id}`}>
                                                <Icon icon={faShareFromSquare} />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div> 
                ) 
                : (
                    <div className="flexbox-center">
                        <img src="/images/empty-order.png" className="h-100 my-3" alt="" />
                    </div>    
                )
                }
            </div>
            
        </Container> 
    );
}

export default Order;