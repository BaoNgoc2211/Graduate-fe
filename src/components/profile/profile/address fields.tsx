"use client";
import { useDistricts } from "@/hooks/profile/address/use-districts.hooks";
import { useProvinces } from "@/hooks/profile/address/use-provinces.hooks";
import { useWards } from "@/hooks/profile/address/use-wards.hooks";
import { useState, useEffect } from "react";
import { ProfileField } from "../profile-field";
import { District, Province, Ward } from "@/interface/auth/auth.interface";
interface AddressFieldsProps {
  onChange: (value: {
    province: string;
    district: string;
    ward: string;
    detail: string;
  }) => void;
}

export const AddressFields = ({ onChange }: AddressFieldsProps) => {
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [detail, setDetail] = useState("");

  const { data: provinces = [], isLoading: loadingProvince } = useProvinces();
  const provinceObj = provinces.find((p) => p.name === province);
  const { data: districts = [], isLoading: loadingDistrict } = useDistricts(provinceObj?.code);
  const districtObj = districts.find((d) => d.name === district);
  const { data: wards = [], isLoading: loadingWard } = useWards(districtObj?.code);

  useEffect(() => {
    onChange({ province, district, ward, detail });
  }, [province, district, ward, detail, onChange]);

  return (
    <>
      <ProfileField label="Tỉnh / Thành phố">
        <select
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={province}
          onChange={(e) => {
            setProvince(e.target.value);
            setDistrict("");
            setWard("");
          }}
        >
          <option value="">Chọn</option>
          {loadingProvince ? (
            <option>Đang tải...</option>
          ) : (
            provinces.map((p: Province) => (
              <option key={p.code}>{p.name}</option>
            ))
          )}
        </select>
      </ProfileField>

      <ProfileField label="Quận / Huyện">
        <select
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={district}
          onChange={(e) => {
            setDistrict(e.target.value);
            setWard("");
          }}
          disabled={!province}
        >
          <option value="">Chọn</option>
          {loadingDistrict ? (
            <option>Đang tải...</option>
          ) : (
            districts.map((d: District) => (
              <option key={d.code}>{d.name}</option>
            ))
          )}
        </select>
      </ProfileField>

      <ProfileField label="Phường / Xã">
        <select
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={ward}
          onChange={(e) => setWard(e.target.value)}
          disabled={!district}
        >
          <option value="">Chọn</option>
          {loadingWard ? (
            <option>Đang tải...</option>
          ) : (
            wards.map((w: Ward) => (
              <option key={w.code}>{w.name}</option>
            ))
          )}
        </select>
      </ProfileField>

      <ProfileField label="Địa chỉ chi tiết">
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          placeholder="Số nhà, tên đường..."
        />
      </ProfileField>
    </>
  );
};
