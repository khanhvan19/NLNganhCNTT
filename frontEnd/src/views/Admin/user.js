import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./Admin.module.css";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faPenToSquare} from "@fortawesome/free-regular-svg-icons";

function AdminUser() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/")
      .then((res) => {
        setUsers(res.data.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  const handleUpdate = async ()=>{
    await axios
    .put(`http://localhost:5000/api/auth/${user._id}`,user)
    setRefresh(prev => prev + 1)

  }

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.title}>
        <span>Danh sách khách hàng</span>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr className="table-secondary text-center">
            <th scope="col" className="col-1">
              STT
            </th>
            <th scope="col">HỌ TÊN</th>
            <th scope="col">E-MAIL</th>
            <th scope="col">ĐIỆN THOẠI</th>
            <th scope="col">TÀI KHOẢN</th>
            <th scope="col">TÁC VỤ</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item, index) => (
            <tr key={index}>
              <td className="text-center">{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td className="text-center">{item.phone}</td>
              <td className="text-center">{item.account}</td>
              <td className="text-center">
                <button
                  className="text-success"
                  data-bs-toggle="modal"
                  data-bs-target="#edit"
                  onClick={() => {
                    setUser(item);
                  }}
                >
                  <Icon icon={faPenToSquare} />
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
              <div className="modal-title fs-5 fw-bold">Chỉnh sửa danh mục</div>

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
                  Họ tên
                </label>
                <input
                  required
                  type="text"
                  id="name"
                  className="form-control"
                  placeholder="Họ tên"
                  value={user.name}
                  onChange={(e) => {
                    setUser((prev) => {
                      return { ...prev, name: e.target.value };
                    });
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Email
                </label>
                <input
                  required
                  type="email"
                  id="name"
                  className="form-control"
                  placeholder="Email"
                  value={user.email}
                  onChange={(e) => {
                    setUser((prev) => {
                      return { ...prev, email: e.target.value };
                    });
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Số diện thoại
                </label>
                <input
                  required
                  type="text"
                  id="name"
                  className="form-control"
                  placeholder="Số điện thoại"
                  value={user.phone}
                  onChange={(e) => {
                    setUser((prev) => {
                      return { ...prev, phone: e.target.value };
                    });
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Tên tài khoản
                </label>
                <input
                  required
                  type="text"
                  id="name"
                  className="form-control"
                  placeholder="Tên tài khoản"
                  value={user.account}
                  onChange={(e) => {
                    setUser((prev) => {
                      return { ...prev, account: e.target.value };
                    });
                  }}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary me-2"
                data-bs-dismiss="modal"
                onClick={() => {
                  setUser({});
                }}
              >
                Đóng
              </button>
              <button
                type="button"
                className="btn btn-success me-2"
                data-bs-dismiss="modal"
                onClick={()=>{
                  handleUpdate()
                }}
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUser;
