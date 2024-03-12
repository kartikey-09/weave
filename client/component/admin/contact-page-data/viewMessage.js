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
import '../manage-users/manageUsers.css'

const ViewMessage = ({ item }) => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);

  return (
    <>
      <button className='custom-button yellow' onClick={onOpen} ref={btnRef}>
        <p className='font-[Poppins] font-[400] tracking-wider p-1' >
          View
        </p>
      </button>

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
            <p className='font-[Poppins] text-center text-sm border-b border-gray-400 pb-1 px-4'>
              Message by <span className='ml-1  tracking-wider underline text-blue-600'>{item.name}</span>
            </p>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className='flex flex-col gap-3'>
              <div className='flex font-[Nunito] flex-col gap-4 p-4 font-[600] rounded-lg text-gray-900 bg-gray-200'>
                <p className='font-[800] text-blue-600'>Message</p>
                <p>{item.message}</p>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" size="sm" onClick={onClose}>
              <p className='font-[Poppins] font-[400] tracking-wider'
              >
                Close</p>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ViewMessage