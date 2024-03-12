"use client"
import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
} from '@chakra-ui/react'
const ViewCenterText = ({ item, deleteNavbarSingleText }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef(null);

    return (
        <>
            <Button colorScheme="teal" size="sm" onClick={onOpen} ref={btnRef}>
                <p className='font-[Poppins] font-[400] tracking-wider' >
                    View More
                </p>
            </Button>

            <Modal
                onClose={onClose}
                finalFocusRef={btnRef}
                isOpen={isOpen}
                scrollBehavior="outside"
                size="xl"
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <p className='font-[Poppins] text-center text-3xl text-white bg-black border-b border-gray-400 pb-1 px-2'>
                            Center Text Data
                        </p>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {
                            item.textNLink.map((textLink, index) => {
                                return (
                                    <div key={index} className='flex flex-col gap-3 mt-2 border rounded-lg border-black p-2'>
                                        <div className='flex font-[Nunito] flex-col gap-4 p-4 font-[600] rounded-lg text-gray-900 bg-gray-200'>
                                            <p className='font-[800] text-blue-600'>Display Text</p>
                                            <p>{textLink.displayText}</p>
                                        </div>
                                        <div className='flex font-[Nunito] flex-col gap-4 p-4 font-[600] rounded-lg text-gray-900 bg-gray-200'>
                                            <p className='font-[800] text-blue-600'>Link</p>
                                            <p>{textLink.link}</p>
                                        </div>
                                        {
                                            item?.textNLink?.length > 1 ? (<p className='cursor-pointer text-xs px-4 py-2 bg-red-600 text-white rounded-lg w-fit ml-auto' onClick={() => deleteNavbarSingleText(item._id, index)}>Delete</p>) : (<></>)
                                        }

                                    </div>
                                )
                            })
                        }
                    </ModalBody>
                    <ModalFooter>
                        <Button className='mr-auto' colorScheme="red" size="sm" onClick={onClose}>
                            <p className='font-[Poppins] font-[400] tracking-wider'>Close</p>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ViewCenterText
