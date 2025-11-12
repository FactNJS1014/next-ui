"use client";

import {Button, Card, CardHeader, CardBody, CardFooter, Accordion, AccordionItem} from "@heroui/react";

export default function App() {
  const defaultContent = "The above command is for individual installation only. You may skip this step if @heroui/react is already installed globally."
  return (
    <div className="">
      <Button color="primary">Button</Button>
       <Card>
      <CardBody>
        <p>Make beautiful websites regardless of your design experience.</p>
      </CardBody>
    </Card>
     <Accordion>
      <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
        {defaultContent}
      </AccordionItem>
      <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
        {defaultContent}
      </AccordionItem>
      <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
        {defaultContent}
      </AccordionItem>
    </Accordion>
    </div>
  );
}
