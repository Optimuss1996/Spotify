import { useRef, useState } from "react";
import usePlayListModal from "@/hooks/usePlayListModal";
import Modal from "./Modal";
import uniqid from "uniqid";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import { FieldValues, useForm } from "react-hook-form";
import Button from "./Button";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ScaleLoader } from "react-spinners";

export default function PlayListModal() {
  const { onClose, isOpen } = usePlayListModal();
  const [isLoading, setIsLoading] = useState(false);
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();
  const router = useRouter();
  const [fileName, setFileName] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { register, reset, handleSubmit, setValue } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      description: "",
      image: null,
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileName(file.name);
      setImage(URL.createObjectURL(file));
      setValue("image", file, { shouldValidate: true });
    }
  };

  const handleRemoveFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setImage("");
    setFileName("");
  };

  function onChange(open: boolean) {
    if (!open) {
      onClose();
      reset();
      handleRemoveFile();
    }
  }

  async function onSubmit(values: FieldValues) {
    setIsLoading(true);

    const imageFile = values.image;
    const title = values.title;
    const description = values.description;

    if (!imageFile || !title || !user) {
      toast.error("Missing required fields");
      return;
    }

    try {
      const uniqueID = uniqid();
      const imagePath = `image-${values.title}-${uniqueID}`;

      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(imagePath, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });

      const { data: imageDataUrl } = supabaseClient.storage
        .from("images")
        .getPublicUrl(imagePath);
      const imagePublicUrl = imageDataUrl.publicUrl;

      if (imageError) {
        console.error("Image Upload Error:", imageError);
        setIsLoading(false);
        toast.error("Failed image upload.");
        return;
      }

      const { error: supabaseError } = await supabaseClient
        .from("playlists")
        .insert({
          user_id: user.id,
          title,
          description,
          image_path: imageData.path,
          image_url: imagePublicUrl,
        });

      if (supabaseError) {
        console.error("Supabase Insert Error:", supabaseError);
        setIsLoading(false);
        toast.error("Something went wrong");
        return;
      }

      router.refresh();
      toast.success("Playlist created!");
      reset();
      onClose();
    } catch (error) {
      console.error("Unexpected Error:", error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal
      title="Create your own playlist"
      description="Categorize your favorite music so you don't miss it!"
      isOpen={isOpen}
      onChange={onChange}
      className="md:max-w-[800px]"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="p-1">
        <div className="flex flex-col md:flex-row gap-y-3 gap-x-5 items-center">
          <div>
            <div className="flex justify-center items-center">
              <div className="rounded-lg w-48 flex flex-col gap-y-2 justify-center items-center">
                {/* CLICKABLE IMAGE AREA */}
                <div
                  className="w-full h-44 md:h-52 rounded-lg shadow-lg text-purple-600 flex justify-center items-center overflow-hidden bg-purple-300 dark:bg-gray-800 cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {image ? (
                    <img
                      className="w-full h-full object-cover"
                      src={image}
                      alt="Uploaded"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col justify-center items-center bg-purple-300 dark:bg-gray-800 rounded-lg">
                      <AiOutlineCloudUpload size={60} />
                      <span>Click to upload</span>
                    </div>
                  )}
                </div>

                {/* FILE NAME AND DELETE ICON */}
                <div className="w-full bg-purple-300 dark:bg-gray-800 rounded-lg">
                  <div className="w-full flex justify-between items-center p-2 rounded-lg">
                    <div className=" text-center">
                      {fileName ? "Selected file" : "No file selected"}
                    </div>
                    <TiDelete
                      size={25}
                      className="text-purple-600  cursor-pointer rounded-full"
                      onClick={handleRemoveFile}
                    />
                  </div>
                </div>

                {/* HIDDEN FILE INPUT */}
                <input
                  id="image"
                  disabled={isLoading}
                  {...register("image", { required: true })}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>

          {/* TEXT INPUTS */}
          <div className="flex-1 flex flex-col gap-y-3 justify-center">
            <input
              id="title"
              disabled={isLoading}
              {...register("title", { required: true })}
              type="text"
              placeholder="Playlist name"
              className="bg-purple-300 dark:bg-gray-800 w-full h-14 rounded-md outline-none border-none px-4 py-2 text-base  placeholder-gray-400 placeholder:text-gray-600"
            />
            <textarea
              id="description"
              disabled={isLoading}
              {...register("description", { required: true })}
              placeholder="Description"
              className="h-36 w-full px-4 py-2 bg-purple-300 dark:bg-gray-800 placeholder-gray-400 focus:outline-none rounded-md placeholder:text-gray-600"
            />
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <Button
          disabled={isLoading}
          type="submit"
          className="bg-purple-400 mt-4 hover:opacity-65 hover:bg-purple-400"
        >
          {isLoading ? (
            <ScaleLoader width={2} height={15} />
          ) : (
            "Create Playlist"
          )}
        </Button>
      </form>
    </Modal>
  );
}
