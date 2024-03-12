"use client"
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import React, { useRef } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import '../../../public/css/globals.css'
import '../manage-blogs/blogCard.css'

const TestimonialCard = ({ name, description, img, deleteTestimonial, _id }) => {
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()
    const editor = useRef(null);
    const btnRef = React.useRef(null);


    return (
        <div class="custom-container" data-aos="zoom-in" data-aos-duration="2000">
            <div className='flex justify-center items-center'>
                <img className="object-cover h-[15rem] w-[90%] rounded-2xl" src={img} alt="" />
            </div>

            <div className="p-3">
                <h5 className="text-black group-hover:text-white duration-150 font-[600] font-[Nunito] text-lg tracking-wider mb-3  text-center ">{name}</h5>
                <h5 className="text-gray-600 text-sm group-hover:text-white duration-150 font-[600] font-[Nunito] tracking-wide mb-3  text-center ">{description}</h5>

                <div className='w-[50%] ml-auto flex justify-end gap-4 items-end font-[Poppins] py-4 text-2xl'>
                    <button onClick={onDeleteOpen} className="text-red-500 cursor-pointer group-hover:text-white duration-150 tracking-wide "><AiFillDelete /></button>
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
                        <p className='font-[Poppins] text-center text-sm border-b border-gray-400 pb-1 px-8'>
                            Do You Want to Delete this Testimonial ?
                        </p>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className='flex flex-row gap-4 justify-center items-center'>
                            <Button colorScheme="green" size="sm" onClick={() => deleteTestimonial(_id)}>
                                <p className='font-[Poppins] font-[700]'>Yes</p>
                            </Button>
                            <Button colorScheme="red" size="sm" onClick={onDeleteClose}>
                                <p className='font-[Poppins] font-[400] tracking-wider'>No</p>
                            </Button>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>

        </div>
    )
}

export default TestimonialCard



