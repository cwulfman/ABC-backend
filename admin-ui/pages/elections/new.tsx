import type { NextPage } from 'next'
import LoggedInLayout from 'layout/LoggedInLayout'
import { Button, Card, Grid, Paper, TextField, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'


import Input from 'component/Input';

import theme from 'theme'
import UserContext from 'context/UserContext'
import { requestLoginCode } from 'requests/auth'
import { useRouter } from 'next/router'
import { Election, Maybe } from 'types'
import { getAll as getAllElections } from 'requests/election'
import Section from 'component/Section'
import ElectionCard from 'component/ElectionCard'
import { Box } from '@mui/system'
import ElectionForm from 'component/ElectionForm';

const NewElection: NextPage = () => {
  const [election, setElection] = useState<Maybe<Election>>(null)

  // useEffect(()=>{
  //   const loadElections = async () => {
  //     const newElections = await getAllElections();
  //     // Populate elections with their config
  //     setElections(newElections);
  //   }
  //   loadElections();
  // }, [])

  


  return <LoggedInLayout title="Update Election">
    <ElectionForm election={election} title="Update Election"/>
  </LoggedInLayout>
}

export default NewElection;