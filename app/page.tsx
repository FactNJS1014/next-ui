"use client"; // จำเป็นสำหรับ HeroUI components และ Hooks

import {
  Form,
  Input,
  Button,
  NumberInput,
  DatePicker,
  Select,
  SelectItem,
} from "@heroui/react";
import { FormEvent, useState, useMemo } from "react";
import { format } from "date-fns";
import type { Selection } from "@heroui/react";
import Icon from "@mdi/react";
import { mdiContentSave } from "@mdi/js";
// 1. กำหนด Type สำหรับโครงสร้างข้อมูล
type FormDataState = {
  name: string;
  count: number;
  role: string;
  skills: string[];
  projectDate: string | null;
};

export default function BasicForm() {
  // 2. Data สำหรับ Selects
  const roles = [
    { key: "frontend", name: "Frontend Developer" },
    { key: "backend", name: "Backend Developer" },
    { key: "fullstack", name: "Full-Stack Developer" },
  ];

  const allSkills = [
    { key: "react", name: "React" },
    { key: "node", name: "Node.js" },
    { key: "sql", name: "SQL" },
    { key: "tailwind", name: "Tailwind CSS" },
  ];

  // 3. State หลักสำหรับฟอร์ม (ค่าสุดท้ายที่ต้องการ)
  const [formData, setFormData] = useState<FormDataState>({
    name: "",
    count: 0,
    role: "", // สำหรับ Single Select
    skills: [], // สำหรับ Multiple Select
    projectDate: null,
  });

  // 4. State สำหรับ Multiple Select โดยเฉพาะ (ต้องใช้ Set<string>)
  const [selectedSkillKeys, setSelectedSkillKeys] = useState<Selection>(
    new Set([])
  );

  // 5. แปลง Set<string> (Keys) เป็น Array<string> (Names) เมื่อมีการเลือก
  const selectedSkillNames = useMemo(() => {
    // กรองและแปลง key ที่ถูกเลือกเป็นชื่อภาษา
    return Array.from(selectedSkillKeys).filter((key) =>
      allSkills.some((skill) => skill.key === key)
    ) as string[];
  }, [selectedSkillKeys, allSkills]);

  // 6. ฟังก์ชัน Submit
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const submittedData: FormDataState = {
      // Input Text
      name: data.get("name")?.toString() || "",
      // Number Input
      count: Number(data.get("count")) || 0,
      // Single Select (ใช้ name จาก FormData ได้โดยตรง)
      role: data.get("role")?.toString() || "",
      // DatePicker
      projectDate: data.get("projectDate")?.toString() || null,
      // Multiple Select (ต้องดึงจาก state ที่ควบคุมไว้)
      skills: selectedSkillNames,
    };

    setFormData(submittedData);
    console.log("Submitted:", submittedData);
  };

  return (
    <div className="flex flex-col md:flex-row p-8 gap-8 ">
      {/* 📝 FORM AREA */}
      <div className="flex-1 w-auto p-6 bg-white shadow-xl rounded-lg h-fit md:max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-blue-600">
          Basic Registration Form
        </h2>
        <Form className="space-y-4" onSubmit={handleSubmit}>
          {/* 1. Input Text */}
          <Input
            placeholder="Your Name"
            type="text"
            name="name"
            label="Full Name"
          />

          {/* 2. Number Input */}
          <NumberInput
            placeholder="e.g., 5"
            name="count"
            label="Years of Experience"
            minValue={0}
          />

          {/* 3. Single Select */}
          <Select placeholder="Select your role" name="role" label="Job Role">
            {roles.map((role) => (
              <SelectItem key={role.key}>{role.name}</SelectItem>
            ))}
          </Select>

          {/* 4. Multiple Select (Controlled) */}
          <Select
            placeholder="Select core skills (Multi)"
            selectionMode="multiple"
            selectedKeys={selectedSkillKeys} // ผูก State
            onSelectionChange={setSelectedSkillKeys} // อัปเดต State
            label="Core Skills"
            name="skills" // สำหรับเป็น Key ใน FormData
          >
            {allSkills.map((skill) => (
              <SelectItem key={skill.key}>{skill.name}</SelectItem>
            ))}
          </Select>

          {/* 5. Date Picker */}
          <DatePicker name="projectDate" label="Start Date" />

          <Button
            className="w-full mt-6 bg-green-500 text-white font-semibold hover:bg-green-600"
            type="submit"
          >
            <Icon path={mdiContentSave} size={1} />
            Submit Data
          </Button>
        </Form>
      </div>

      {/* 📊 RESULT AREA */}
      <div className="flex-1 p-6 bg-white shadow-xl rounded-lg h-fit">
        <h3 className="text-xl font-bold mb-4 text-gray-700 border-b pb-2">
          Submitted Data Preview:
        </h3>
        <ul className="space-y-2">
          <li>**Name:** {formData.name || "-"}</li>
          <li>
            **Experience (Yrs):** {formData.count > 0 ? formData.count : "-"}
          </li>
          <li>**Role:** {formData.role || "-"}</li>
          <li>
            **Skills:**{" "}
            {formData.skills.length ? formData.skills.join(", ") : "-"}
          </li>
          <li>
            **Start Date:**{" "}
            {formData.projectDate
              ? format(new Date(formData.projectDate), "dd MMMM yyyy")
              : "-"}
          </li>
        </ul>
        <blockquote className="mt-4 p-3 border-l-4 border-yellow-500 bg-yellow-50 text-sm text-gray-600">
          **Note:** Single Select (`role`) และ Text/Number/Date ใช้ `FormData`
          โดยตรงได้ แต่ Multiple Select (`skills`) จำเป็นต้องใช้ `selectedKeys`
          และ `onSelectionChange` เพื่อควบคุม state อย่างที่เราแก้ไขไปครับ
        </blockquote>
      </div>
    </div>
  );
}
