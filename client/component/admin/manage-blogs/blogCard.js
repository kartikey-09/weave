"use client";
import React, { useRef, useState, useContext } from "react";
import { AiFillDelete } from "react-icons/ai";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { Blogs, HandleImagesAPI } from "@/services/apis";
import { useSelector } from "react-redux";
import { apiConnector } from "@/services/apiconnector";
import toast from "react-hot-toast";
import JoditEditor from "jodit-react";
// import '../../../public/css/globals.css'
import "./blogCard.css";

const BlogCard = ({ _id, title, shortDesc, img, deleteBlog }) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const editor = useRef(null);
  const btnRef = React.useRef(null);

  const [selectedImages, setSelectedImages] = useState([]);
  const fileInputRef = useRef();

  const admin = useSelector((state) => state.admin);

  const handleImageChange = (e) => {
    const files = e.target.files;
    setSelectedImages([...selectedImages, ...files]);
  };

  const handleEdit = async () => {
    setLoading(true);
    try {
      const response = await apiConnector({
        method: "GET",
        url: Blogs.SingleBlog_API + `/${_id}`,
        headers: { token: admin.token },
      });
      setFormData({
        title: response.data.data.title,
        shortDescription: response.data.data.shortDescription,
        briefDescription: response.data.data.briefDescription,
      });
      console.log("response", response);
    } catch (error) {
      toast.error(error?.message);
    }
    setLoading(false);
  };
  const changeHandler = (e) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const updateData = async (e) => {
    setLoading(true);
    e.preventDefault();

    let images;
    try {
      const formImageData = new FormData();
      selectedImages.forEach((image) => {
        formImageData.append("images", image);
      });
      let response = await apiConnector({
        method: "POST",
        url: HandleImagesAPI.UploadImage_API,
        bodyData: formImageData,
      });
      if (response.data.success) {
        images = response?.data?.data?._id;
      }
      if (images) {
        response = await apiConnector({
          method: "PUT",
          url: Blogs.UpdateBlog_API + `/${_id}`,
          bodyData: {
            imgUrlModelDBId: images,
            title: formData.title,
            shortDescription: formData.shortDescription,
            briefDescription: formData.briefDescription,
          },
          headers: { token: admin.token },
        });
        if (response?.data?.success) {
          toast.success(response?.data?.message);
          setFormData({ date: "", title: "", shortDesc: "", briefDesc: "" });
          setSelectedImages([]);
          fileInputRef.current.value = "";
        }
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
    }
    setLoading(false);
  };

  return (
    <div class="custom-container" data-aos="zoom-in" data-aos-duration="2000">
      <div className="flex justify-center items-center">
        <img
          className="object-cover h-[7rem] w-[90%] rounded-2xl"
          src={img}
          alt=""
        />
      </div>
      <div className="p-3">
        <h5 className="text-black hover:text-white duration-150 font-[600] font-[Nunito] text-lg tracking-wider mb-3  text-center ">
          {title}
        </h5>

        <h5 className="text-gray-600 text-sm group-hover:text-white duration-150 font-[600] font-[Nunito] tracking-wider mb-3  text-center ">
          {shortDesc.slice(0, 150) + "..."}
        </h5>

        <div className="flex w-full justify-center items-center">
          <Link
            href={`/blogs/${_id}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 group-hover:bg-white group-hover:text-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            Read more
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
        </div>

        {/* onClick={() => deleteBlog(_id)} */}

        <div className="w-[50%] ml-auto flex justify-end gap-4 items-end font-[Poppins] py-3 text-2xl">
          <button
            onClick={onDeleteOpen}
            className="text-red-500 cursor-pointer group-hover:text-white duration-150 tracking-wide "
          >
            <AiFillDelete />
          </button>
          <button
            onClick={onOpen}
            ref={btnRef}
            className="cursor-pointer text-blue-700 group-hover:text-white duration-150 tracking-wide"
          >
            <FaRegEdit onClick={handleEdit} />
          </button>
        </div>
      </div>

      {/* Delete Blog Modal */}
      <Modal
        onClose={onDeleteClose}
        finalFocusRef={btnRef}
        isOpen={isDeleteOpen}
        scrollBehavior="outside"
        size="sm"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <p className="font-[Poppins] text-center text-sm border-b border-gray-400 pb-1 px-8">
              Do You Want to Delete this Blog ?
            </p>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex flex-row gap-4 justify-center items-center">
              <Button
                colorScheme="green"
                size="sm"
                onClick={() => deleteBlog(_id)}
              >
                <p className="font-[Poppins] font-[700]">Yes</p>
              </Button>
              <Button colorScheme="red" size="sm" onClick={onDeleteClose}>
                <p className="font-[Poppins] font-[400] tracking-wider">No</p>
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Edit Modal */}
      <Modal
        onClose={onClose}
        finalFocusRef={btnRef}
        isOpen={isOpen}
        scrollBehavior="outside"
        size="3xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <p className="font-[Poppins] text-center text-sm border-b border-gray-400 pb-1 px-4">
              Edit Data
            </p>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex flex-col gap-3">
              <div className="flex font-[Nunito] flex-col gap-4 p-4 font-[600] rounded-lg text-gray-900 bg-gray-200">
                <p className="font-[800] text-blue-600">Thumbnail</p>
                <input
                  className="relative m-0 block w-full min-w-0 flex-auto rounded border-2 border-solid border-black bg-clip-padding px-3 py-2 font-normal text-gray-900 text-sm font-[Poppins] transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-2 file:text-gray-900 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-gray-900 focus:shadow-te-primary focus:outline-none mt-1 "
                  type="file"
                  id="formFileMultiple"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                />
              </div>
              <div className="flex font-[Nunito] flex-col gap-4 p-4 font-[600] rounded-lg text-gray-900 bg-gray-200">
                <p className="font-[800] text-blue-600">Title</p>
                <input
                  type={"text"}
                  name="title"
                  value={formData.title}
                  onChange={changeHandler}
                  className="py-2 pl-2 bg-transparent border border-blue-600 rounded-lg"
                />
              </div>

              <div className="flex font-[Nunito] flex-col gap-4 p-4 font-[600] rounded-lg text-gray-900 bg-gray-200">
                <p className="font-[800] text-blue-600">Short Description</p>
                <input
                  type={"text"}
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={changeHandler}
                  className="py-2 pl-2 bg-transparent border border-blue-600 rounded-lg"
                />
              </div>

              <div className="flex font-[Nunito] flex-col gap-4 p-4 font-[600] rounded-lg text-gray-900 bg-gray-200">
                <p className="font-[800] text-blue-600">Brief Description</p>
                <JoditEditor
                  ref={editor}
                  value={formData.briefDescription}
                  tabIndex={1}
                  onChange={(newContent) =>
                    setFormData((prevFormData) => {
                      return {
                        ...prevFormData,
                        briefDescription: newContent,
                      };
                    })
                  }
                  onBlur={(newContent) =>
                    setFormData((prevFormData) => {
                      return {
                        ...prevFormData,
                        briefDescription: newContent,
                      };
                    })
                  }
                />
              </div>
              {loading ? (
                <></>
              ) : (
                <button
                  onClick={updateData}
                  className="font-[Nunito] font-[800] text-white bg-black px-4 py-2 rounded-lg w-fit duration-200 transition-all hover:scale-[1.05] shadow-2xl"
                >
                  Update Data
                </button>
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" size="sm" onClick={onClose}>
              <p className="font-[Poppins] font-[400] tracking-wider">Close</p>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default BlogCard;
