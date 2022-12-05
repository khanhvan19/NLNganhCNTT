import {  Link, useNavigate, useLocation} from "react-router-dom";
import { useState, useEffect, useMemo } from "react";

import axios from "axios";
import queryString from "query-string"
import { Container, Row, Col} from "react-bootstrap";

import {constants} from "../../stores"
import ProductCard from "../../components/Card/productCard";
import Pagination from "../../components/Pagination/pagination";
import Tabs from "../../components/Tabs/tabs"
import LeftFilter from "./leftFilter";
import ListFilterChip from "./listFilterChip";

import styles from './Product.module.css'

function Product() {
    const navigate = useNavigate();
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({});

    const queryParams = useMemo(() => {
        const params = queryString.parse(location.search) 
        return {
            ...params,
            page: parseInt(params.page) || 1,
            limit: parseInt(params.limit) || 8,
            sort: params.sort || 'createdAt:desc',
        }
    }, [location.search])

    useEffect(() => {
        axios
        .get("http://localhost:5000/api/book", {
            params: queryParams
        })
        .then((res) => {
            setProducts(res.data.data)
            setPagination(res.data.pagination)
        })
        .catch((err) => {
            console.log(err)
        });
    }, [queryParams])

    const handleDefaultFilterChange = (newValue, type) => {
        const filter = {
            ...queryParams,
            [type] : newValue,
        }
        navigate({
            pathname: location.pathname,
            search: queryString.stringify(filter)
        })
    }

    const handleLeftFiltersChange = (newFilter) => {
        const filter = {
            ...queryParams,
            ...newFilter,
            page: 1,
        }
        navigate({
            pathname: location.pathname,
            search: queryString.stringify(filter)
        })
    }

    const handleFilterChipChange = (newFilters) => {
        const filter = {
            ...newFilters,
            page: 1,
        }
        navigate({
            pathname: location.pathname,
            search: queryString.stringify(filter)
        })
    }

    return (
        <Container>
            <div className={styles.breadcrumbs}>
                <Link to='/'>Home</Link>
                <span>Product</span>
                {queryParams.menu != null && (<span>{queryParams.menu}</span>)} 
                {queryParams.type != null && ( <span>{queryParams.type}</span>)} 
            </div>
            <div className={styles.mainContainer}>
                <LeftFilter filters={queryParams} onChange={handleLeftFiltersChange}/>
                <div className={styles.productContainer}>
                    <Tabs 
                        items={constants.SORT_ITEM}
                        current={queryParams.sort}
                        onTabsChange={value => handleDefaultFilterChange(value, 'sort')}
                    />
                    <ListFilterChip filters={queryParams} onChange={handleFilterChipChange}/>
                    <Row>
                        {(products.length === 0) 
                            ? ( <div className={styles.productsIsEmpty}>
                                    Ooops!!! Không tìm thấy sản phẩm phù hợp.
                                </div>
                            )
                            : products.map((product) => (
                                <Col xs='6' md='4' xl='3' key={product._id}>
                                    <ProductCard key={product._id} data={product}/>
                                </Col>
                            ))
                        }
                    </Row>
                    {Math.ceil(pagination.total / pagination.limit) > 1 && 
                        <Pagination 
                            current={pagination.page}
                            totalPages={Math.ceil(pagination.total / pagination.limit)}
                            onPageChange={value => handleDefaultFilterChange(value, 'page')}
                        />
                    }
                </div>
            </div>
        </Container>
    );
}

export default Product;