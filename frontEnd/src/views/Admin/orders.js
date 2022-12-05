import axios from 'axios';
import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import styles from './Admin.module.css'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

function AdminCategory() {
    const [orders, setOrders] = useState([])
    const [refresh, setRefresh] = useState(0)

    const formatMoney = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    })

    useEffect(() => {
        axios
        .get("http://localhost:5000/api/order")
        .then((res) => {
            setOrders((res.data).reverse())
        })
        .catch((err) => {
            console.log(err)
        })
    }, [refresh])
    const handleChangeStatus = async (status,id) => {
            const rs = await axios
            .put(`http://localhost:5000/api/order/${id}`, {
                status: status
            })
            if(rs.data.message != null) {
                alert(rs.data.message)
            }
            setRefresh(prev => prev + 1)
    }
    return (  
        <div className={styles.contentWrapper}>
            <div className={styles.title}>
                <span>Danh sách đơn đặt hàng</span>
            </div>
            
            <table className="table table-bordered">
                <thead>
                    <tr className="table-secondary text-center">
                        <th scope="col" className='col-1'>STT</th>
                        <th scope="col">THỜI GIAN ĐẶT</th>
                        <th scope="col">TỔNG GIÁ TRỊ</th>
                        <th scope="col">HÌNH THỨC THANH TOÁN</th>
                        <th scope="col">TRẠNG THÁI</th>
                        <th scope="col" className='col-2' colSpan="2">TÁC VỤ</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((item, index) => (
                        <tr key={index} className='text-center'>
                            <td >{index + 1}</td>
                            <td>{new Date(Date.parse(item.createdAt)).toLocaleString()}</td>
                            <td>{formatMoney.format(item.total)}</td>
                            <td>{item.payment}</td>
                            <td className='fw-bold'>
                                {(item.status === 'Đang xử lý')
                                    ? <select className="form-select text-center fw-bold" onChange={(e)=>{
                                        handleChangeStatus(e.target.value,item._id)
                                    }}>
                                        <option value={item.status}>{item.status}</option>
                                        <option value={"Đang vận chuyển"}>Đang vận chuyển</option>
                                    </select>
                                    : <span
                                        className={
                                            (item.status === 'Đang vận chuyển')
                                                ? 'text-warning' 
                                                : (item.status === 'Đã hoàn thành') 
                                                    ? 'text-success'
                                                    : 'text-danger'
                                        }
                                    >{item.status}</span>
                                }
                            </td>
                            <td className='text-center'>
                                <button 
                                    className='text-primary'
                                    data-bs-toggle="modal" data-bs-target={`#info${item._id}`}
                                ><Icon icon={faArrowUpRightFromSquare}/></button>

                                <div className="modal fade" id={`info${item._id}`} tabIndex="-1" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <div className="modal-title fs-5 fw-bold">Thông tin chi tiết</div>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body text-start">
                                                <Row>
                                                    <Col xs={5}>
                                                        <h5>Thông tin đơn hàng</h5>
                                                        <p className='text-uppercase'>ID: <b>{item._id}</b></p>
                                                        <p>Người đặt hàng: <b>{item.payer}</b></p>
                                                        <p>Số điện thoại: <b>{item.phone}</b></p>
                                                        <p>Địa chỉ nhận hàng: <b>{item.address}</b></p>
                                                        <p>Thời gian đặt: <b>{new Date(Date.parse(item.createdAt)).toLocaleString()}</b></p>
                                                        <p>Phương thức: <b>{item.payment}</b></p>
                                                        <p>Trạng thái: <b>{item.status}</b></p>
                                                        <p>Tổng giá trị: <b className='fs-5 text-danger'>{formatMoney.format(item.total)}</b></p>
                                                    </Col>
                                                    <Col xs={7}>
                                                        <h5>Danh sách sản phẩm</h5>
                                                        {item.product!=null && item.product.map((item, index) => (
                                                            <Row key={item._id} className='pb-2'>
                                                                <Col xs={2} className="text-center">
                                                                    <img src={item.id.images[0]} alt='' className="w-75" />   
                                                                </Col>
                                                                <Col xs={7}>
                                                                    <div className="fw-bold lh-1 mb-1">{item.id.name}</div>
                                                                    <div><small>Số lượng: </small>x{item.quantity}</div>
                                                                </Col>
                                                                <Col xs={3} className="flexbox-center fw-bold text-danger">
                                                                    <div>{formatMoney.format(item.id.price * item.quantity)}</div>
                                                                </Col>
                                                            </Row>
                                                        ))}
                                                    </Col>
                                                </Row>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-success me-2" data-bs-dismiss="modal">Đóng</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>        
    );
}

export default AdminCategory;