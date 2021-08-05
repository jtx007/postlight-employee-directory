import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  useToast,
} from '@chakra-ui/react';
import { employeeApi } from '../api';

const DeleteModal = ({ employeeId, employeeName, employees, setEmployees }) => {
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef();

  const deleteEmployee = () => {
    setLoading(true);
    try {
      employeeApi.delete(`/employees/${employeeId}`);
      setEmployees(
        employees.filter(employee =>
          employee.id !== employeeId ? employee : null
        )
      );
    } catch (e) {
      setError(e);
    }
    setLoading(false);
    onClose();
    toast({
      title: 'Employee Deleted',
      position: 'top',
      status: 'success',
      isClosable: true,
    });
  };

  return (
    <>
      <Button bg="secondary" onClick={onOpen}>
        Delete
      </Button>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Employee</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete {employeeName} from the directory?
          </ModalBody>

          <ModalFooter>
            <Button
              isLoading={loading}
              onClick={deleteEmployee}
              bg="secondary"
              mr={3}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteModal;
