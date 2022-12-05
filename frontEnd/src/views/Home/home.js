import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
// import styles from './Home.module.css'
import ProductSlider from "../../components/SliderCard/productSlider";
import { useState, useEffect } from "react";

function Home() {
  const [products, setProducts] = useState([]);
  const [categorys, setCategorys] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/book/all/")
      .then((res) => {
        setProducts(res.data.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
    axios.get("http://localhost:5000/api/menu").then((res) => {
      setCategorys(res.data.data.reverse());
    });
  }, []);

  return (
    <Container>
      <Row className="mt-2">
        <Col
          xs={8}
          className="carousel slide"
          id="slider"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#slider"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#slider"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#slider"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
            <button
              type="button"
              data-bs-target="#slider"
              data-bs-slide-to="3"
              aria-label="Slide 4"
            ></button>
            <button
              type="button"
              data-bs-target="#slider"
              data-bs-slide-to="4"
              aria-label="Slide 5"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="3000">
              <img
                src="/images/banner/bannerlogo.png"
                className="d-block w-100 rounded-3"
                alt="BOWObookstore"
              />
            </div>
            <div className="carousel-item" data-bs-interval="3000">
              <img
                src="/images/banner/bannerdisney.jpg"
                className="d-block w-100 rounded-3"
                alt="Sach disney"
              />
            </div>
            <div className="carousel-item" data-bs-interval="3000">
              <img
                src="/images/banner/bannerhe.jpg"
                className="d-block w-100 rounded-3"
                alt="Sach chao he"
              />
            </div>
            <div className="carousel-item" data-bs-interval="3000">
              <img
                src="/images/banner/bannersvanhoc.jpg"
                className="d-block w-100 rounded-3"
                alt="Sach van hoc"
              />
            </div>
            <div className="carousel-item" data-bs-interval="3000">
              <img
                src="/images/banner/bannersachnn.png"
                className="d-block w-100 rounded-3"
                alt="Sach ngoai ngu"
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#slider"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#slider"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
          </button>
        </Col>
        <Col sx={4}>
          <div className="rounded-3 mb-2">
            <img
              src="/images/banner/bannersachmuadich.png"
              className="d-block w-100 rounded-3"
              alt="Sach ngoai ngu"
            />
          </div>
          <div className="rounded-3">
            <img
              src="images/banner/bannerst4.jpg"
              className="d-block w-100 rounded-3"
              alt="Sach thang 4"
            />
          </div>
        </Col>
      </Row>
      <div className="mt-3 box">
        <h5 className="title">
          <span>Sách bán chạy nhất</span>
        </h5>
        <div>
          <ProductSlider
            data={products.sort((a, b) => b.sold - a.sold).slice(0, 10)}
          />
        </div>
      </div>
      {categorys.map(
        (e) =>
          products.filter((product) => product.menu === e.name).length !==
            0 && (
            <div className="mt-3 box" key={e._id}>
              <h5 className="title">
                <span>Sách {e.name}</span>
              </h5>
              <div>
                <ProductSlider
                  data={products
                    .filter((product) => product.menu === e.name)
                    .sort((a, b) => b.sold - a.sold)}
                />
              </div>
            </div>
          )
      )}
    </Container>
  );
}

export default Home;
