import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertTriangle, RefreshCw } from "lucide-react";

interface SymptomFormProps {
  symptoms: string;
  isLoading: boolean;
  error: string | null;
  isServiceAvailable: boolean;
  onSymptomsChange: (value: string) => void;
  onAgeChange?: (value: string) => void;
  onGenderChange?: (value: string) => void;
  onAnalyze: () => void;
  onReset: () => void;
}

export const SymptomForm = ({
  symptoms,
  isLoading,
  error,
  isServiceAvailable,
  onSymptomsChange,
  onAnalyze,
  onReset
}: SymptomFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="text-orange-500" />
          Mô tả triệu chứng
        </CardTitle>
        <CardDescription>
          Hãy mô tả chi tiết các triệu chứng bạn đang gặp phải để nhận được chẩn đoán sơ bộ
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="symptoms">Mô tả triệu chứng</Label>
          <Textarea
            id="symptoms"
            placeholder="Ví dụ: Tôi bị sốt 38.5°C, ho khan, đau họng, chảy nước mũi trong 2 ngày qua..."
            value={symptoms}
            onChange={(e) => onSymptomsChange(e.target.value)}
                         className="min-h-[120px] mt-2"
             disabled={isLoading || !isServiceAvailable}
          />
          <p className="text-xs text-gray-500 mt-1">
            Càng mô tả chi tiết, kết quả chẩn đoán càng chính xác
          </p>
        </div>
        
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex gap-2">
                     <Button 
             onClick={onAnalyze}
             disabled={isLoading || !symptoms.trim() || !isServiceAvailable}
             className="flex-1"
           >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang phân tích...
              </>
            ) : (
              "Phân tích triệu chứng"
            )}
          </Button>
                     <Button 
             variant="outline"
             onClick={onReset}
             disabled={isLoading || !isServiceAvailable}
           >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
