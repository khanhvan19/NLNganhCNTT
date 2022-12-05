import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./Admin.module.css";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function AdminCategory() {
    const [categorys, setCategorys] = useState([]);
  const [category, setCategory] = useState({});
  const [edit, setEdit] = useState(false);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/menu")
      .then((res) => {
        setCategorys(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  const handleUpdate = async ()=>{
    const rs = await axios
    .put(`http://localhost:5000/api/menu/${category._id}`,category)
    console.log(rs);
    setRefresh((prev)=>prev+1)
  }
  const handleAdd = async ()=>{
    const rs = await axios
    .post(`http://localhost:5000/api/menu/`,category)
    console.log(rs);
    setRefresh((prev)=>prev+1)
  }
  const handleDelete = async (id)=>{
    const rs = await axios
    .delete(`http://localhost:5000/api/menu/${id}`)
    console.log(rs);
    setRefresh((prev)=>prev+1)
  }

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.title}>
        <span>Danh sách danh mục</span>
        <button
          className={styles.btnAdd}
          data-bs-toggle="modal"
          data-bs-target="#edit"
          onClick={() => {
            setCategory({})
            setEdit(false)
          }}
        >
          <Icon icon={faPlus} /> Thêm
        </button>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr className="table-secondary text-center">
            <th scope="col" className="col-1">
              STT
            </th>
            <th scope="col">TÊN DANH MỤC</th>
            <th scope="col" className="col-2">
              HIỂN THỊ
            </th>
            <th scope="col" className="col-2" colSpan="2">
              TÁC VỤ
            </th>
          </tr>
        </thead>
        <tbody>
          {categorys.map((item, index) => (
            <tr key={index}>
              <td className="text-center">{index + 1}</td>
              <td>{item.name}</td>
              <td className="text-center">
                <input
                  type="checkbox"
                  checked={item.show === true ? true : false}
                  className="form-check-input border-primary border border-2"
                  onChange={() => {}}
                />
              </td>
              <td className="text-center">
                <button
                  className="text-success"
                  data-bs-toggle="modal"
                  data-bs-target="#edit"
                  onClick={() => {
                    setCategory(item)
                    setEdit(true)
                  }}
                >
                  <Icon icon={faPenToSquare} />
                </button>
              </td>
              <td className="text-center">
                <button className="text-danger" onClick={()=>{handleDelete(item._id)}}>
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
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              {edit ? (
                <div className="modal-title fs-5 fw-bold">
                  Chỉnh sửa danh mục
                </div>
              ) : (
                <div className="modal-title fs-5 fw-bold">Thêm danh mục</div>
              )}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-start">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Tên danh mục
                </label>
                <input
                  required
                  type="text"
                  id="name"
                  className="form-control"
                  placeholder="Tên danh mục"
                  value={category.name}
                  onChange={(e) => {setCategory((prev) => {
                    return { ...prev, name: e.target.value };
                })}}
                />
              </div>
              <div className="d-flex">
                <div className="form-check">
                  <input
                    type="radio"
                    id="true"
                    className="form-check-input"
                    name="display"
                    value={true}
                    onChange={(e) => {setCategory((prev) => {
                        return { ...prev, show: true };
                    })}}
                    checked={category.show}
                  />
                  <label className="form-check-label" htmlFor="true">
                    Hiện
                  </label>
                </div>
                <div className="form-check ms-5">
                  <input
                    className="form-check-input"
                    type="radio"
                    id="false"
                    name="display"
                    value={false}
                    onChange={(e) => {setCategory((prev) => {
                        return { ...prev, show: false };
                    })}}
                    checked={!category.show}
                  />
                  <label className="form-check-label" htmlFor="false">
                    Ẩn
                  </label>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary me-2"
                data-bs-dismiss="modal"
              >
                Đóng
              </button>
              {edit ? (
                <button
                  type="button"
                  className="btn btn-success me-2"
                  data-bs-dismiss="modal"
                  onClick={()=>{handleUpdate()}}
                >
                  Cập nhật
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-success me-2"
                  data-bs-dismiss="modal"
                  onClick={()=>{handleAdd()}}

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

export default AdminCategory;
