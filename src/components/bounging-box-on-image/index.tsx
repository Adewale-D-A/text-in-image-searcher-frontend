"use client";
import canvasURL from "@/utils/canvas_to_img";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export default function BoundingBoxOnImage({
  anotation,
  image,
}: {
  anotation: {
    point: { x: number; y: number }[];
  }[];
  image: string;
}) {
  const imageRef = useRef() as any;
  const canvasRef = useRef() as any;
  const [anotationImageBinary, setAnotationImageBinary] = useState();

  const PaintCanvas = useCallback(
    (
      annotationArray: {
        point: { x: number; y: number }[];
      }[]
    ) => {
      //initialize canvas
      const ctx = canvasRef.current.getContext("2d");

      //get original image dimension
      const imgWidth = imageRef.current.naturalWidth;
      const imgHeight = imageRef.current.naturalHeight;
      console.log({ imgWidth, imgHeight });
      //set canvas to be in the original dimension
      canvasRef.current.width = imgWidth;
      canvasRef.current.height = imgHeight;

      annotationArray.forEach((item) => {
        ctx.beginPath();
        item.point.forEach((annotationPoint) => {
          const xCoord = annotationPoint.x;
          const yCoord = annotationPoint.y;
          ctx.lineTo(xCoord, yCoord);
        });
        ctx.strokeStyle = "#FF0000";
        ctx.stroke();
        ctx.lineWidth = 3;
      });

      const imgUrl = canvasURL("canvas_id");
      setAnotationImageBinary(imgUrl);
    },
    [imageRef, canvasRef]
  );

  useEffect(() => {
    PaintCanvas(anotation);
  }, [anotation]);
  return (
    <div className="w-full">
      <div className="w-full relative">
        <Image
          src={anotationImageBinary || "/logo192.png"}
          alt="canvas overlay"
          className="w-full absolute top-0"
          height={500}
          width={500}
        />
        <img src={image} alt="crop" className="w-full " />
      </div>
      {/* get canvas and image properties */}
      <div className="hidden">
        <Image
          src={image}
          alt="screengrab"
          title=""
          ref={imageRef}
          className="w-full"
          height={500}
          width={500}
        />
        <canvas ref={canvasRef} id="canvas_id" className="w-full" />
      </div>
      {/* get canvas and image properties */}
    </div>
  );
}
