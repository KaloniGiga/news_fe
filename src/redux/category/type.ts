export interface CategoryData {
  label: any;
  id: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryResponse {
  success: boolean;
  code: number;
  message: string;
  data: CategoryData[];
}
