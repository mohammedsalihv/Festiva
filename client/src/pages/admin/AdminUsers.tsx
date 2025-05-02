import { Images } from "@/assets";
import AdminLayout from "@/reusable-components/admin/AdminLayout";
import { useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

const AdminUsers = () => {
  const [openUserData, setopenUserData] = useState(false);

  const users = [
    {
      id: 1,
      avatar: "https://i.pravatar.cc/150?img=1",
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
    },
    {
      id: 2,
      avatar: "https://i.pravatar.cc/150?img=2",
      name: "Bob Smith",
      email: "bob.smith@example.com",
    },
    {
      id: 3,
      avatar: "https://i.pravatar.cc/150?img=3",
      name: "Catherine Lee",
      email: "catherine.lee@example.com",
    },
    {
      id: 3,
      avatar: "https://i.pravatar.cc/150?img=4",
      name: "David Wright",
      email: "david.wright@example.com",
    },
    {
      id: 4,
      avatar: "https://i.pravatar.cc/150?img=5",
      name: "Emily Davis",
      email: "emily.davis@example.com",
    },
  ];

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row h-screen bg-main_white rounded-md font-prompt">
        <div className="w-full md:w-2/3 overflow-auto border-r p-4">
          <h2 className="text-xl font-semibold mb-3">Peoples</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th>*</th>
                <th>Person</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 gap-3">
              {users.map((user) => (
                <tr key={user.id} className="cursor-pointer hover:bg-gray-100">
                  <td>
                    <input type="checkbox" readOnly />
                  </td>
                  <td className="flex items-center space-x-2">
                    <img
                      src={Images.default_profile}
                      alt=""
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{user.name}</span>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <button className="border px-2 py-1 rounded">Block</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {openUserData ? (
          <div className="w-full md:w-1/3 p-4 bg-gray-50">
            <RiCloseFill className="w-6 h-6" onClick={() => setopenUserData(true)} />
            <h3 className="text-xl font-semibold mb-4"></h3>
            <div className="p-4 gap-4">
              <img
                src={Images.default_profile}
                alt=""
                className="w-24 h-24 mb-4"
              />
              <p>
                <strong>First name:</strong>Alice
              </p>
              <p>
                <strong>Last name:</strong>Johnson
              </p>
              <p>
                <strong>Email:</strong>alice.johnson@example.com
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span className="text-green-600 font-medium">Active</span>
              </p>
              <p>
                <strong>Registered time:</strong>
                {Date.now()}
              </p>
            </div>
          </div>
        ) : (
          <FaArrowUpRightFromSquare  onClick={() => setopenUserData(false)}/>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
