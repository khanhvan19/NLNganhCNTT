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
        <span>Danh s??ch s???n ph???m</span>
        <button
          className={styles.btnAdd}
          data-bs-toggle="modal"
          data-bs-target="#edit"
          onClick={() => {
            setProduct({});
            setEdit(false);
          }}
        >
          <Icon icon={faPlus} /> Th??m
        </button>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr className="table-secondary text-center align-middle">
            <th scope="col" className="col-1">
              ???NH
            </th>
            <th scope="col">T??N S??CH</th>
            <th scope="col" className="col-1">
              GI??
            </th>
            <th scope="col" className="col-1">
              GI???M GI??
            </th>
            <th scope="col" className="col-1">
              S??? L?????NG
            </th>
            <th scope="col" className="col-1">
              FREE SHIP
            </th>
            <th scope="col" className="col-1">
              HI???N TH???
            </th>
            <th scope="col" className="col-1" colSpan="3">
              T??C V???
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
                          Th??ng tin chi ti???t
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
                          M?? s??ch: <b>{item._id}</b>
                        </p>
                        <p>
                          T??n s??ch: <b>{item.name}</b>
                        </p>
                        <Row className={styles.tableModalInfoProd}>
                          <Col className="border-end">
                            <p>
                              <span>Danh m???c:</span>
                              <b>{item.menu}</b>
                            </p>
                            <p>
                              <span>Danh m???c con:</span>
                              <b>{item.type}</b>
                            </p>
                            <p>
                              <span>T??c gi???:</span>
                              <b>{item.author}</b>
                            </p>
                            <p>
                              <span>Nh?? xu???t b???n:</span>
                              <b>{item.publisher}</b>
                            </p>
                            <p>
                              <span>M???c ????nh gi??:</span>
                              <b>{item.star} sao</b>
                            </p>
                            <p>
                              <span>Ng??n ng???:</span>
                              <b>{item.info.language}</b>
                            </p>
                            <p>
                              <span>H??nh th???c:</span>
                              <b>{item.info.formality}</b>
                            </p>
                          </Col>
                          <Col className="ps-3">
                            <p>
                              <span>Gi?? nh???p:</span>
                              <b>{item.price}</b>
                            </p>
                            <p>
                              <span>Gi?? b??n g???c:</span>
                              <b>{item.priceEntry}</b>
                            </p>
                            <p>
                              <span>Gi???m gi??:</span>
                              <b>{item.discount}%</b>
                            </p>
                            <p>
                              <span>N??m ph??t h??nh:</span>
                              <b>{item.info.publishYear}</b>
                            </p>
                            <p>
                              <span>K??ch th?????c:</span>
                              <b>{item.info.size}</b>
                            </p>
                            <p>
                              <span>Tr???ng l?????ng:</span>
                              <b>{item.info.weight} gram</b>
                            </p>
                            <p>
                              <span>S??? trang:</span>
                              <b>{item.info.page} trang</b>
                            </p>
                          </Col>
                        </Row>
                        <p className="mt-3">M?? t???: {item.info.description}</p>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-success me-2"
                          data-bs-dismiss="modal"
                        >
                          ????ng
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
                {edit ? "Ch???nh s???a danh m???c" : "Th??m danh m???c"}
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
                      T??n s??ch
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
                          Danh m???c
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
                          Th??? lo???i
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
                          T??c gi???
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
                          Nh?? xu???t b???n
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
                          Gi?? nh???p h??ng (VND)
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
                          Gi?? b??n ra (VND)
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
                          M???c gi???m gi?? (%)
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
                          S??? l?????ng [quy???n]
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
                          Mi???n ph?? v???n chuy???n
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
                          Hi???n th???
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
                          N??m xu???t b???n
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
                          S??? trang
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
                          Tr???ng l?????ng (gram)
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
                          K??ch th?????c
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
                          Ng??n ng???
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
                          H??nh th???c
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
                      H??nh ?????i di???n
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
                      B??i vi???t m?? t???
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
                ????ng
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
                  C???p nh???t
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
                  Th??m
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
