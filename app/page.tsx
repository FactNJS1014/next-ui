"use client";

import {Form, Input , Button, NumberInput,DatePicker} from "@heroui/react";
import { FormEvent, useState } from "react";

export default function App() {
  const [form, setForm] = useState({
    name: "",
    age: 0,
    birth: "" ,
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const data = {
      name: formData.get("name")?.toString(),
      age: formData.get("age"),
      birth: formData.get("birth")?.toString()

    }
    setForm(data)
  }

  const resetForm = () =>{
    setForm({ name: "", age: 0, birth: "" });
  }
  
  return (
    <div className="flex flex-col p-5 justify-center items-center space-y-5">
      <Form className="w-100 space-y-3" onSubmit={handleSubmit}>
        <Input placeholder="Name" type="text" name="name" />
        <NumberInput placeholder="Age" name="age"  />
        <DatePicker name="birth" />
        
        <div className="flex justify-center items-center gap-3">
          <Button className="bg-success-400 text-white font-semibold " type="submit">Submit</Button>
          <Button className="bg-blue-400 text-white font-semibold " type="button" onClick={resetForm}>Reset</Button>

        </div>

        

      </Form>

      <div className="mt-5">
        <p className="font-semibold text-blue-500">My name is {form.name} .</p>
        <p className="font-semibold text-blue-500">{form.age} years old.</p>
        <p className="font-semibold text-blue-500">BirthDay is {form.birth} .</p>
      </div>
    </div>
  );
}
