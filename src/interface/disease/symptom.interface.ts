export interface Symptom {
  name: string; // nhức đầu
  kindOf: KindOf[]; // nặng nhẹ
  symptomGroup: string;
}
export interface KindOf {
  name: string;
}
