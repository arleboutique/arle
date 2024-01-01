"use client";
import { cn, convertirCamelCaseATitulo } from "@/app/_lib/utils";
import React, { useState } from "react";

type DetallesProductoProps = {
  detalles?: {
    [key: string]:
      | string
      | string[]
      | {
          [key: string]: string | string[];
        };
  };
  theme?: "dark" | "light";
};

const DetallesProducto = ({
  detalles,
  theme = "dark",
}: DetallesProductoProps) => {
  const [activeSection, setActiveSection] = useState<
    | string
    | string[]
    | {
        [key: string]: string | string[];
      }
  >(detalles ? Object.keys(detalles)[0] : "");

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  return (
    <section className="w-full h-full">
      <nav className="no-scrollbar lg:pt-4 flex md:justify-center justify-start overflow-x-auto overflow-y-hidden snap-x snap-mandatory w-full">
        {detalles &&
          Object.keys(detalles).map((detalle, index) => (
            <h4
              key={detalle + index+Math.random()}
              onClick={() => handleSectionChange(detalle)}
              className={cn(
                `px-4 py-2 border-b-2  whitespace-nowrap cursor-pointer`,
                theme == "dark" ? "border-zinc-700" : "border-zinc-200",
                activeSection === detalle &&
                  `${theme == "dark" ? "border-white" : "border-slate-800"}`
              )}>
              {convertirCamelCaseATitulo(detalle)}
            </h4>
          ))}
      </nav>

      <section
        className={cn(
          "mt-4 h-[285px] overflow-y-auto overflow-x-hidden no-scrollbar",
          theme == "light" ? "text-zinc-700" : "text-zinc-200"
        )}>
        {detalles &&
          Object.keys(detalles).map((detalle, index) => {
            let arrDetalles: JSX.Element[] = [];

            if (typeof detalles[detalle] === "string") {
              arrDetalles.push(
                <p className="w-72 text-lg font-normal font-tajawal leading-snug">
                  {detalles[detalle] as string}
                </p>
              );
            } else if (Array.isArray(detalles[detalle])) {
              // Es de tipo string[]
              arrDetalles.push(
                <section>
                  <p className="w-72 text-lg font-normal font-tajawal leading-snug">
                    {(detalles[detalle] as string[]).join(", ")}
                  </p>
                </section>
              );
            } else {
              // Es de tipo objeto
              arrDetalles.push(
                <>
                  {Object.keys(detalles[detalle]).map(object => (
                    <section key={index + object+Math.random()}>
                      <div className="pb-5">
                        <h4 className="w-72 text-lg font-bold font-tajawal leading-snug">
                          {convertirCamelCaseATitulo(object)}
                        </h4>
                        <p className="w-72 text-lg font-normal font-tajawal leading-snug">
                          {(detalles[detalle] as any)[object]}
                        </p>
                      </div>
                    </section>
                  ))}
                </>
              );
            }

            return (
              <React.Fragment key={index+"-"+Math.random()}>
                {arrDetalles.map(elementDetalle => (
                  <React.Fragment key={index+"-"+Math.random()}>{detalle == activeSection && elementDetalle}</React.Fragment>
                ))}
              </React.Fragment>
            );
          })}
      </section>
    </section>
  );
};

export default DetallesProducto;
