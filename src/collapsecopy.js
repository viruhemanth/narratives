import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import { styled } from '@mui/material/styles';

// import styled from 'styled-components';
import Box from '@mui/material/Box';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

// import Box from '@material-ui/core/Box';
// import MuiAccordion from '@material-ui/core/Accordion';
// import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
// import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
// import Typography from '@material-ui/core/Typography';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
// import Tooltip from '@material-ui/core/Tooltip';

const CustomTypography = styled(Typography)(() => ({
  fontSize: '0.875rem',
}));
const CustomUl = styled(`ul`)({
  marginTop: '8px',
  marginBottom: '8px',
});
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  borderLeft: '1px solid #E0E0E0',
  borderRight: '1px solid #E0E0E0',
  borderBottom: '1px solid #E0E0E0',
  borderBottomLeftRadius: '8px',
  borderBottomRightRadius: '8px',
  '&:not(:last-child)': {
    borderBottom: 0,
    // backgroundColor: 'red',
    borderBottomLeftRadius: '0px',
    borderBottomRightRadius: '0px',
  },
  '&:before': {
    display: 'none',
  },
  '&:first-child': {
    borderLeft: '0px',
    borderRight: '0px',
    borderBottom: '0px',
  },
}));
const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      props.isexpanded ? (
        <Tooltip title="Collapse" arrow>
          <RemoveCircleOutlineIcon
            sx={{ fontSize: '1.25rem', marginTop: '12px' }}
            style={{
              display: props.detail === 'hide' ? 'none' : '',
              pointerEvents: props.detail === 'hide' ? 'none' : '',
            }}
          />
        </Tooltip>
      ) : (
        <Tooltip title="Expand" arrow>
          <AddCircleOutlineIcon
            sx={{ fontSize: '1.25rem', marginTop: '12px' }}
            style={{
              display: props.detail === 'hide' ? 'none' : '',
              pointerEvents: props.detail === 'hide' ? 'none' : '',
            }}
          />
        </Tooltip>
      )
    }
    {...props}
  />
))(() => ({
  minHeight: '40px',
  padding: '0px 16px 6px 16px',
  borderBottomLeftRadius: '8px',
  borderBottomRightRadius: '8px',
  backgroundColor: '#FFFFFF',
  flexDirection: 'row-reverse',
  alignItems: 'flex-start',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(0deg)',
  },
  '& .MuiAccordionSummary-content': {
    margin: '12px 8px 4px 8px',
  },
}));
const AccordionDetails = styled(MuiAccordionDetails)(() => ({
  padding: '4px 16px 6px 44px',
}));

// const NestedAccordion = ({ formatStoryRecursively, item, index, idx1 }) => {
//   const [dynamicIndex, setDynamicIndex] = useState('');
//   const [innerIndex, setInnerIndex] = useState('');

//   const handleInnerAccordionChange = (position) => (event, isExpanded) => {
//     // console.log({ position, isExpanded });
//     setInnerIndex(isExpanded ? position : '');
//   };

//   const handleChange = (position) => (event, isExpanded) => {
//     // console.log({ position, isExpanded });
//     setDynamicIndex(isExpanded ? position : '');
//   };
//   return (
//     <Accordion
//       expanded={dynamicIndex === `panel-${index}-${idx1}`}
//       // expanded={false}
//       onChange={handleChange(`panel-${index}-${idx1}`)}
//     >
//       <AccordionSummary
//         aria-controls={`panel-content`}
//         id={`panel-header`}
//         // isexpanded={expanded ? expanded : undefined}
//         // isexpanded={false}
//         isexpanded={dynamicIndex === `panel-${index}-${idx1}` ? true : false}
//       >
//         <CustomTypography>{parse(item?.full)}</CustomTypography>
//       </AccordionSummary>
//       <AccordionDetails>
//         {parse(formatStoryRecursively(item?.body, 1))}
//       </AccordionDetails>
//     </Accordion>
//   );
// };

const CollapsibleStory = (props) => {
  const { title, detail, index } = props;
  const [expanded, setExpanded] = useState(false);
  const [dynamicIndex, setDynamicIndex] = useState('');
  const [innerIndex, setInnerIndex] = useState('');
  const [innerCollapseState, setInnerCollapseState] = useState({});

  const handleInnerAccordionChange = (position) => (event, isExpanded) => {
    // console.log({ position, isExpanded });
    setInnerIndex(isExpanded ? position : '');
    setInnerCollapseState({
      ...innerCollapseState,
      [position]: isExpanded ? position : '',
    });
  };
  const handleChange = (panel) => (event, isexpanded) => {
    console.log({ isexpanded });
    setExpanded(isexpanded ? panel : false);
    setDynamicIndex(isexpanded ? panel : '');
  };

  useEffect(() => {
    console.log({ title, detail });
  }, []);

  let body = '';
  // const renderRecursiveAccordions = (item) => {
  //   let summary = null;
  //   let detail = null;
  //   if (item?.format === 'content') {
  //     summary = <CustomTypography>{parse(item?.full)}</CustomTypography>;
  //   } else if (item.format === 'list') {
  //     detail = (
  //       <Accordion
  //         expanded={
  //           innerCollapseState[`panel-${index}-${idx1}`] ===
  //           `panel-${index}-${idx1}`
  //         }
  //         // expanded={false}
  //         onChange={handleInnerAccordionChange(`panel-${index}-${idx1}`)}
  //       >
  //         <AccordionSummary
  //           aria-controls={`panel-content`}
  //           id={`panel-header`}
  //           // isexpanded={expanded ? expanded : undefined}
  //           // isexpanded={false}
  //           isexpanded={
  //             innerCollapseState[`panel-${index}-${idx1}`] ===
  //             `panel-${index}-${idx1}`
  //           }
  //         >
  //           <CustomTypography component="div">
  //             {parse(item?.full)}
  //           </CustomTypography>
  //         </AccordionSummary>
  //         <AccordionDetails>
  //           {renderRecursiveAccordions(item?.body)}
  //         </AccordionDetails>
  //       </Accordion>
  //     );
  //   }
  //   return (
  //     <div>
  //       {summary}
  //       {detail}
  //     </div>
  //   );
  // };

  let output = null;

  detail !== undefined &&
    detail.length > 0 &&
    detail.map((item, boxIndex) => {
      if (item?.format === 'content') {
        output = <CustomTypography>{parse(item?.full)}</CustomTypography>;
      } else if (item?.format === 'list') {
        output = (
          <Accordion
            expanded={dynamicIndex === `panel`}
            onChange={handleChange(`panel`)}
          >
            <AccordionSummary
              aria-controls={`panel-content`}
              id={`panel-header`}
              isexpanded={dynamicIndex === 'panel'}
              detail={detail === undefined ? 'hide' : 'show'}
              style={{ pointerEvents: detail === undefined ? 'none' : '' }}
            >
              <CustomTypography>{parse(item?.full)} </CustomTypography>
            </AccordionSummary>
            <AccordionDetails>
              <CollapsibleStory title={item?.full} detail={item?.body} />
            </AccordionDetails>
          </Accordion>
        );
      }
    });

  return output;

  // return (
  //   <Accordion
  //     expanded={dynamicIndex === `panel`}
  //     onChange={handleChange(`panel`)}
  //   >
  //     <AccordionSummary
  //       aria-controls={`panel-content`}
  //       id={`panel-header`}
  //       isexpanded={dynamicIndex === 'panel'}
  //       detail={detail === undefined ? 'hide' : 'show'}
  //       style={{ pointerEvents: detail === undefined ? 'none' : '' }}
  //     >
  //       <CustomTypography>{parse(detail?.full)}</CustomTypography>
  //     </AccordionSummary>
  //     <AccordionDetails>
  //       {detail &&
  //         Array.isArray(detail) &&
  //         detail.length > 0 &&
  //         detail?.map((item, idx1) => {
  //           console.log({ detailLength: detail.length, item, idx1 });
  //           if (item?.full) {
  let nestedTitle;

  // let body = '';

  // const formatStoryRecursively = (rawData, level = null) => {
  //   rawData.forEach((data) => {
  //     if (data?.format === 'content') {
  //       body += `<div class=${
  //         level === 1
  //           ? 'custom-full-narrative-div'
  //           : 'custom-padding'
  //       }>`;
  //       if (data?.full) {
  //         body +=
  //           `<div class=${
  //             level === 1
  //               ? 'custom-full-narrative-typography'
  //               : 'custom-padding'
  //           }>` +
  //           `${data.full}` +
  //           '</div>';
  //       }
  //       if (Array.isArray(data?.body)) {
  //         formatStoryRecursively(data?.body);
  //       }
  //       body += '</div>';
  //     }
  //     if (data?.format === 'list') {
  //       body += "<ul class='custom-padding'>";
  //       if (data?.full) {
  //         body += '<li>' + data.full + '</li>';
  //       }
  //       if (Array.isArray(data?.body)) {
  //         formatStoryRecursively(data?.body);
  //       }
  //       body += '</ul>';
  //     }
  //   });
  //   return body;
  // };
  // if (item.body === undefined) {
  //   return item.full;
  // }
  // return (
  //   <Box
  //     key={'story-innermost-container' + idx1}
  //     sx={{
  //       paddingTop: '8px',
  //     }}
  //   >
  //     <CustomTypography>{parse(item?.full)}</CustomTypography>
  //     <CustomUl>
  //       {item?.body &&
  //         Array.isArray(item?.body) &&
  //         item?.body.length > 0 &&
  //         item?.body.map((listItem, idx2) => {
  //           if (listItem?.full) {
  //             return (
  //               <li key={'story-lastlist-item' + idx2}>
  //                 <CustomTypography>
  //                   {parse(listItem.full)}
  //                 </CustomTypography>
  //               </li>
  //             );
  //           }
  //         })}
  //     </CustomUl>
  {
    /* {renderRecursiveAccordions(item, index, idx1)} */
  }

  {
    /* <Accordion
                    expanded={
                      innerCollapseState[`panel-${index}-${idx1}`] ===
                      `panel-${index}-${idx1}`
                    }
                    // expanded={false}
                    onChange={handleInnerAccordionChange(
                      `panel-${index}-${idx1}`
                    )}
                  >
                    <AccordionSummary
                      aria-controls={`panel-content`}
                      id={`panel-header`}
                      // isexpanded={expanded ? expanded : undefined}
                      // isexpanded={false}
                      isexpanded={
                        innerCollapseState[`panel-${index}-${idx1}`] ===
                        `panel-${index}-${idx1}`
                      }
                    >
                      <CustomTypography>
                        {parse(item?.full)}shit
                      </CustomTypography>
                    </AccordionSummary>
                    <AccordionDetails>
                      {parse(formatStoryRecursively(item?.body, 1))}
                    </AccordionDetails>
                  </Accordion> */
    // }
    // {
    /* </Box>
              ); */
    // }
    //           }
    //         })}
    //     </AccordionDetails>
    //   </Accordion>
    // );
  }
};

CollapsibleStory.propTypes = {
  title: PropTypes.string,
  detail: PropTypes.array,
};

export default CollapsibleStory;
