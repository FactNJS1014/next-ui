// types/product.ts

/**
 * Interface สำหรับข้อมูลสินค้า
 */
export interface ProductData {
  productName: string;
  category: string; // สำหรับ select ธรรมดา
  tags: string[]; // สำหรับ select multiple
  isAvailable: boolean; // สำหรับ checkbox
  shipmentType: "standard" | "express"; // สำหรับ radio button
  notes: string; // สำหรับ textarea (หรือ input text)
}

/**
 * Type สำหรับตัวเลือก (Option) ใน select/select multiple
 */
export interface SelectOption {
  value: string;
  label: string;
}

/**
 * ตัวอย่างข้อมูลเริ่มต้น (Initial State)
 */
export const initialProductData: ProductData = {
  productName: "",
  category: "electronics", // ตั้งค่าเริ่มต้นให้ตรงกับตัวเลือก
  tags: [],
  isAvailable: true,
  shipmentType: "standard", // ตั้งค่าเริ่มต้น
  notes: "",
};

/**
 * ตัวเลือกสำหรับ Select Category
 */
export const categoryOptions: SelectOption[] = [
  { value: "electronics", label: "เครื่องใช้ไฟฟ้า" },
  { value: "clothing", label: "เสื้อผ้า" },
  { value: "books", label: "หนังสือ" },
];

/**
 * ตัวเลือกสำหรับ Select Multiple Tags
 */
export const tagOptions: SelectOption[] = [
  { value: "new", label: "สินค้าใหม่" },
  { value: "sale", label: "ลดราคา" },
  { value: "bestseller", label: "สินค้าขายดี" },
];
