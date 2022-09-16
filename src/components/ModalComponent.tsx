import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import ITrialData from '../types/ITrialData';
import { api } from '../api/apis';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';

interface IProps{
    trialDataList: ITrialData[];
    setTrialDataList: (trialDataList: ITrialData[]) => void;
}

const ModalComponent:React.FC<IProps> = (props: IProps) => {
    const [show, setShow] = useState(false);
    const handleClose = () => {
      setFormData({
        id: 0,
        title: '',
        description: '',
        endDate: ''
      });
      setShow(false);
    }
    const handleShow = () => setShow(true);
    const [formData, setFormData] = useState<ITrialData>({
        id: props.trialDataList.length+1,
        title: '',
        description: '',
        endDate: ''
    });

    const createTrial = async (newTrialData:ITrialData | ITrialData[]) => {
        try {            
            const response = await api.post('/trials/', newTrialData);
            const trials:ITrialData[] = [...props.trialDataList, response.data];
            props.setTrialDataList(trials);
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e: any) => setFormData({...formData, [e.target.name]: e.target.value });
    const handleSubmit = (e: any) => {  
        setFormData({...formData, "id" : props.trialDataList.length+1});
        createTrial(formData);
        handleClose();

    };


   
  return (
    <>
    <IconButton onClick={handleShow} size="large"><AddBoxIcon fontSize="large" aria-label="add" className="icon-custom" /></IconButton>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Trial</Modal.Title>
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

            <Form.Group className='mb-3'>
                <Form.Label> Recruitment Ending Date: </Form.Label>
                <Form.Control type="date" value={formData.endDate} name="endDate" onChange={(e) => handleChange(e)} placeholder='Enter Conditions'></Form.Control>
            </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant='custom' className='btn-custom' onClick={(e) => handleSubmit(e)}>
          Create Trial
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  )
}

export default ModalComponent;