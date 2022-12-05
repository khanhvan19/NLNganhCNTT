import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function DashBoard() {
  const currentAdmin = (localStorage.admin) ? JSON.parse(localStorage.admin) : '';
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  var statis = 0;
  const formatMoney = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });


  useEffect(() => {
    async function getData() {
      setUsers((await axios.get("http://localhost:5000/api/auth/")).data);
      setOrders((await axios.get("http://localhost:5000/api/order")).data);
      setProducts((await axios.get("http://localhost:5000/api/book/all/")).data);
    }
    getData();
  }, []);
  statis = orders.reduce((total, currentValue) => {
    return total + currentValue.total;
  }, 0);
  return (
    <div className="main py-2 px-2">
      <div className="bg-white align-items-center py-2 rounded-3">
        <div className="col-6 fs-4 fw-600 px-2">Bảng điều khiển</div>
      </div>
      <div className="bg-white align-items-center my-2 p-2 rounded-3">
        <div className="row">
          <div className="col-3 ">
            <div className="card text-white  border border-3 border-primary">
              <div className="card-body d-flex align-items-center bg-primary p-2">
                <i
                  className="fa-solid fa-book p-3"
                  style={{ fontSize: "50px" }}
                ></i>
                <div>
                  <p className="card-text mb-0">Sản phẩm sách</p>
                  <h2 className="card-title">{products.length}</h2>
                </div>
              </div>
              <Link
                to="/admin/product"
                className="card-body d-block text-primary p-2 fw-bold"
              >
                Xem chi tiết <i className="fa-solid fa-circle-right"></i>
              </Link>
            </div>
          </div>
          <div className="col-3">
            <div className="card text-white border border-3 border-success">
              <div className="card-body d-flex align-items-center bg-success p-2">
                <i
                  className="fa-solid fa-users p-3"
                  style={{ fontSize: "50px" }}
                ></i>
                <div>
                  <p className="card-text mb-0">Khách hàng</p>
                  <h2 className="card-title">{users.length}</h2>
                </div>
              </div>
              <Link
                to="/admin/user"
                className="card-body d-block text-success p-2 fw-bold"
              >
                Xem chi tiết <i className="fa-solid fa-circle-right"></i>
              </Link>
            </div>
          </div>
          <div className="col-3">
            <div className="card text-white  border border-3 border-warning">
              <div className="card-body d-flex align-items-center bg-warning p-2">
                <i
                  className="fa-solid fa-bag-shopping p-3"
                  style={{ fontSize: "50px" }}
                ></i>
                <div>
                  <p className="card-text mb-0">Đơn hàng mới</p>
                  <h2 className="card-title">{orders.length}</h2>
                </div>
              </div>
              <Link
                to="/admin/order"
                className="card-body d-block text-warning p-2 fw-bold"
              >
                Xem chi tiết <i className="fa-solid fa-circle-right"></i>
              </Link>
            </div>
          </div>
          <div className="col-3">
            <div className="card text-white  border border-3 border-danger">
              <div className="card-body d-flex align-items-center bg-danger p-2">
                <i
                  className="fa-solid fa-circle-dollar-to-slot p-3"
                  style={{ fontSize: "50px" }}
                ></i>
                <div>
                  <p className="card-text mb-0">Tổng doanh thu</p>
                  <h2 className="card-title">
                    {statis < 1000000
                      ? formatMoney.format(statis)
                      : statis / 1000000 + "tr"}
                  </h2>
                </div>
              </div>
              <a
                href="?adpage=donhang/hienthi"
                className="card-body d-block text-danger p-2 fw-bold"
              >
                Xem chi tiết <i className="fa-solid fa-circle-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="row">
          <div className="col-6">
            <div className="ps-3 py-2 rounded-3 bg-white">
              <div className="fs-5 fw-600 mb-2 pb-1 border-bottom border-2 text-danger">
                <i className="fa-solid fa-fire"></i> Top sách bán chạy
              </div>

              {products
                .sort((a, b) => b.sold - a.sold)
                .slice(0, 5)
                .map((e, i) => (
                  <div className="row mb-3">
                    <div className="col-1 my-auto fw-bold fs-5 text-danger">
                      {i + 1}
                    </div>
                    <div className="col-3">
                      <img src={e.images[0]} className="w-100" alt=""/>{" "}
                    </div>
                    <div className="col-8">
                      <p className="fs-5 fw-600 mb-1 name_prod">{e.name}</p>
                      <small className="fst-italic">{e.author}</small>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="col-6">
            <div className="ps-3 py-2 rounded-3 bg-white">
              <div className="fs-5 fw-600 mb-2 pb-1 border-bottom border-2 text-warning">
                <i className="fa-solid fa-star"></i> Khách hàng thân thiết
              </div>

              {users.slice(0, 2).map((e, i) => (
                <div className="row mb-3">
                  <div className="col-1 my-auto fw-bold fs-5 text-danger">
                    {i + 1}
                  </div>
                  <div className="col-3">
                    <img
                        alt=""
                        src="/images/user1.png"
                        className="w-100 rounded-circle"
                    />{" "}
                  </div>
                  <div className="col-8">
                    <p className="fs-5 fw-600 mb-1">Khách hàng: {e.name}</p>
                    <p className="fst-italic mb-1">
                      <span className="fw-600">Số đơn hàng: </span>10
                    </p>
                    <p className="fst-italic mb-1">
                      <span className="fw-600">Tổng giá trị: </span>100.000.000
                      đ
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
