import { Eater } from "next/font/google";
import React, { useState } from "react";

const Modal = ({
  isNew,
  isOpen,
  close,
  createEmployee,
  updateEmployee,
  selectedUser,
  setSelectedUser,
}) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");

  const handleSave = () => {
    if (isNew) {
      createEmployee({
        firstname,
        lastname,
        email,
        position,
        profileImg: "https://img.daisyui.com/images/profile/demo/2@94.webp",
      });
    } else {
      updateEmployee(selectedUser.eid, selectedUser);
    }
    setFirstname("");
    setLastname("");
    setEmail("");
    setPosition("");
  };

  console.log(isOpen);
  return (
    <dialog open={isOpen} className="modal">
      <div className="w-11/12 max-w-5xl modal-box">
        <h3 className="text-lg font-bold">
          {isNew ? "New" : "Edit"} User Information Form
        </h3>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Нэрээ оруулна уу"
            className="w-full max-w-xs input input-bordered input-primary"
            value={isNew ? firstname : selectedUser.firstname}
            onChange={(e) => {
              if (isNew) {
                setFirstname(e.target.value);
              } else {
                setSelectedUser({ ...selectedUser, firstname: e.target.value });
              }
            }}
          />
          <input
            type="text"
            placeholder="Овог оо оруулна уу"
            className="w-full max-w-xs input input-bordered input-primary"
            value={isNew ? lastname : selectedUser.lastname}
            onChange={(e) => {
              if (isNew) {
                setLastname(e.target.value);
              } else {
                setSelectedUser({
                  ...selectedUser,
                  lastname: e.target.value,
                });
              }
            }}
          />
          <input
            type="email"
            placeholder="Имэйл ээ оруулна уу"
            className="w-full max-w-xs input input-bordered input-primary"
            value={isNew ? email : selectedUser.email}
            onChange={(e) => {
              if (isNew) {
                setEmail(e.target.value);
              } else {
                setSelectedUser({
                  ...selectedUser,
                  email: e.target.value,
                });
              }
            }}
          />
          <select
            className="w-full max-w-xs select select-primary"
            value={isNew ? position : selectedUser.position}
            onChange={(e) => {
              if (isNew) {
                setPosition(e.target.value);
              } else {
                setSelectedUser({
                  ...selectedUser,
                  position: e.target.value,
                });
              }
            }}
          >
            <option disabled selected>
              Мэргэжил ээ сонгоно уу
            </option>
            <option value="developer">Хөгжүүлэгч</option>
            <option value="accountant">Нягтлан</option>
            <option value="manager">Менежер</option>
            <option value="data analyst">Дата аналист</option>
          </select>
        </div>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn" onClick={handleSave}>
              Хадгалах
            </button>
            <button className="btn" onClick={close}>
              Хаах
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
