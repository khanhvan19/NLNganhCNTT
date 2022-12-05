import axios from "axios";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faReplyAll } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Container, Row , Col} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

function OrderDetail() {
    const [countUpdate, setCountUpdate] = useState(0) 
    const [order, setOrder] = useState({});
    var { id } = useParams();
    
    const formatMoney = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    })
    
    useEffect(() => {
        axios
        .get(`http://localhost:5000/api/order/${id}`)
        .then((res) => {
            setOrder(res.data)
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err)
        });
    }, [id, countUpdate])
    

    const handleConfirm = async (sta) => {
        var notify = (sta === "Đã hoàn thành") 
            ? "Xác nhận đã nhận hàng thành công"
            : "Bạn có chắc muốn hủy đơn này"
        if(window.confirm(notify)) {
            const rs = await axios
            .put(`http://localhost:5000/api/order/${id}`, {
                status: sta
            })
            if(rs.data.message != null) {
                alert(rs.data.message)
            }
            setCountUpdate(prev => prev + 1)
        }
    }
    
    return ( 
        <Container className="py-3">
            <Row>
                <Col xs={4}>
                    <div className="box mb-3">
                        <div className="title"><span>Thông tin người đặt</span></div>
                        <ul className="ps-3">
                            <li><span className="fw-bold">Họ tên: </span>{order.payer}</li>
                            <li><span className="fw-bold">Số điện thoại: </span>{order.phone}</li>
                            <li><span className="fw-bold">Địa chỉ nhận hàng: </span>{order.address}</li>
                        </ul>
                    </div>
                    <div className="box mb-3">
                        <div className="title"><span>Thông tin đơn hàng</span></div>
                        <ul className="ps-3">
                            <li><span className="fw-bold">Giá trị: </span>
                                {formatMoney.format(order.total)}
                            </li>
                            <li><span className="fw-bold">Ngày đặt hàng: </span>
                                {new Date(Date.parse(order.createdAt)).toLocaleString()}
                            </li>
                            <li><span className="fw-bold">Phương thức TT: </span>{order.payment}</li>
                            <li><span className="fw-bold">Trạng thái đơn hàng: </span>{order.status}</li>
                        </ul>
                    </div>
                    {
                        (order.status === "Đang xử lý")
                        ? (
                            <button 
                                className="btn btn-danger w-100 mb-3"
                                onClick={() => {handleConfirm("Đã hủy")}}
                            >
                                Hủy đơn hàng
                            </button>
                        )
                        : (
                            <button 
                                disabled={(order.status === "Đang vận chuyển") ? false : true}
                                className="btn btn-success w-100 mb-3"
                                onClick={() => {handleConfirm("Đã hoàn thành")}}
                            >
                                Xác nhận đã nhận hàng
                            </button>
                        )
                    }
                    <div className="text-center">
                        <Link to={'/order'} className="fw-bold text-center default-link">
                            <Icon icon={faReplyAll} className="me-1"/>Quay trở lại
                        </Link>
                    </div>
                </Col>
                <Col xs={8}>
                    <div className="box">
                        <div className="title"><span>Danh sách sản phẩm</span></div>
                        {order.product!=null && order.product.map((item, index) => (
                            <Row key={item._id} className='pb-2'>
                                <Col xs={2} className="text-center">
                                    <img src={item.id.images[0]} alt='' className="w-75" />   
                                </Col>
                                <Col xs={7}>
                                    <div className="fw-bold lh-1 mb-1">{item.id.name}</div>
                                    <div><small>Đơn giá: </small>{item.id.price}</div>
                                    <div><small>Số lượng: </small>x{item.quantity}</div>
                                </Col>
                                <Col xs={3} className="flexbox-center fw-bold text-danger">
                                    <div>{formatMoney.format(item.id.price * item.quantity)}</div>
                                </Col>
                            </Row>
                        ))}
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

    export default OrderDetail;