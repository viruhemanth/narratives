import React from 'react';
import './style.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Narratives from './Narratives';

import {
  MainNarrativesContextProvider,
  useMainNarrativesContext,
} from './MainNarrativesContext';

import Narratives from './Narratives';
const output = require('./why.json');

const data = output.data[0];
// console.log('Frist', data);

export default function App(props) {
  const extractNarrative = (data, chartType) => {
    // console.log(data?.narrative);
    switch (chartType) {
      case 'force-directed-chart': {
        let viewFullNarrative = false;
        if (
          data?.narrative &&
          Array.isArray(data?.narrative) &&
          data?.narrative.length > 0
        ) {
          const content = data?.narrative.find(
            (item) => item?.type === 'foot_note2'
          );
          if (content && content?.main) {
            viewFullNarrative = true;
          }
        }
        return {
          whyTypeNarrative: true,
          story: data?.narrative,
          viewFullNarrative: viewFullNarrative,
          // completeAskLuminOutput: props.askLuminData.data,
          //completeAskLuminOutput will be used when cache mode is true and sent in download full narrative api call only.
          jobId: data?.job_id,
          resourceId: data?.resource_id,
          question: data?.question,
        };
      }
      default:
        return {
          whyTypeNarrative: false,
          story: data?.story,
        };
    }
  };

  console.log(
    'extract narrative',
    extractNarrative(data, data?.chart?.type.toLowerCase())
  );

  return (
    <>
    <MainNarrativesContextProvider>
      <Box sx={{ p: 2, backgroundColor: '#FAFAFA', borderRadius: '4px' }}>
        <Narratives
          narrative={extractNarrative(data, data?.chart?.type.toLowerCase())}
        />
      </Box>
      </MainNarrativesContextProvider>
    </>
  );
}
