import UserRow from "./user-row";
import UserHead from "./user-head";
import { useEffect, useState } from "react";
import Modal from "./modal";
import { myFetch } from "@/util/functions";

const UserList = () => {
  const [users, setUsers] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [refetch, setRefetch] = useState(true);

  const getEmployeesData = async () => {
    const res = await fetch("http://localhost:8000/users");
    const { users } = await res.json();
    setUsers(users);
  };

  const createEmployee = async (newUser) => {
    await myFetch("http://localhost:8000/users/", "POST", newUser);
    hide();
    setRefetch(!refetch);
  };

  const updateEmployee = async (id, oldUser) => {
    console.log("UPDATE", id);
    await myFetch("http://localhost:8000/users/" + id, "PUT", oldUser);
    hide();
    setRefetch(!refetch);
  };

  useEffect(() => {
    getEmployeesData();
  }, [refetch]);

  const show = () => setIsOpen(() => true);
  const hide = () => setIsOpen(() => false);

  const handleAdd = () => {
    setIsNew(() => true);
    show();
  };

  const handleEdit = (user) => {
    console.log("ED", user);
    setSelectedUser(user);
    setIsNew(() => false);
    show();
  };

  return (
    <div className="overflow-x-auto">
      <div>
        <button className="btn btn-info btn-outline" onClick={handleAdd}>
          Ажилтан нэмэх
        </button>
      </div>
      <table className="table">
        <UserHead />
        <tbody>
          {users?.map((user) => (
            <UserRow user={user} handleEdit={handleEdit} />
          ))}
        </tbody>
      </table>

      <Modal
        isNew={isNew}
        isOpen={isOpen}
        close={hide}
        createEmployee={createEmployee}
        updateEmployee={updateEmployee}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
    </div>
  );
};

export default UserList;
