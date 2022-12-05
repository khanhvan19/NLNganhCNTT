import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./Admin.module.css";
import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import {
  faPlus,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";

function AdminProduct() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [info, setInfo] = useState({});
  const [categorys, setCategorys] = useState([]);
  const [edit, setEdit] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [file, setFile] = useState();

  const formatMoney = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/book/all/")
      .then((res) => {
        setProducts(res.data.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/menu")
      .then((res) => {
        setCategorys(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleUpdate = async () => {
    const formData = new FormData();
    delete product.info
    delete product.images
    formData.append("file", file);
    Object.keys(product).forEach((key) => {
      const value = product[key] == null ? "" : product[key];
      formData.append(key, value);
    });
    Object.keys(info).forEach((key) => {
      const value = info[key] == null ? "" : info[key];
      formData.append(`info.${key}`, value);
    });
    const rs = await axios.put(
      `http://localhost:5000/api/book/${product._id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    // console.log(rs);
    setRefresh((prev) => prev + 1);
  };
  const handleAdd = async () => {
    console.log(file);
    const formData = new FormData();
    formData.append("file", file);
    Object.keys(product).forEach((key) => {
      const value = product[key] == null ? "" : product[key];
      formData.append(key, value);
    });
    Object.keys(info).forEach((key) => {
      const value = info[key] == null ? "" : info[key];
      formData.append(`info.${key}`, value);
    });
    // console.log(formData.get("name"));
    const rs = await axios.put(
      'http://localhost:5000/api/book/',
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(rs);
    setRefresh((prev) => prev + 1);
  };
  const handleDelete = async (id) => {
    const rs = await axios.delete(`http://localhost:5000/api/book/${id}`);
    console.log(rs);
    setRefresh((prev) => prev + 1);
  };

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.title}>
        <span>Danh sách sản phẩm</span>
        <button
          className={styles.btnAdd}
          data-bs-toggle="modal"
          data-bs-target="#edit"
          onClick={() => {
            setProduct({});
            setEdit(false);
          }}
        >
          <Icon icon={faPlus} /> Thêm
        </button>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr className="table-secondary text-center align-middle">
            <th scope="col" className="col-1">
              ẢNH
            </th>
            <th scope="col">TÊN SÁCH</th>
            <th scope="col" className="col-1">
              GIÁ
            </th>
            <th scope="col" className="col-1">
              GIẢM GIÁ
            </th>
            <th scope="col" className="col-1">
              SỐ LƯỢNG
            </th>
            <th scope="col" className="col-1">
              FREE SHIP
            </th>
            <th scope="col" className="col-1">
              HIỂN THỊ
            </th>
            <th scope="col" className="col-1" colSpan="3">
              TÁC VỤ
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
            <tr key={index} className="align-middle">
              <td className="text-center">
                <img src={item.images[0]??item.images[0]} className="w-100" alt="" />
              </td>
              <td>{item.name}</td>
              <td className="text-center">{formatMoney.format(item.price)}</td>
              <td className="text-center">{item.discount}%</td>
              <td className="text-center">{item.quantity}</td>
              <td className="text-center">
                <input
                  type="checkbox"
                  checked={item.freeShip === true ? true : false}
                  className="form-check-input border-primary border border-2"
                  onChange={() => {}}
                />
              </td>
              <td className="text-center">
                <input
                  type="checkbox"
                  checked={item.active === true ? true : false}
                  className="form-check-input border-primary border border-2"
                  onChange={() => {}}
                />
              </td>
              <td className="text-center">
                <button
                  className="text-primary"
                  data-bs-toggle="modal"
                  data-bs-target={`#info${item._id}`}
                >
                  <Icon icon={faArrowUpRightFromSquare} />
                </button>

                <div
                  className="modal fade"
                  id={`info${item._id}`}
                  tabIndex="-1"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
                    <div className="modal-content">
                      <div className="modal-header">
                        <div className="modal-title fs-5 fw-bold">
                          Thông tin chi tiết
                        </div>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body text-start">
                        <p className="text-uppercase">
                          Mã sách: <b>{item._id}</b>
                        </p>
                        <p>
                          Tên sách: <b>{item.name}</b>
                        </p>
                        <Row className={styles.tableModalInfoProd}>
                          <Col className="border-end">
                            <p>
                              <span>Danh mục:</span>
                              <b>{item.menu}</b>
                            </p>
                            <p>
                              <span>Danh mục con:</span>
                              <b>{item.type}</b>
                            </p>
                            <p>
                              <span>Tác giả:</span>
                              <b>{item.author}</b>
                            </p>
                            <p>
                              <span>Nhà xuất bản:</span>
                              <b>{item.publisher}</b>
                            </p>
                            <p>
                              <span>Mức đánh giá:</span>
                              <b>{item.star} sao</b>
                            </p>
                            <p>
                              <span>Ngôn ngữ:</span>
                              <b>{item.info.language}</b>
                            </p>
                            <p>
                              <span>Hình thức:</span>
                              <b>{item.info.formality}</b>
                            </p>
                          </Col>
                          <Col className="ps-3">
                            <p>
                              <span>Giá nhập:</span>
                              <b>{item.price}</b>
                            </p>
                            <p>
                              <span>Giá bán gốc:</span>
                              <b>{item.priceEntry}</b>
                            </p>
                            <p>
                              <span>Giảm giá:</span>
                              <b>{item.discount}%</b>
                            </p>
                            <p>
                              <span>Năm phát hành:</span>
                              <b>{item.info.publishYear}</b>
                            </p>
                            <p>
                              <span>Kích thước:</span>
                              <b>{item.info.size}</b>
                            </p>
                            <p>
                              <span>Trọng lượng:</span>
                              <b>{item.info.weight} gram</b>
                            </p>
                            <p>
                              <span>Số trang:</span>
                              <b>{item.info.page} trang</b>
                            </p>
                          </Col>
                        </Row>
                        <p className="mt-3">Mô tả: {item.info.description}</p>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-success me-2"
                          data-bs-dismiss="modal"
                        >
                          Đóng
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              <td className="text-center">
                <button
                  className="text-success"
                  data-bs-toggle="modal"
                  data-bs-target="#edit"
                  onClick={() => {
                    setProduct(item);
                    setEdit(true);
                    setInfo(item.info);
                  }}
                >
                  <Icon icon={faPenToSquare} />
                </button>
              </td>
              <td className="text-center">
                <button
                  className="text-danger"
                  onClick={() => {
                    handleDelete(item._id);
                  }}
                >
                  <Icon icon={faTrashCan} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        className="modal fade"
        id="edit"
        tabIndex="-1"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title fs-5 fw-bold">
                {edit ? "Chỉnh sửa danh mục" : "Thêm danh mục"}
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-start">
              <Row>
                <Col className="border-end pe-3 me-3">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label mb-1 fw-bold">
                      Tên sách
                    </label>
                    <input
                      value={product.name}
                      required
                      type="text"
                      id="name"
                      className="form-control"
                      onChange={(e) => {
                        setProduct((prev) => {
                          return { ...prev, name: e.target.value };
                        });
                      }}
                    />
                  </div>
                  <Row>
                    <Col>
                      <div className="mb-3">
                        <label className="form-label mb-1 fw-bold">
                          Danh mục
                        </label>
                        <select
                          className="form-select"
                          onChange={(e) => {
                            setProduct((prev) => {
                              return { ...prev, menu: e.target.value };
                            });
                          }}
                        >
                          {categorys.map((item, idx) => (
                            <option
                              key={idx}
                              selected={
                                product.menu === item.name ? true : false
                              }
                              value={item.name}
                            >
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </Col>
                    <Col>
                      <div className="mb-3">
                        <label className="form-label mb-1 fw-bold">
                          Thể loại
                        </label>
                        <select
                          className="form-select"
                          onChange={(e) => {
                            setProduct((prev) => {
                              return { ...prev, type: e.target.value };
                            });
                          }}
                        >
                          {categorys.map(
                            (category, idx) =>
                              category.name === product.menu &&
                              category.sub.map((sub) => (
                                <option
                                  key={idx}
                                  selected={
                                    product.type === sub.name ? true : false
                                  }
                                  value={sub.name}
                                >
                                  {sub.name}
                                </option>
                              ))
                          )}
                        </select>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="mb-3">
                        <label
                          htmlFor="author"
                          className="form-label mb-1 fw-bold"
                        >
                          Tác giả
                        </label>
                        <input
                          value={product.author}
                          required
                          type="text"
                          id="author"
                          className="form-control"
                          onChange={(e) => {
                            setProduct((prev) => {
                              return { ...prev, author: e.target.value };
                            });
                          }}
                        />
                      </div>
                    </Col>
                    <Col>
                      <div className="mb-3">
                        <label
                          htmlFor="publisher"
                          className="form-label mb-1 fw-bold"
                        >
                          Nhà xuất bản
                        </label>
                        <input
                          value={product.publisher}
                          required
                          type="text"
                          id="publisher"
                          className="form-control"
                          onChange={(e) => {
                            setProduct((prev) => {
                              return { ...prev, publisher: e.target.value };
                            });
                          }}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="mb-3">
                        <label
                          htmlFor="priceEntry"
                          className="form-label mb-1 fw-bold"
                        >
                          Giá nhập hàng (VND)
                        </label>
                        <input
                          value={product.priceEntry}
                          required
                          type="number"
                          id="priceEntry"
                          className="form-control"
                          onChange={(e) => {
                            setProduct((prev) => {
                              return { ...prev, priceEntry: e.target.value };
                            });
                          }}
                        />
                      </div>
                    </Col>
                    <Col>
                      <div className="mb-3">
                        <label
                          htmlFor="price"
                          className="form-label mb-1 fw-bold"
                        >
                          Giá bán ra (VND)
                        </label>
                        <input
                          value={product.price}
                          required
                          type="munber"
                          id="price"
                          className="form-control"
                          onChange={(e) => {
                            setProduct((prev) => {
                              return { ...prev, price: e.target.value };
                            });
                          }}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="mb-3">
                        <label
                          htmlFor="discount"
                          className="form-label mb-1 fw-bold"
                        >
                          Mức giảm giá (%)
                        </label>
                        <input
                          value={product.discount}
                          required
                          type="number"
                          id="discount"
                          className="form-control"
                          onChange={(e) => {
                            setProduct((prev) => {
                              return { ...prev, discount: e.target.value };
                            });
                          }}
                        />
                      </div>
                    </Col>
                    <Col>
                      <div className="mb-4">
                        <label
                          htmlFor="quantity"
                          className="form-label mb-1 fw-bold"
                        >
                          Số lượng [quyển]
                        </label>
                        <input
                          value={product.quantity}
                          required
                          type="number"
                          id="quantity"
                          className="form-control"
                          onChange={(e) => {
                            setProduct((prev) => {
                              return { ...prev, quantity: e.target.value };
                            });
                          }}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="freeShip"
                          onChange={(e) => {
                            setProduct((prev) => {
                              return { ...prev, freeShip: true };
                            });
                          }}
                          checked={product.freeShip}
                        />
                        <label class="form-check-label fw-bold" for="freeShip">
                          {" "}
                          Miển phí vận chuyển
                        </label>
                      </div>
                    </Col>
                    <Col>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="active"
                          onChange={(e) => {
                            setProduct((prev) => {
                              return { ...prev, active: true };
                            });
                          }}
                          checked={product.active}
                        />
                        <label class="form-check-label fw-bold" for="active">
                          {" "}
                          Hiển thị
                        </label>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Row>
                    <Col>
                      <div className="mb-3">
                        <label
                          htmlFor="publishYear"
                          className="form-label mb-1 fw-bold"
                        >
                          Năm xuất bản
                        </label>
                        <input
                          value={info.publishYear}
                          required
                          type="number"
                          id="publishYear"
                          className="form-control"
                          onChange={(e) => {
                            setInfo((prev) => {
                              return { ...prev, publishYear: e.target.value };
                            });
                          }}
                        />
                      </div>
                    </Col>
                    <Col>
                      <div className="mb-3">
                        <label
                          htmlFor="page"
                          className="form-label mb-1 fw-bold"
                        >
                          Số trang
                        </label>
                        <input
                          value={info.page}
                          required
                          type="number"
                          id="page"
                          className="form-control"
                          onChange={(e) => {
                            setInfo((prev) => {
                              return { ...prev, page: e.target.value };
                            });
                          }}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="mb-3">
                        <label
                          htmlFor="weight"
                          className="form-label mb-1 fw-bold"
                        >
                          Trọng lượng (gram)
                        </label>
                        <input
                          value={info.weight}
                          required
                          type="number"
                          id="weight"
                          className="form-control"
                          onChange={(e) => {
                            setInfo((prev) => {
                              return { ...prev, weight: e.target.value };
                            });
                          }}
                        />
                      </div>
                    </Col>
                    <Col>
                      <div className="mb-3">
                        <label
                          htmlFor="size"
                          className="form-label mb-1 fw-bold"
                        >
                          Kích thước
                        </label>
                        <input
                          value={info.size}
                          required
                          type="text"
                          id="size"
                          className="form-control"
                          onChange={(e) => {
                            setInfo((prev) => {
                              return { ...prev, size: e.target.value };
                            });
                          }}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="mb-3">
                        <label
                          htmlFor="language"
                          className="form-label mb-1 fw-bold"
                        >
                          Ngôn ngữ
                        </label>
                        <input
                          value={info.language}
                          required
                          type="text"
                          id="language"
                          className="form-control"
                          onChange={(e) => {
                            setInfo((prev) => {
                              return { ...prev, language: e.target.value };
                            });
                          }}
                        />
                      </div>
                    </Col>
                    <Col>
                      <div className="mb-3">
                        <label
                          htmlFor="formality"
                          className="form-label mb-1 fw-bold"
                        >
                          Hình thức
                        </label>
                        <input
                          value={info.formality}
                          required
                          type="text"
                          id="formality"
                          className="form-control"
                          onChange={(e) => {
                            setInfo((prev) => {
                              return { ...prev, formality: e.target.value };
                            });
                          }}
                        />
                      </div>
                    </Col>
                  </Row>
                  <div class="mb-3">
                    <label for="images" class="form-label mb-1 fw-bold">
                      Hình đại diện
                    </label>
                    <input
                      class="form-control"
                      type="file"
                      id="images"
                      onChange={(e) => {
                        setFile(e.target.files[0]);
                      }}
                    />
                  </div>
                  <div class="mb-3">
                    <label for="description" class="form-label mb-1 fw-bold">
                      Bài viết mô tả
                    </label>
                    <textarea
                      class="form-control"
                      id="description"
                      rows="3"
                      value={info.description}
                      onChange={(e) => {
                        setInfo((prev) => {
                          return { ...prev, description: e.target.value };
                        });
                      }}
                    ></textarea>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary me-2"
                data-bs-dismiss="modal"
                onClick={() => {
                  setProduct({});
                }}
              >
                Đóng
              </button>
              {edit ? (
                <button
                  type="button"
                  className="btn btn-success me-2"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    handleUpdate();
                  }}
                >
                  Cập nhật
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-success me-2"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    handleAdd();
                  }}
                >
                  Thêm
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProduct;
