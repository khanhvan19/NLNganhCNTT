import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faStar as faStarFill } from '@fortawesome/free-solid-svg-icons';
import { faStar, faStarHalfStroke } from '@fortawesome/free-regular-svg-icons';

import {useStore, actions} from '../../stores'
import ImgSlider from "./imgSlider";
import ProductSlider from "../../components/SliderCard/productSlider"
import styles from "./Detail.module.css"

function Detail() {
    const [state, dispatch] = useStore()
    const [product, setProduct] = useState({})
    const [sameProduct, setSameProduct] = useState([])
    const [quantity, setQuantity] = useState(1)
    const currentUser = (localStorage.user) ? JSON.parse(localStorage.user) : '';
    var { id } = useParams();
    const navigate = useNavigate();

    const formatMoney = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    })

    const renderStar = (star) => {
        const starArray = [...Array(5).keys()].map(idx => idx + 1);
        return (starArray.map(idx => (
            <Icon
                key={idx}
                icon={ (idx <= star)
                    ? faStarFill
                    : (idx - star < 1)
                        ? faStarHalfStroke
                        : faStar
                }
            />
        )))
    }

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/book/detail/${id}`)
            .then((res) => {
                setProduct(res.data)
                axios
                    .get(`http://localhost:5000/api/book/same/`, {
                        params: {
                            author: res.data.author,
                            publisher: res.data.publisher,
                        }
                    })
                    .then((res) => {
                        setSameProduct(res.data.data);
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            })
            .catch((err) => {
                console.log(err)
            });
    }, [id])

    const handleSubmit = () => {
        if(currentUser===''){
            navigate("/login")
            dispatch(actions.setHistory(`/detail/${id}`))
        }
        axios
        .post(`http://localhost:5000/api/cart/`, {
            idUser: currentUser._id,
            idProduct: id,
            quantity: quantity
        })
        .then((res) => {
            toast.success("Th??m gi??? h??ng th??nh c??ng!", {
                position: "top-center",
                autoClose: 2500,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
            });
        })
        .catch((err) => {
            console.log(err)
        });
    }

    return (
        <Container>
            {(product.info != null) && (
                <>
                    <div className={styles.breadcrumbs}>
                        <Link to='/'>Home</Link>
                        <Link to='/product'>Product</Link>
                        <span>{product.menu}</span>
                        <span>{product.type}</span>
                        <span>{product.name}</span>
                    </div>
                    <div className={styles.productSide}>
                        <div className={styles.imgSide}>
                            <ImgSlider data={product.images} />
                        </div>
                        <div className={styles.infoSide}>
                            <div className={styles.prodName}>{product.name}</div>
                            <div className={styles.prodInfo}>
                                <div>T??c gi???: <span>{product.author}</span></div>
                                <div>Nh?? xu???t b???n: <span>{product.publisher}</span></div>
                                <div>H??nh th???c b??a: <span>{product.info.formality}</span></div>
                                <div className={styles.prodStar}>
                                    {renderStar(product.star)}
                                    <span className='ms-1'>{product.star} sao</span>
                                </div>
                            </div>
                            <div className={styles.prodPrice}>
                                <span>{formatMoney.format(product.price)}</span>
                                {(product.discount>0) && (<span className={styles.prodDiscount}>-{product.discount}%</span>)}
                                <div>{formatMoney.format(product.price - (product.price * (product.discount / 100)))}</div>
                            </div>
                            <div>
                                <small className="fst-italic text-danger d-block">
                                    * ???? b??n: {product.sold} s???n ph???m
                                </small>
                                <small className="fst-italic text-danger d-block">
                                    * S??? l?????ng hi???n t???i ??ang c?? s???n: {product.quantity} s???n ph???m
                                </small>
                            </div>
                            <div className={styles.orderSide}>
                                <span>
                                    <label className="fw-semibold me-3" htmlFor="quantity" style={{ cursor: 'pointer' }}>S??? l?????ng: </label>
                                    <input
                                        required
                                        type='number' id="quantity"
                                        min={1} max={product.quantity}
                                        value={quantity}
                                        className={styles.inputQuantity}
                                        onChange={(e) => { setQuantity(e.target.value) }}
                                    />
                                </span>
                                <button className={styles.btnOrder} onClick={handleSubmit}>
                                    Th??m v??o gi??? h??ng
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.prodDescription}>
                        <div className={styles.title}><span>S???n ph???m c??ng lo???i</span></div>
                        <div>
                            <ProductSlider data={sameProduct} />
                        </div>
                    </div>
                    <div className={styles.prodDescription}>
                        <div className={styles.title}><span>Th??ng tin chi ti???t</span></div>
                        <table className="table table-striped mb-0">
                            <tbody className={styles.tableProdInfo}>
                                <tr><th>T??c gi???</th><td>{product.author}</td></tr>
                                <tr><th>Nh?? xu???t b???n</th><td>{product.publisher}</td></tr>
                                <tr><th>N??m xu???t b???n</th><td>{product.info.publishYear}</td></tr>
                                <tr><th>Ng??n ng???</th><td>{product.info.language}</td></tr>
                                <tr><th>Tr???ng l?????ng</th><td>{product.info.weight} gram</td></tr>
                                <tr><th>K??ch th?????c</th><td>{product.info.size}</td></tr>
                                <tr><th>S??? trang</th><td>{product.info.page}</td></tr>
                                <tr><th>H??nh th???c</th><td>{product.info.formality}</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <div className={styles.prodDescription}>
                        <div className={styles.title}><span>Gi???i thi???u s??ch</span></div>
                        <div>
                            <div className={styles.prodDesName}>{product.name}</div>
                            <div>{product.info.description}</div>
                        </div>
                    </div>
                </>
            )}
            <ToastContainer />
        </Container>
    );
}

export default Detail;