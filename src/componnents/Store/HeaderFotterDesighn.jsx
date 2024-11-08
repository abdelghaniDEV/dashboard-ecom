import React from "react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import HeaderTemplate from "./HeaderTemplate";

function HeaderFotterDesighn() {
  return (
    <div>
      <Accordion type="single" collapsible className="pl-3">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-[16px] font-[500]">
            Hero Desighn
          </AccordionTrigger>
          <AccordionContent>
            <HeaderTemplate />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default HeaderFotterDesighn;
