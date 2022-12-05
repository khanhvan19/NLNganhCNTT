import { Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

import { useStore, actions } from '../../stores'
import styles from './Cart.module.css'
import { useEffect, useState } from "react";
import axios from "axios";


function Cart() {
    const [state, dispatch] = useStore()
    const [total, setTotal] = useState(0)
    const [isFreeShip, setIsFreeShip] = useState(false)
    const [countUpdate, setCountUpdate] = useState(0) 
    const currentUser = (localStorage.user) ? JSON.parse(localStorage.user) : '';

    const [name, setName] = useState()
    const [phone, setPhone] = useState()
    const [address, setAddress] = useState()
    const [payment, setPayment] = useState()

    const formatMoney = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    })

    useEffect( () =>  {
        async function getData(){
            const book = (
                await axios
                .get('http://localhost:5000/api/cart/', {
                    params: {
                        user: currentUser._id
                    }
                })
            ).data;
            dispatch(actions.setProductsCart( book.products.reverse() ))
            setTotal(parseInt(book.totalPrice))
            setIsFreeShip(book.isFreeShip)
        }
        getData();  
    }, [countUpdate, currentUser._id, dispatch])

    const handleChangeQuantity = async (id, sl) => {
        const rs = await axios
        .post('http://localhost:5000/api/cart/', {
            idUser: currentUser._id,
            idProduct: id,
            quantity: sl
        })
        if(rs.data.message != null) {
            alert(rs.data.message)
        }
        setCountUpdate(prev => prev + 1)
    }

    const handleDeleteProduct = async (id) => {
        if(window.confirm("Bạn chắc chắn muốn xóa sản phẩm này?")) {
            const rs = await axios
            .put('http://localhost:5000/api/cart/', {
                idUser: currentUser._id,
                idProduct: id,
            })
            if(rs.data.message != null) {
                alert(rs.data.message)
            }
            setCountUpdate(prev => prev + 1)
        }
    }
    
    const handleCheckout = async () => {
        const rs = await axios
        .post('http://localhost:5000/api/order/', {
            user: currentUser._id,
            payer: name,
            phone: phone,
            address: address,
            payment: payment,
            total: total,
            status: 'Đang xử lý'
        })
        alert(rs.data.message)
        setCountUpdate(prev => prev + 1)

    }

    return ( 
        <Container className="py-3">
            <h5>GIỎ HÀNG: <b>{state.productsCart.length}</b> sản phẩm </h5>
            <Row>
                <Col xs={9}>
                    {state.productsCart.map(item => (
                        <div className="box mb-2" key={item.id._id}>
                            <Row>
                                <Col xs={2} className="text-center">
                                    <img src={item.id.images[0]} className="w-75" alt=""/>
                                </Col>
                                <Col xs={5} className="d-flex flex-column">
                                    <div className={styles.prodName}>{item.id.name}</div>
                                    <div className="mt-auto mb-2">
                                        <small>Đơn giá:</small>
                                        <span className="ms-2 fw-semibold">
                                            { formatMoney.format( item.id.price -  (item.id.price * (item.id.discount / 100)) ) }
                                        </span>
                                    </div>
                                </Col>
                                <Col xs={2} className="flexbox-center">
                                        <div className={styles.prodPrice}>
                                            {formatMoney.format( item.quantity * (item.id.price -  (item.id.price * (item.id.discount / 100))) )}
                                        </div>
                                </Col>
                                <Col xs={2} className="flexbox-center">
                                    <div className={styles.changeQuantity}>
                                        <button onClick={() => handleChangeQuantity(item.id._id, -1)}><Icon icon={faMinus}/></button>
                                        <input type='text' readOnly value={item.quantity} />
                                        <button onClick={() => handleChangeQuantity(item.id._id, 1)}><Icon icon={faPlus}/></button>
                                    </div>
                                </Col>
                                <Col xs={1} className="flexbox-center">
                                    <button onClick={() => handleDeleteProduct(item.id._id)}>
                                        <Icon icon={faTrashCan} className='fs-5'/>
                                    </button>
                                </Col>
                            </Row>
                        </div>
                    ))}
                </Col>
                <Col xs={3} className={styles.rightSide}> 
                    <Row>
                        <Col xs={12}>
                            <div className="box">
                                <div className="flexbox-between">
                                    <small>Tạm tính:</small>
                                    <span className="fw-semibold">{formatMoney.format(total)}</span>
                                </div>
                                <div className="flexbox-between">
                                    <small>Vận chuyển:</small>
                                    <span className="fw-semibold">20.000đ</span>
                                </div>
                                <div className={styles.totalPrice}>
                                    <b>Tổng tiền:</b>
                                    <strong>{formatMoney.format(total - 20000)}</strong>
                                </div>
                                <button 
                                    className={styles.btnCheckout}
                                    disabled = {(state.productsCart.length === 0) ? true : false }
                                    data-bs-toggle="modal" data-bs-target="#checkout"
                                >
                                    Đặt hàng
                                </button>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
            
            <div className="modal fade" id="checkout" tabIndex="-1" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modal-title fs-5 fw-bold">Thanh toán</div>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <Row>
                                <Col className="pe-5">
                                    <h5>Thông tin đơn hàng</h5>
                                    <div className="flexbox-between">
                                        <small>Tạm tính:</small>
                                        <span className="fw-semibold">{formatMoney.format(total)}</span>
                                    </div>
                                    <div className="flexbox-between">
                                        <small>Vận chuyển:</small>
                                        <span className="fw-semibold">20.000đ</span>
                                    </div>
                                    <div className={styles.totalPrice}>
                                        <b>Tổng tiền:</b>
                                        <strong>{formatMoney.format(total - 20000)}</strong>
                                    </div>
                                </Col>
                                <Col>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Họ tên</label>
                                        <input 
                                            required
                                            id="name"
                                            type="text" className="form-control" 
                                            placeholder="Họ tên"
                                            value={name}
                                            onChange={(e) => {setName(e.target.value)}}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="phone" className="form-label">Số điện thoại</label>
                                        <input 
                                            required
                                            id="phone"
                                            type="text" className="form-control" 
                                            placeholder="Số điện thoại"
                                            value={phone}
                                            onChange={(e) => {setPhone(e.target.value)}}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="address" className="form-label">Địa chỉ nhận hàng</label>
                                        <input 
                                            required
                                            id="address"
                                            type="text" className="form-control" 
                                            placeholder="Địa chỉ nhận hàng"
                                            value={address}
                                            onChange={(e) => {setAddress(e.target.value)}}
                                        />
                                    </div>
                                    <div>
                                        <label className="form-label">Phương thức thanh toán</label>
                                        <select 
                                            className="form-select" 
                                            onChange={(e) => {setPayment(e.target.value)}}
                                        >
                                            <option value='1'>-- Chọn phương thức thanh toán --</option>
                                            <option value="Thanh toán khi nhận hàng">Thanh toán khi nhận hàng</option>
                                        </select>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary me-2" data-bs-dismiss="modal">Hủy</button>
                            <button 
                                type="button" className="btn btn-danger" 
                                data-bs-dismiss="modal"
                                onClick={handleCheckout}
                            >
                                Thanh toán
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
        </Container>
    );
}

export default Cart
