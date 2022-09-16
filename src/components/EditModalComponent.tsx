import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import ITrialData from '../types/ITrialData';
import { api } from '../api/apis';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

interface IProps{
    trialData: ITrialData;

    trialDataList: ITrialData[];
    setTrialDataList: (trialDataList: ITrialData[]) => void;
}

const ModalComponent:React.FC<IProps> = (props: IProps) => {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    const [formData, setFormData] = useState<ITrialData>({
        id: props.trialData.id,
        title: props.trialData.title,
        description: props.trialData.description,
        endDate: props.trialData.endDate
    });

    const updateTrial = async (data:ITrialData) => {
        try {
            const response = await api.put(`/trials/${data.id}`, data)
            props.setTrialDataList(props.trialDataList.map(trial => trial.id === data.id ? {...response.data} : trial));
           
        } catch (error) {
            console.log(error);
        }
      }

    const handleChange = (e: any) => setFormData({...formData, [e.target.name]: e.target.value });
    const handleSubmit = (e: any) => {  
        updateTrial(formData);
        handleClose();
    };

    const handleClose = () => {
        setShow(false);
      }


   
  return (
    <>
    <IconButton onClick={handleShow} className="icon-custom" aria-label="edit"><EditIcon /></IconButton>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Trial</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
            <Form.Group className='mb-3'>
                <Form.Label> Title: </Form.Label>
                <Form.Control type="text" value={formData.title} name="title" required onChange={(e) => handleChange(e)} placeholder='Enter Title'></Form.Control>
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Label> Description: </Form.Label>
                <Form.Control as="textarea" value={formData.description} name="description" onChange={(e) => handleChange(e)} placeholder='Enter Description' rows={3}></Form.Control>
            </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant='custom' className='btn-custom' onClick={(e) => handleSubmit(e)}>
          Update Trial
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  )
}

export default ModalComponent;