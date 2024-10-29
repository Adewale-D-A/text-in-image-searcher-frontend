"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import canvasURL from "@/utils/canvas_to_img";

export default function BoundingBoxOnImage({
  anotation,
  rect,
  image,
}: {
  anotation?: {
    point: { x: number; y: number }[];
  }[];
  rect?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  image: string;
}) {
  const imageRef = useRef() as any;
  const canvasRef = useRef() as any;
  const [anotationImageBinary, setAnotationImageBinary] = useState();

  const PaintCanvas = useCallback(
    (
      annotationArray?: {
        point: { x: number; y: number }[];
      }[],
      rect?: {
        x: number;
        y: number;
        width: number;
        height: number;
      }
    ) => {
      //initialize canvas
      const ctx = canvasRef.current.getContext("2d");

      //get original image dimension
      const imgWidth = imageRef.current.naturalWidth;
      const imgHeight = imageRef.current.naturalHeight;

      //set canvas to be in the original dimension
      canvasRef.current.width = imgWidth;
      canvasRef.current.height = imgHeight;

      ctx.beginPath();
      if (annotationArray) {
        // using coordinate points to draw shape
        annotationArray?.forEach((item) => {
          item.point.forEach((annotationPoint) => {
            const xCoord = annotationPoint.x;
            const yCoord = annotationPoint.y;
            ctx.lineTo(xCoord, yCoord);
          });
          ctx.strokeStyle = "#FF0000";
          ctx.stroke();
          ctx.lineWidth = 3;
        });
      } else if (rect) {
        ctx.rect(rect?.x, rect?.y, rect?.width, rect?.height);
        ctx.strokeStyle = "#FF0000";
        ctx.stroke();
      }

      const imgUrl = canvasURL("canvas_id");
      setAnotationImageBinary(imgUrl);
    },
    [imageRef, canvasRef, image]
  );

  useEffect(() => {
    PaintCanvas(anotation, rect);
  }, [anotation, rect]);

  return (
    <div className="w-full">
      <div className="w-full relative">
        {(rect?.x || anotation) && (
          <Image
            src={anotationImageBinary || "/logo192.png"}
            alt="canvas overlay"
            className="w-full absolute top-0"
            height={500}
            width={500}
          />
        )}
        <Image
          height={500}
          width={500}
          src={image}
          alt="original image"
          className="w-full "
        />
      </div>
      {/* get canvas and image properties */}
      <div className="hidden">
        <Image
          src={image}
          alt="image placeholder"
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
