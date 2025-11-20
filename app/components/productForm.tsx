// components/ProductForm.tsx
"use client";

import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  FormEvent,
} from "react";
import {
  ProductData,
  initialProductData,
  categoryOptions,
  tagOptions,
  SelectOption,
} from "../types/product";
// นำเข้า Heroicons (ตัวอย่าง: CheckIcon, ExclamationCircleIcon)
import {
  CheckIcon,
  ExclamationCircleIcon,
  TagIcon,
} from "@heroicons/react/20/solid";

const ProductForm: React.FC = () => {
  const [productData, setProductData] =
    useState<ProductData>(initialProductData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const productNameRef = useRef<HTMLInputElement>(null);

  // --- Logic Hooks (useState, useEffect, useRef) ยังคงเดิม ---
  useEffect(() => {
    productNameRef.current?.focus();
    // เพิ่มการ Scroll ขึ้นด้านบนของฟอร์มเล็กน้อยเพื่อให้ดูดีขึ้น
    if (productNameRef.current) {
      productNameRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  useEffect(() => {
    console.log("Product Data Changed:", productData);
  }, [productData]);

  // --- Handlers (handleInputChange, handleMultiSelectChange, handleSubmit) ยังคงเดิม ---
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const target = e.target as HTMLInputElement;

    if (type === "checkbox") {
      const isChecked = target.checked;
      setProductData((prev) => ({
        ...prev,
        [name]: isChecked,
      }));
    } else {
      setProductData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleMultiSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    const selectedValues: string[] = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    setProductData((prev) => ({
      ...prev,
      tags: selectedValues,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      console.log("--- ข้อมูลสินค้าที่ส่งไป ---");
      console.log(productData);
      console.log("---------------------------");
      alert("บันทึกข้อมูลสินค้าสำเร็จ! ดูข้อมูลใน Console");

      setProductData(initialProductData);
      setIsSubmitting(false);
    }, 1500);
  };
  // -----------------------------------------------------------------

  return (
    <div className="max-w-3xl mx-auto my-8 p-6 bg-white shadow-xl rounded-lg border border-gray-100">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 flex items-center">
        <TagIcon className="w-8 h-8 mr-3 text-indigo-600" />
        ฟอร์มบันทึกสินค้าใหม่
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. Input Text (ชื่อสินค้า) */}
        <div>
          <label
            htmlFor="productName"
            className="block text-sm font-medium text-gray-700"
          >
            ชื่อสินค้า: <span className="text-red-500">*</span>
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="productName"
              name="productName"
              value={productData.productName}
              onChange={handleInputChange}
              ref={productNameRef}
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              placeholder="เช่น iPhone 15 Pro Max"
            />
          </div>
        </div>

        {/* 2. Select ธรรมดา (หมวดหมู่) */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            หมวดหมู่:
          </label>
          <div className="mt-1">
            <select
              id="category"
              name="category"
              value={productData.category}
              onChange={handleInputChange}
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border bg-white"
            >
              {categoryOptions.map((option: SelectOption) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 3. Select Multiple (แท็ก) */}
        <div>
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-gray-700"
          >
            แท็ก (เลือกได้หลายรายการ):
          </label>
          <div className="mt-1">
            <select
              id="tags"
              name="tags"
              multiple={true}
              value={productData.tags}
              onChange={handleMultiSelectChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border bg-white"
              style={{ minHeight: "120px" }}
            >
              {tagOptions.map((option: SelectOption) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 4. Checkbox (พร้อมจำหน่าย) */}
        <div className="relative flex items-start">
          <div className="flex h-6 items-center">
            <input
              type="checkbox"
              id="isAvailable"
              name="isAvailable"
              checked={productData.isAvailable}
              onChange={handleInputChange}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
          </div>
          <div className="ml-3 text-sm leading-6">
            <label htmlFor="isAvailable" className="font-medium text-gray-900">
              สินค้าพร้อมจำหน่าย
            </label>
            <p className="text-gray-500">ติ๊กเพื่อแสดงสินค้าในหน้าร้านค้า</p>
          </div>
        </div>

        {/* 5. Radio Button (ประเภทการจัดส่ง) */}
        <fieldset>
          <legend className="text-sm font-medium text-gray-700">
            ประเภทการจัดส่ง:
          </legend>
          <div className="mt-4 space-y-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="standard"
                name="shipmentType"
                value="standard"
                checked={productData.shipmentType === "standard"}
                onChange={handleInputChange}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label
                htmlFor="standard"
                className="ml-3 block text-sm font-medium text-gray-700"
              >
                Standard (3-5 วัน)
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="express"
                name="shipmentType"
                value="express"
                checked={productData.shipmentType === "express"}
                onChange={handleInputChange}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label
                htmlFor="express"
                className="ml-3 block text-sm font-medium text-gray-700"
              >
                Express (1-2 วัน)
              </label>
            </div>
          </div>
        </fieldset>

        {/* 6. Textarea (หมายเหตุ) */}
        <div>
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-gray-700"
          >
            หมายเหตุ/รายละเอียดเพิ่มเติม:
          </label>
          <div className="mt-1">
            <textarea
              id="notes"
              name="notes"
              value={productData.notes}
              onChange={handleInputChange}
              rows={4}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              placeholder="กรอกรายละเอียดเฉพาะของสินค้า..."
            />
          </div>
        </div>

        {/* ปุ่ม Submit */}
        <div className="pt-5">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex justify-center items-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white sm:text-sm 
              ${
                isSubmitting
                  ? "bg-indigo-300 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              }`}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <ExclamationCircleIcon className="w-5 h-5 mr-2 animate-pulse" />{" "}
                กำลังบันทึก...
              </span>
            ) : (
              <span className="flex items-center">
                <CheckIcon className="w-5 h-5 mr-2" /> บันทึกสินค้า
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
