import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./Admin.module.css";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function AdminSubCategory() {
  const [categorys, setCategorys] = useState([]);
  const [category, setCategory] = useState({});
  const [refresh, setRefresh] = useState(0);
  const [edit, setEdit] = useState(false);
  var idx = 0;

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
    // console.log(category);
    const rs = await axios
    .put(`http://localhost:5000/api/menu/${category.parent}/${category._id}`,category)
    console.log(rs);
    setRefresh((prev)=>prev+1)
  }
  const handleAdd = async ()=>{
    const rs = await axios
    .post(`http://localhost:5000/api/menu/${category.parent}`,category)
    console.log(rs);
    setRefresh((prev)=>prev+1)
  }
  const handleDelete = async (parent,id)=>{
    const rs = await axios
    .delete(`http://localhost:5000/api/menu/${parent}/${id}`)
    console.log(rs);
    setRefresh((prev)=>prev+1)
  }

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.title}>
        <span>Danh sách danh mục con</span>
        <button
          className={styles.btnAdd}
          data-bs-toggle="modal" data-bs-target="#edit"
          onClick={() => {
            setCategory({});
            setEdit(false);
          }}
        >
          <Icon icon={faPlus} /> Thêm
        </button>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr className="table-secondary text-center">
            <th scope="col" className="col-1">static</th>
            <th scope="col">TÊN DANH MỤC CON</th>
            <th scope="col">DANH MỤC</th>
            <th scope="col" className="col-2">HIỂN THỊ</th>
            <th scope="col" className="col-2" colSpan="2">TÁC VỤ</th>
          </tr>
        </thead>
        <tbody>
          {categorys.map((category) =>
            category.sub != null && category.sub.map((item) => {
              idx += 1;
              return (
                <tr key={item._id}>
                <td className="text-center">{idx}</td>
                <td>{item.name}</td>
                <td>{category.name}</td>
                <td className="text-center">
                    <input
                    type="checkbox"
                    checked={item.show}
                    className="form-check-input border-primary border border-2"
                    onChange={() => {}}
                    />
                </td>
                <td className="text-center">
                    <button
                    className="text-success"
                    data-bs-toggle="modal" data-bs-target="#edit"
                    onClick={() => {
                        setCategory({...item, parent : category.name});
                        setEdit(true);
                    }}
                    >
                    <Icon icon={faPenToSquare} />
                    </button>
                </td>
                <td className="text-center">
                    <button className="text-danger" onClick={()=>{
                      handleDelete(category.name,item._id)
                    }}>
                    <Icon icon={faTrashCan} />
                    </button>
                </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      <div
        className="modal fade" id="edit" tabIndex="-1"
        aria-hidden="true" data-bs-backdrop="static"data-bs-keyboard="false"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
                <div className="modal-title fs-5 fw-bold">
                  {edit ? 'Chỉnh sửa danh mục' : 'Thêm danh mục'}
                </div>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body text-start">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Tên danh mục</label>
                <input
                  required
                  type="text"
                  id="name"
                  className="form-control"
                  placeholder="Tên danh mục"
                  value={category.name}
                  onChange={(e) => {
                    setCategory((prev) => {
                      return { ...prev, name: e.target.value };
                    });
                  }}
                />
              </div>
              <div className="mb-3">
                <select className="form-select" disabled={edit} onChange={(e) => {
                    setCategory((prev) => {
                      return { ...prev, parent: e.target.value };
                    });
                  }}>
                    <option>-- Chọn danh mục --</option>
                    {categorys.map((item, idx) => (
                        <option 
                            key={idx} 
                            selected = {item.name === category.parent  ? true : false}
                            value={item.name}
                        >{item.name}</option>
                    ))}
                </select>
              </div>
              <div className="d-flex">
                <div className="form-check">
                  <input
                    type="radio"
                    id="true"
                    className="form-check-input"
                    name="display"
                    value={true}
                    onChange={(e) => {
                        setCategory((prev) => {
                            return { ...prev, show: true };
                          });
                        }}
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
                    onChange={(e) => {
                        setCategory((prev) => {
                            return { ...prev, show: false };
                          });
                        }}
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
                onClick={() => {
                  setCategory({});
                }}
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

export default AdminSubCategory;
