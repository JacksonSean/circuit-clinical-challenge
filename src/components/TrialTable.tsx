import React from 'react'
import DataTable, { TableColumn } from 'react-data-table-component';
import { api } from '../api/apis';
import ITrialData from '../types/ITrialData';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalComponent from './ModalComponent';
import EditModalComponent from './EditModalComponent';

interface IProps{
    trialDataList: ITrialData[];
    setTrialDataList: (trialDataList: ITrialData[]) => void;
}

export const TrialTable:React.FC<IProps> = (props:IProps) => {
    const columns: TableColumn<ITrialData>[] = [
        {
            name: 'Id',
            selector: (row: { id: number; }) => row.id,
            sortable: true, 
            width: "75px"
        },
        {
            name: 'Title',
            selector: (row: { title: string; }) => row.title,
            sortable: true,
            wrap: true
        },
        {
            name: 'Completion Date',
            selector: (row: { endDate: string; }) => row.endDate,
            sortable: true,
    
        },
        {
            name: 'Action',
            cell: (row) => <><EditModalComponent trialData={row} trialDataList={props.trialDataList} setTrialDataList={props.setTrialDataList}/><IconButton onClick={(e) => deleteTrial('' + row.id)} className="icon-custom" aria-label="delete"><DeleteIcon /></IconButton></>
            
        }
    ]
  

    const ExpandedComponent = ({ data }: {data:ITrialData}) => <p>{data.description}</p>;
    
    const subHeaderComponent = (
    	<div style={{ display: 'flex', alignItems: 'center' }}>
            <ModalComponent setTrialDataList={props.setTrialDataList} trialDataList={props.trialDataList}/> 
    	</div>
    );

    const deleteTrial = async (id:string) =>
    {
      try {
          await api.delete(`/trials/${id}`);
          const trials = props.trialDataList.filter(trial => trial.id + '' != id);
          props.setTrialDataList(trials);
      } catch (error) {
          console.log(error);
      }
    }

  return (
    <DataTable
        title="Clincal Trials in Recruiting Phase"
        columns={columns}
        data={props.trialDataList}
        fixedHeaderScrollHeight="300px"
        pagination
        responsive
        subHeader
        subHeaderComponent={subHeaderComponent}
        striped
        subHeaderWrap
        expandableRows
        expandableRowsComponent={ExpandedComponent}
        
    />
 
  )
}
