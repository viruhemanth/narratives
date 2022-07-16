import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
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
))((props) => ({
  borderLeft: !props.inner && '1px solid #E0E0E0',
  borderRight: !props.inner && '1px solid #E0E0E0',
  borderBottom: !props.inner && '1px solid #E0E0E0',
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

const CollapsibleStory = forwardRef((props, ref) => {
  const { title, detail, index, expandAll, setExpandAll } = props;
  const [expanded, setExpanded] = useState(false);
  const [dynamicIndex, setDynamicIndex] = useState('');
  const [innerIndex, setInnerIndex] = useState('');
  const [parentIndex, setParentIndex] = useState('');
  const [innerCollapseState, setInnerCollapseState] = useState({});
  const [outerCollapseState, setOuterCollapseState] = useState({});

  const handleChange = (event, isexpanded, index) => {
    console.log('triggered');
    console.log({ isexpanded });
    // setExpanded(isexpanded ? panel : false);
    // setDynamicIndex(isexpanded ? panel : '');
    setOuterCollapseState({
      ...outerCollapseState,
      [index]: isexpanded ? true : false,
    });
  };

  const handleCollapse = (index) => (event, isExpanded) => {
    // console.log(isExpanded);
    setInnerCollapseState({
      ...innerCollapseState,
      [index]: isExpanded ? true : false,
    });
  };

  useImperativeHandle(ref, () => ({
    expandOuterAccordions: () => {
      console.log('REFS');
      console.log({ ...outerCollapseState });
      setOuterCollapseState({ ...outerCollapseState, [props.index]: true });
    },
  }));

  useEffect(() => {
    setOuterCollapseState({ [props.index]: false });
  }, []);

  useEffect(() => {
    console.log('OUTER COLLAPSE STATE', outerCollapseState);
  });

  // useEffect(() => {
  //   console.log('USE EFFECt', parentIndex);
  // }, []);

  let indexes = [];

  const recursive = (item, parentIndex, handleCollapse, innerCollapseState) => {
    let menuItem;
    // console.log('parentIndex', parentIndex, item, 'childIndex', childIndex);
    if (item?.body?.length === 0 || item?.body === undefined) {
      menuItem = (
        <ul className="list-inner">
          <CustomTypography component="li" key={parentIndex}>
            {parse(item?.full)}
          </CustomTypography>
        </ul>
      );
    } else {
      let menuItemChildren = item?.body.map((item, i) => {
        let menuItem;
        menuItem = recursive(
          item,
          parentIndex,
          handleCollapse,
          innerCollapseState
        );
        return menuItem;
      });
      if (item?.format === 'content') {
        menuItem = (
          <>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                // backgroundColor: 'red',
                // padding: 5,
                // marginBottom: 15,
                // lineHeight: 22,
              }}
            >
              <CustomTypography>{parse(item?.full)}</CustomTypography>
              {menuItemChildren}
            </div>
          </>
        );
      } else {
        menuItem = (
          <Accordion
            expanded={innerCollapseState[item?.full] === true}
            inner={true}
            onChange={handleCollapse(item?.full)}
          >
            <AccordionSummary
              isexpanded={
                innerCollapseState[item?.full] === true ? true : undefined
              }
            >
              <CustomTypography>{parse(item?.full)}</CustomTypography>
            </AccordionSummary>
            <AccordionDetails>{menuItemChildren}</AccordionDetails>
          </Accordion>
        );
      }
    }
    return menuItem;
  };

  console.log(indexes);

  return (
    <>
      <Accordion
        // expanded={expanded === 'panel'}
        expanded={outerCollapseState[props.index] === true}
        onChange={(event, isExpanded) => {
          handleChange(event, isExpanded, props.index);
        }}
      >
        <AccordionSummary
          aria-controls={`panel-content`}
          id={`panel-header`}
          // isexpanded={expanded ? expanded : undefined}
          isexpanded={
            outerCollapseState[props.index] === true ? true : undefined
          }
          detail={detail === undefined ? 'hide' : 'show'}
          style={{ pointerEvents: detail === undefined ? 'none' : '' }}
        >
          <CustomTypography>{parse(title)}</CustomTypography>
        </AccordionSummary>
        <AccordionDetails>
          {detail &&
            Array.isArray(detail) &&
            detail.length > 0 &&
            detail?.map((item, idx1) => {
              console.log('currentIndex', idx1);
              if (item?.full) {
                return (
                  <Box
                    key={'story-innermost-container' + idx1}
                    sx={{
                      paddingTop: '8px',
                    }}
                  >
                    {/* <CustomTypography>{parse(item.full)}shit</CustomTypography>
                  <CustomUl>
                    {item?.body &&
                      Array.isArray(item?.body) &&
                      item?.body.length > 0 &&
                      item?.body.map((listItem, idx2) => {
                        if (listItem?.full) {
                          return (
                            <li key={'story-lastlist-item' + idx2}>
                              <CustomTypography>
                                {parse(listItem.full)}
                              </CustomTypography>
                            </li>
                          );
                        }
                      })}
                  </CustomUl> */}
                    {/* {indexes.push(idx1)} */}
                    {recursive(item, idx1, handleCollapse, innerCollapseState)}
                  </Box>
                );
              }
            })}
        </AccordionDetails>
      </Accordion>
    </>
  );
});

CollapsibleStory.propTypes = {
  title: PropTypes.string,
  detail: PropTypes.array,
};

// CollapsibleStory = forwarRef(CollapsibleStory);
export default CollapsibleStory;
