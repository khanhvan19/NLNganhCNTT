import { AdminHeader, AdminSilderBar } from "../views";

function AdminLayout({ children }) {
  

  return (
    <div>
      <AdminSilderBar />
      <div>
        <AdminHeader />
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;
