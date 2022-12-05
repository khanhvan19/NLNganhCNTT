import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './Admin.module.css'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function AdminImages() {
    const [product, setProduct] = useState([])

    useEffect(() => {
        axios
        .get("http://localhost:5000/api/book/all/")
        .then((res) => {
            setProduct((res.data).reverse())
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    return (  
        <div className={styles.contentWrapper}>
            <div className={styles.title}>
                <span>Danh sách hình ảnh sản phẩm</span>
            </div>
            
            <table className="table table-bordered">
                <thead>
                    <tr className="table-secondary text-center">
                        <th scope="col" className='col-1'>STT</th>
                        <th scope="col" className='col-4'>TÊN SÁCH</th>
                        <th scope="col" colSpan="4">HÌNH ẢNH</th>
                        <th scope="col" className='col-1' colSpan="2">TÁC VỤ</th>
                    </tr>
                </thead>
                <tbody>
                    {product.map((item, index) => (
                        <tr key={item._id} className='align-middle'>
                            <td className='text-center'>{index + 1}</td>
                            <td>{item.name}</td>
                            { item.images.map((image, idx) => (
                                <td key={idx} className='text-center'><img src={image} alt='' width='100' /></td>
                            ))}
                            <td className='text-center'>
                                <button className='text-success'><Icon icon={faPenToSquare}/></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>        
    );
}

export default AdminImages;