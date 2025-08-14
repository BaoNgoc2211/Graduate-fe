// "use client";
// import { useDistricts } from "@/hooks/profile/address/use-districts.hooks";
// import { useProvinces } from "@/hooks/profile/address/use-provinces.hooks";
// import { useWards } from "@/hooks/profile/address/use-wards.hooks";
// import { useState, useEffect } from "react";
// import { ProfileField } from "../profile-field";
// import { District, Province, Ward } from "@/interface/auth/auth.interface";
// interface AddressFieldsProps {
//   onChange: (value: {
//     province: string;
//     district: string;
//     ward: string;
//     detail: string;
//   }) => void;
// }

// export const AddressFields = ({ onChange }: AddressFieldsProps) => {
//   const [province, setProvince] = useState("");
//   const [district, setDistrict] = useState("");
//   const [ward, setWard] = useState("");
//   const [detail, setDetail] = useState("");

//   const { data: provinces = [], isLoading: loadingProvince } = useProvinces();
//   const provinceObj = provinces.find((p) => p.name === province);
//   const { data: districts = [], isLoading: loadingDistrict } = useDistricts(provinceObj?.code);
//   const districtObj = districts.find((d) => d.name === district);
//   const { data: wards = [], isLoading: loadingWard } = useWards(districtObj?.code);

//   useEffect(() => {
//     onChange({ province, district, ward, detail });
//   }, [province, district, ward, detail, onChange]);

//   return (
//     <>
//       <ProfileField label="Tỉnh / Thành phố">
//         <select
//           className="w-full border border-gray-300 rounded px-3 py-2"
//           value={province}
//           onChange={(e) => {
//             setProvince(e.target.value);
//             setDistrict("");
//             setWard("");
//           }}
//         >
//           <option value="">Chọn</option>
//           {loadingProvince ? (
//             <option>Đang tải...</option>
//           ) : (
//             provinces.map((p: Province) => (
//               <option key={p.code}>{p.name}</option>
//             ))
//           )}
//         </select>
//       </ProfileField>

//       <ProfileField label="Quận / Huyện">
//         <select
//           className="w-full border border-gray-300 rounded px-3 py-2"
//           value={district}
//           onChange={(e) => {
//             setDistrict(e.target.value);
//             setWard("");
//           }}
//           disabled={!province}
//         >
//           <option value="">Chọn</option>
//           {loadingDistrict ? (
//             <option>Đang tải...</option>
//           ) : (
//             districts.map((d: District) => (
//               <option key={d.code}>{d.name}</option>
//             ))
//           )}
//         </select>
//       </ProfileField>

//       <ProfileField label="Phường / Xã">
//         <select
//           className="w-full border border-gray-300 rounded px-3 py-2"
//           value={ward}
//           onChange={(e) => setWard(e.target.value)}
//           disabled={!district}
//         >
//           <option value="">Chọn</option>
//           {loadingWard ? (
//             <option>Đang tải...</option>
//           ) : (
//             wards.map((w: Ward) => (
//               <option key={w.code}>{w.name}</option>
//             ))
//           )}
//         </select>
//       </ProfileField>

//       <ProfileField label="Địa chỉ chi tiết">
//         <input
//           type="text"
//           className="w-full border border-gray-300 rounded px-3 py-2"
//           value={detail}
//           onChange={(e) => setDetail(e.target.value)}
//           placeholder="Số nhà, tên đường..."
//         />
//       </ProfileField>
//     </>
//   );
// };
"use client";

import { useDistricts } from "@/hooks/profile/address/use-districts.hooks";
import { useProvinces } from "@/hooks/profile/address/use-provinces.hooks";
import { useWards } from "@/hooks/profile/address/use-wards.hooks";
import { useState, useEffect, useCallback } from "react";
import { ProfileField } from "../profile-field";
import { District, Province, Ward } from "@/interface/auth/auth.interface";
import { Loader2 } from "lucide-react";

interface AddressFieldsProps {
  onChange: (value: {
    province: string;
    district: string;
    ward: string;
    detail: string;
  }) => void;
  initialValue?: {
    province: string;
    district: string;
    ward: string;
    detail: string;
  };
}

export const AddressFields = ({ onChange, initialValue }: AddressFieldsProps) => {
  const [province, setProvince] = useState(initialValue?.province || "");
  const [district, setDistrict] = useState(initialValue?.district || "");
  const [ward, setWard] = useState(initialValue?.ward || "");
  const [detail, setDetail] = useState(initialValue?.detail || "");

  // API hooks
  const { data: provinces = [], isLoading: loadingProvince, error: provinceError } = useProvinces();
  
  // Find province object by name
  const provinceObj = provinces.find((p) => p.name === province);
  
  const { 
    data: districts = [], 
    isLoading: loadingDistrict, 
    error: districtError 
  } = useDistricts(provinceObj?.code);
  
  // Find district object by name
  const districtObj = districts.find((d) => d.name === district);
  
  const { 
    data: wards = [], 
    isLoading: loadingWard, 
    error: wardError 
  } = useWards(districtObj?.code);

  // Notify parent component of changes
  const notifyChange = useCallback(() => {
    onChange({ province, district, ward, detail });
  }, [province, district, ward, detail, onChange]);

  // Update parent when values change
  useEffect(() => {
    notifyChange();
  }, [notifyChange]);

  // Reset form values when initialValue changes
  useEffect(() => {
    if (initialValue) {
      setProvince(initialValue.province || "");
      setDistrict(initialValue.district || "");
      setWard(initialValue.ward || "");
      setDetail(initialValue.detail || "");
    }
  }, [initialValue]);

  // Handle province change
  const handleProvinceChange = (value: string) => {
    setProvince(value);
    setDistrict(""); // Reset district when province changes
    setWard(""); // Reset ward when province changes
  };

  // Handle district change
  const handleDistrictChange = (value: string) => {
    setDistrict(value);
    setWard(""); // Reset ward when district changes
  };

  // Render loading option
  const LoadingOption = () => (
    <option disabled>
      <span className="flex items-center gap-2">
        <Loader2 size={12} className="animate-spin" />
        Đang tải...
      </span>
    </option>
  );

  // Render error state
  const ErrorMessage = ({ error }: { error: Error }) => (
    <div className="text-red-500 text-xs mt-1">
      Lỗi: {error.message}
    </div>
  );

  return (
    <>
      {/* Province Field */}
      <ProfileField label="Tỉnh / Thành phố" required>
        <div>
          <select
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={province}
            onChange={(e) => handleProvinceChange(e.target.value)}
            disabled={loadingProvince}
          >
            <option value="">Chọn tỉnh / thành phố</option>
            {loadingProvince ? (
              <LoadingOption />
            ) : (
              provinces.map((p: Province) => (
                <option key={p.code} value={p.name}>
                  {p.name}
                </option>
              ))
            )}
          </select>
          {provinceError && <ErrorMessage error={provinceError} />}
        </div>
      </ProfileField>

      {/* District Field */}
      <ProfileField label="Quận / Huyện" required>
        <div>
          <select
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
            value={district}
            onChange={(e) => handleDistrictChange(e.target.value)}
            disabled={!province || loadingDistrict}
          >
            <option value="">
              {!province ? "Chọn tỉnh trước" : "Chọn quận / huyện"}
            </option>
            {loadingDistrict ? (
              <LoadingOption />
            ) : (
              districts.map((d: District) => (
                <option key={d.code} value={d.name}>
                  {d.name}
                </option>
              ))
            )}
          </select>
          {districtError && <ErrorMessage error={districtError} />}
        </div>
      </ProfileField>

      {/* Ward Field */}
      <ProfileField label="Phường / Xã" required>
        <div>
          <select
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
            value={ward}
            onChange={(e) => setWard(e.target.value)}
            disabled={!district || loadingWard}
          >
            <option value="">
              {!district ? "Chọn quận trước" : "Chọn phường / xã"}
            </option>
            {loadingWard ? (
              <LoadingOption />
            ) : (
              wards.map((w: Ward) => (
                <option key={w.code} value={w.name}>
                  {w.name}
                </option>
              ))
            )}
          </select>
          {wardError && <ErrorMessage error={wardError} />}
        </div>
      </ProfileField>

      {/* Detail Address Field */}
      <ProfileField label="Địa chỉ chi tiết">
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          placeholder="Số nhà, tên đường, tòa nhà..."
          maxLength={255}
        />
        <div className="text-xs text-gray-500 mt-1">
          {detail.length}/255 ký tự
        </div>
      </ProfileField>
    </>
  );
};