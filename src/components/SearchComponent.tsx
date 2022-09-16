import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ITrialData from '../types/ITrialData';
import { InputGroup } from 'react-bootstrap';
import { api, clinicalTrialsApi } from '../api/apis';

interface IProps{
    isSearched: boolean;
    setIsSearched: (isSearched: boolean) => void;
}

const SearchComponent: React.FC<IProps> = (props:IProps) => {
    const [IsError, setIsError] = useState(false)
    const [isLoading, setIsLßoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('');

    const createTrials = async (newTrialData:ITrialData | ITrialData[]) => {
        try {
            const response = await api.post('/trials/', newTrialData);
        } catch (error) {
            console.log(error);
        }
    }
     const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        fetchData();
        
    }
    const fetchData = async () => 
    {
        try {
            const response = await clinicalTrialsApi.get(`full_studies?expr="${searchTerm}"+AND+AREA%5BOverallStatus%5DRecruiting&min_rnk=1&max_rnk=50&fmt=json`)
            const jsonResponse = response.data;
            const fullStudies = jsonResponse.FullStudiesResponse.FullStudies;
            let trialDataList: ITrialData[] = [];

            for(var i = 0; i<fullStudies.length; i++)
           {
                const data:ITrialData =
                {
                    id: i+1,
                    title: fullStudies[i].Study.ProtocolSection.IdentificationModule.BriefTitle,
                    description: fullStudies[i].Study.ProtocolSection.DescriptionModule.BriefSummary,
                    endDate: fullStudies[i].Study.ProtocolSection.StatusModule.PrimaryCompletionDateStruct.PrimaryCompletionDate
                }
                
                trialDataList.push(data);
            }
            await createTrials(trialDataList).then(()=> props.setIsSearched(true));
            //props.setIsSearched(true);
           
         
        }catch(err)
        {
            setIsError(true);
           console.log(err.message);
        }
    }

    
  return (
    <>
    <div id="search-form"> 
        
        <Form noValidate onSubmit={handleSubmit} className='text-center w-100'>
            <Form.Label className='mb-4 fs-4 fw-normal'>Find Clincal Trials in the Recruiting Phase</Form.Label>
            <InputGroup className='mb-3'>
                <Form.Control 
                    type="text" 
                    size="lg"
                    placeholder="Enter Medical Condition" 
                    aria-describedby="search-bar"
                    value={searchTerm}
                    required
                    onChange={(e) => setSearchTerm(e.target.value)}
                    />   
                <Button variant='custom' className='btn-custom' type="submit" size="lg" id="search-bar">Search</Button>

            </InputGroup>
{/*          
            <Form.Control.Feedback type="invalid">
                    Please choose a username.
                </Form.Control.Feedback>
            <Form.Text id="error"></Form.Text>
             */}
        </Form>
    </div> 
    </>
  )
}

export default SearchComponent
