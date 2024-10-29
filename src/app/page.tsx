"use client";

import BoundingBoxOnImage from "@/components/bounging-box-on-image";
import LoadingButton from "@/components/button";
import FileInput from "@/components/input/fileInput";
import TextInput from "@/components/input/textInput";
import axios from "axios";
import { SyntheticEvent, useCallback, useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function Home() {
  const [file, setFile] = useState<{
    name: string;
    size: number;
    preview: string;
  }>({} as any);

  const [queryText, setQueryText] = useState("");
  const [coordinateInput, setCoordinateInput] = useState("");

  const [result, setResult] = useState("");
  const [parsedResult, setParsedResult] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  }>();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const makeRequest = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      try {
        setIsSubmitting(true);
        const response = await axios({
          method: "post",
          url: `${BASE_URL}/highlight-coordinates`,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer`,
          },
          withCredentials: false,
          data: {
            image: file,
            query: queryText,
          },
        });
        const { result } = response?.data;
        setResult(result || "");
      } catch (error) {
      } finally {
        setIsSubmitting(false);
      }
    },
    [file, queryText, BASE_URL]
  );

  const createBoundingBoxes = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      try {
        const parsedJson = JSON.parse(coordinateInput);
        setParsedResult(parsedJson); //{"x":298, "y":180, "width": 200, "height":200}
      } catch (error) {
        alert("invalid json bounding box");
      }
    },
    [coordinateInput]
  );

  return (
    <section className="w-full flex flex-col items-center my-8">
      <div className="w-full max-w-screen-xl flex flex-col gap-10">
        <form onSubmit={makeRequest} className=" flex flex-col gap-6">
          <FileInput value={file} setValue={setFile} id="image-upload" />
          <div className=" flex items-center gap-4">
            <TextInput
              value={queryText}
              setValue={setQueryText}
              inputType="text"
              id="query-search"
              placeholder="Input query text"
            />
            <div className=" w-fit">
              <LoadingButton
                type="submit"
                isLoading={isSubmitting}
                label="Upload"
              />
            </div>
          </div>
        </form>
        <div className=" p-3 bg-gray-100 rounded-lg">
          <p>{result}</p>
        </div>
        <form
          onSubmit={createBoundingBoxes}
          className=" flex items-center gap-4"
        >
          <TextInput
            value={coordinateInput}
            setValue={setCoordinateInput}
            inputType="text"
            id="bounding-box-coodinates"
            placeholder="Input bounding box coordinates i.e. { 'x': 268, 'y': 184, width: 50, height: 50}..."
          />
          <div className=" w-fit">
            <LoadingButton type="submit" isLoading={false} label="Draw Boxes" />
          </div>
        </form>
        {file?.preview && (
          // <BoundingBoxOnImage anotation={parsedResult} image={file?.preview} />
          <BoundingBoxOnImage image={file?.preview} rect={parsedResult} />
        )}
      </div>
    </section>
  );
}
