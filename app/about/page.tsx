"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  NumberInput,
} from "@heroui/react";
import { mdiApps, mdiDatabasePlus } from "@mdi/js";
import Icon from "@mdi/react";

import { useState } from "react";
import numeral from "numeral";

export default function About() {
  const [productname, setProductname] = useState<string>("");
  const [modelname, setModelname] = useState<string>("");
  const [qty, setQty] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [payload, setPayload] = useState<{
    productname: string;
    modelname: string;
    qty: number;
    price: number;
  } | null>(null);

  const handleSubmit = () => {
    const payload = {
      productname,
      modelname,
      qty,
      price,
    };
    setPayload(payload);
  };

  return (
    <div className="flex flex-col md:flex-row p-8">
      <div className="flex-1">
        <Card className="w-auto md:max-w-md">
          <CardHeader className="border-b-5 border-primary-400">
            <Icon path={mdiApps} size={1} />
            <p className="ms-2 font-medium text-xl">Form Testing</p>
          </CardHeader>
          <CardBody className="space-y-2">
            <Input
              type="text"
              label="Product Name"
              onChange={(e) => setProductname(e.target.value)}
            />
            <Input
              type="text"
              label="Model Name"
              onChange={(e) => setModelname(e.target.value)}
            />
            <NumberInput
              label="Quantity"
              onChange={(value) => setQty(Number(value))}
            />
            <NumberInput
              label="Product Price"
              onChange={(value) => setPrice(Number(value))}
            />
          </CardBody>
          <CardFooter className="flex justify-center">
            <div>
              <Button
                className="bg-primary-500 text-white"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
      <div className="flex-2">
        <Card className="w-auto md:max-w-full">
          <CardHeader className="border-b-5 border-success-400">
            <Icon path={mdiDatabasePlus} size={1} />
            <p className="ms-2 font-medium text-xl">Data Input</p>
          </CardHeader>
          <CardBody className="p-3 space-y-3">
            <div className="flex gap-2">
              <p className="font-bold text-lg">Product Name: </p>
              <p className="font-medium text-lg">{payload?.productname}</p>
            </div>
            <div className="flex gap-2">
              <p className="font-bold text-lg">Model Name: </p>
              <p className="font-medium text-lg">{payload?.modelname}</p>
            </div>
            <div className="flex gap-2">
              <p className="font-bold text-lg">Qty: </p>
              <p className="font-medium text-lg">{payload?.qty}</p>
            </div>
            <div className="flex gap-2">
              <p className="font-bold text-lg">Price: </p>
              <p className="font-medium text-lg">
                {numeral(payload?.price).format("0,0")}
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
