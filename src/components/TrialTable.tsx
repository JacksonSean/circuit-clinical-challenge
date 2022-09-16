import React from 'react'
import Button from 'react-bootstrap/esm/Button';
import DataTable, { ExpanderComponentProps, TableColumn } from 'react-data-table-component';
import { api } from '../api/apis';
import ITrialData from '../types/ITrialData';
import { TextField } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ModalComponent from './ModalComponent';

interface IProps{
    trialDataList: ITrialData[];
    setTrialDataList: (trialDataList: ITrialData[]) => void;
}

const EditButton = () => <><IconButton className="icon-custom" aria-label="edit"><EditIcon /></IconButton></>;
const DeleteButton = () => <><IconButton className="icon-custom" aria-label="delete"><DeleteIcon /></IconButton></>;




// const columns: TableColumn<ITrialData>[] = [
//     {
//         name: 'Id',
//         selector: (row: { id: number; }) => row.id,
//         sortable: true, 
//         width: "75px"
//     },
//     {
//         name: 'Title',
//         selector: (row: { title: string; }) => row.title,
//         sortable: true,
//         wrap: true
//     },
//     {
//         name: 'Completion Date',
//         selector: (row: { endDate: string; }) => row.endDate,
//         sortable: true,

//     },
//     {
//         name: 'Action',
//         width: "75px",
//         cell: (row) => <><EditButton></EditButton><DeleteButton onClick={() => handleDelete(row.id)}></DeleteButton></> //Edit and Delete buttonss
//     }
// ]



// const ExpandedComponent: React.FC<ExpanderComponentProps<ITrialData>> = ({ data }) => {
//     return <pre>{JSON.stringify(data , null, 2)}</pre>;
// };


export const TrialTable:React.FC<IProps> = (props:IProps) => {

    const handleDelete = (id:number) =>{
            console.log("hey");
    }

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
           
            cell: (row) => <><EditButton></EditButton><IconButton onClick={(e) => deleteTrial('' + row.id)} className="icon-custom" aria-label="delete"><DeleteIcon /></IconButton></>
            
        }
    ]
  

    
    const subHeaderComponent = (
    	<div style={{ display: 'flex', alignItems: 'center' }}>
            <ModalComponent setTrialDataList={props.setTrialDataList} trialDataList={props.trialDataList}/> 
    		{/* <TextField id="outlined-basic" label="Search" variant="outlined" size="small" style={{ margin: '5px' }} /> */}
    	</div>
    );

    const deleteTrial = async (id:string) =>
    {
      try {
          await api.delete(`/trials/${id}`);
          const trials = props.trialDataList.filter(trial => trial.id.toString() != id);
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
        //direction="auto"
        fixedHeaderScrollHeight="300px"
        pagination
        responsive
        subHeader
        subHeaderComponent={subHeaderComponent}
        striped
        //subHeaderAlign='right'
        // progressPending={}
        subHeaderWrap
       // expandableRows
       // expandableRowsComponent={<ExpandedComponent data={data} />}
        
    />
 
  )
}
