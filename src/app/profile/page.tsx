//#region original
// "use client";

// import { useState } from "react";
// import { CalendarIcon } from "lucide-react";
// import { AvatarUploader } from "@/components/profile/avatar-upload";
// import { ProfileField } from "@/components/profile/profile-field";

// const FormProfile = () => {
//   const [name, setName] = useState("Khách hàng");
//   const [birthday, setBirthday] = useState("");
//   const [gender, setGender] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [phone, setPhone] = useState("***** ***446");

//   const isDirty =
//     name !== "Khách hàng" ||
//     birthday !== "" ||
//     gender !== "" ||
//     email !== "" ||
//     password !== "";

//   return (
//     <div>
//       <h1 className="text-xl font-semibold mb-6">Thông tin cá nhân</h1>
//       <div className="bg-white rounded-lg p-6 shadow-sm flex flex-col lg:flex-row gap-10">
//         <AvatarUploader />

//         <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
//           <ProfileField label="Họ và tên">
//             <input
//               type="text"
//               className="w-full border border-gray-300 rounded px-3 py-2"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//           </ProfileField>

//           <ProfileField label="Số điện thoại">
//             <input
//               type="text"
//               className="w-full border border-gray-300 rounded px-3 py-2"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//             />
//           </ProfileField>

//           <ProfileField label="Ngày sinh">
//             <div className="relative">
//               <input
//                 type="date"
//                 className="w-full border border-gray-300 rounded px-3 py-2 pr-10"
//                 value={birthday}
//                 onChange={(e) => setBirthday(e.target.value)}
//               />
//               <CalendarIcon
//                 className="absolute right-3 top-2.5 text-gray-400"
//                 size={18}
//               />
//             </div>
//           </ProfileField>

//           <ProfileField label="Email">
//             <input
//               type="email"
//               className="w-full border border-gray-300 rounded px-3 py-2"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </ProfileField>

//           <ProfileField label="Giới tính">
//             <select
//               className="w-full border border-gray-300 rounded px-3 py-2"
//               value={gender}
//               onChange={(e) => setGender(e.target.value)}
//             >
//               <option value="">Chọn</option>
//               <option>Nam</option>
//               <option>Nữ</option>
//               <option>Khác</option>
//             </select>
//           </ProfileField>

//           <ProfileField label="Mật khẩu">
//             <input
//               type="password"
//               className="w-full border border-gray-300 rounded px-3 py-2"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </ProfileField>

//         </div>
//       </div>

//       <div className="mt-6">
//         <button
//           className={`px-4 py-2 rounded ${
//             isDirty ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-600"
//           }`}
//           disabled={!isDirty}
//         >
//           Lưu thay đổi
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FormProfile;
//#endregion
"use client";

import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { AvatarUploader } from "@/components/profile/avatar-upload";
import { ProfileField } from "@/components/profile/profile-field";
import { AddressFields } from "@/components/profile/profile/address fields";
import { useCallback } from "react";
const FormProfile = () => {
  const [name, setName] = useState("Khách hàng");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("***** ***446");
  const [address, setAddress] = useState({
    province: "",
    district: "",
    ward: "",
    detail: "",
  });
  const handleAddressChange = useCallback((val) => {
    setAddress(val);
  }, []);
  const isDirty =
    name !== "Khách hàng" ||
    birthday !== "" ||
    gender !== "" ||
    email !== "" ||
    password !== "" ||
    address.province !== "" ||
    address.district !== "" ||
    address.ward !== "" ||
    address.detail !== "";

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">Thông tin cá nhân</h1>
      <div className="bg-white rounded-lg p-6 shadow-sm flex flex-col lg:flex-row gap-10">
        <AvatarUploader />

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProfileField label="Họ và tên">
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </ProfileField>

          <ProfileField label="Số điện thoại">
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </ProfileField>

          <ProfileField label="Ngày sinh">
            <div className="relative">
              <input
                type="date"
                className="w-full border border-gray-300 rounded px-3 py-2 pr-10"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
              <CalendarIcon
                className="absolute right-3 top-2.5 text-gray-400"
                size={18}
              />
            </div>
          </ProfileField>

          <ProfileField label="Email">
            <input
              type="email"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </ProfileField>

          <ProfileField label="Giới tính">
            <select
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Chọn</option>
              <option>Nam</option>
              <option>Nữ</option>
              <option>Khác</option>
            </select>
          </ProfileField>

          <ProfileField label="Mật khẩu">
            <input
              type="password"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </ProfileField>
          <AddressFields onChange={handleAddressChange} />
        </div>
      </div>

      <div className="mt-6">
        <button
          className={`px-4 py-2 rounded ${
            isDirty ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-600"
          }`}
          disabled={!isDirty}
        >
          Lưu thay đổi
        </button>
      </div>
    </div>
  );
};

export default FormProfile;
