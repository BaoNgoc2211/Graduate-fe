import {
  getAllMDisUsageAPI,
  getDisUsageAPI,
} from "@/api/disease/disease-usage.api";
import { IDiseaseUsageGroup } from "@/interface/disease/disease-usage.interface";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export const useDiseaseUsageGroup = () => {
  return useQuery<{ data: IDiseaseUsageGroup[] }>({
    queryKey: ["disease-usage"],
    queryFn: getAllMDisUsageAPI,
  });
};
export const useDiseaseUsageGroupById = () => {
  const params = useParams<{ _id: string }>();
  const usageId = params._id;
  console.log("UsageGroup ID:", usageId);
  const isIdReady = !!usageId;
  return useQuery({
    queryKey: ["disease-usage-by-id", usageId],
    queryFn: () => getDisUsageAPI(usageId),
    enabled: isIdReady,
  });
};
