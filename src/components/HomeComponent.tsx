import React from 'react'
import PropTypes from 'prop-types'
import { ResultsComponent } from './ResultsComponent'
import SearchComponent from './SearchComponent'

interface IProps{
    isSearched: boolean;
    setIsSearched: (isSearched: boolean) => void;
}

const HomeComponent:React.FC<IProps> = (props: IProps) => {
  return (
    <>
     {props.isSearched ?  <ResultsComponent /> : <SearchComponent isSearched={props.isSearched} setIsSearched={props.setIsSearched}/>}
    </>
  )
}


export default HomeComponent