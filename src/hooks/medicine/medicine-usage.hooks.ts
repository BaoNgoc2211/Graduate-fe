import {
  getAllMedUsageAPI,
  getMedUsageAPI,
} from "@/api/medicine/medicine-usage.api";
import { IMedicineUsageGroup } from "@/interface/medicine/medicine-usage.interface";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export const useMedicineUsageGroup = () => {
  return useQuery<{ data: IMedicineUsageGroup[] }>({
    queryKey: ["medicine-usage"],
    queryFn: getAllMedUsageAPI,
  });
};
export const useMedicineUsageGroupById = () => {
  const params = useParams<{ _id: string }>();
  const usageId = params._id;
  console.log("UsageGroup ID:", usageId);
  const isIdReady = !!usageId;
  return useQuery({
    queryKey: ["medicine-usage-by-id", usageId],
    queryFn: () => getMedUsageAPI(usageId),
    enabled: isIdReady,
  });
};
