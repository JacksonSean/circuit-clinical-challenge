import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { TrialTable } from './TrialTable'
import ITrialData from '../types/ITrialData';
import {api} from '../api/apis'
import ModalComponent from './ModalComponent';

interface IProps {

}

export const ResultsComponent:React.FC<IProps> = (props:IProps) => {
    const [trialDataList, setTrialDataList] = useState<ITrialData[]>([]);
    const [updatedTrial, setUpdatedTrial] = useState<ITrialData>();


const updateTrial = async (id:string) => {
    try {
        const response = await api.put(`/trials/${id}`, updatedTrial)
    } catch (error) {
        console.log(error);
    }
  }
  
  useEffect(() => {
  
    const fetchTrials = async () => {
        try {
            const response = await api.get('/trials/');
            setTrialDataList(response.data);

        } catch (error) {
            console.log(error);
        }
    }
    fetchTrials();
 
}, [])
  
  return (
    <Container id="table-container" className='w-80 rounded-4'>
        <TrialTable trialDataList={trialDataList} setTrialDataList={setTrialDataList}></TrialTable>
    </Container>
 
  )
}
