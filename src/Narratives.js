import React, { Fragment, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CollapsibleStory from './CollapsibleStory';

import { useMainNarrativesContext } from './MainNarrativesContext';

import './Narratives.css';

//Start - Element Custamization
const CustomTypography = styled(Typography)(() => ({
  fontSize: '0.875rem',
}));
const CustomBlockquote = styled(`blockquote`)({
  margin: '0px',
  padding: '4px 0px',
});
const CustomBox = styled(Box)(() => ({
  backgroundColor: '#FAFAFA',
  padding: '12px 16px',
  color: '#212121',
  border: '1px solid #E0E0E0',
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
}));
//End - Element Custamization

//Narratives is a sub-component of LuminResult. It receives narrative data via props from its parent.
//Client app can hide this component through configuration that is consumed from askLumin widget.
const Narratives = (props) => {
  // const collapseRef = useRef(null);
  const collapseRef = useRef([]);
  const { toggleExpandAll, expandAll } = useMainNarrativesContext();
  const { narrative } = props;
  const [whyStory, setWhyStory] = useState({});
  // const [expandAll, setExpandAll] = useState(undefined);
  // const [expandAll, setExpandAll] = useState(false);
  const [externalIds, setExternalIds] = useState([]);
  const indexes = [];
  // const refs = external?.length > 0 && externalIds.map((index) => useRef(null));

  useEffect(() => {
    // setExternalIds(list);
  }, []);

  useEffect(() => {
    const { story, whyTypeNarrative } = narrative;
    console.log('narratuive', narrative);
    console.log('whyTypeNarrative', whyTypeNarrative);
    console.log('story', story);
    if (whyTypeNarrative && story && Array.isArray(story) && story.length > 0) {
      const mainNarrative = story.find((item) => item.format === 'content');
      setWhyStory(mainNarrative);
    }
    return () => {
      setWhyStory({});
    };
  }, [narrative?.story && narrative?.whyTypeNarrative]);

  console.log({ whyStory });

  return (
    <div>
      {narrative &&
        narrative?.whyTypeNarrative &&
        whyStory &&
        Object.keys(whyStory).length > 0 && (
          <div>
            <CustomTypography component="div">
              {parse(whyStory.full)}
            </CustomTypography>
            <Button
              onClick={() => {
                // console.log(collapseRef);
                // setExpandAll(!expandAll);
                expandAll === 'true'
                  ? toggleExpandAll('collapse')
                  : toggleExpandAll('expand');
              }}
            >
              {expandAll === true ? 'Collapse All' : 'Expand All'}
            </Button>
            <Fragment>
              {whyStory?.body &&
                Array.isArray(whyStory?.body) &&
                whyStory?.body.length > 0 &&
                whyStory.body.map((item, id) => {
                  if (item?.full) {
                    return (
                      <Box
                        sx={{ paddingTop: '16px' }}
                        key={'story-container' + id}
                      >
                        <CustomBox>
                          <CustomTypography component="div">
                            {parse(item.full)}
                          </CustomTypography>
                        </CustomBox>
                        {item?.body &&
                          Array.isArray(item?.body) &&
                          item?.body.length > 0 &&
                          item?.body?.map((innerItem, idx) => {
                            indexes.push(idx);
                            if (innerItem?.full) {
                              return (
                                <Fragment key={'story-inner-container' + idx}>
                                  <CollapsibleStory
                                    title={innerItem.full}
                                    detail={innerItem?.body}
                                    index={idx}
                                    item={innerItem}
                                    ref={(el) =>
                                      (collapseRef.current[idx] = el)
                                    }
                                    focusIndex={id}
                                    expandAll
                                  />
                                </Fragment>
                              );
                            }
                          })}
                      </Box>
                    );
                  }
                })}
            </Fragment>
            {narrative?.story &&
              Array.isArray(narrative?.story) &&
              narrative?.story.length > 0 &&
              narrative?.story.map((footNote, id) => {
                if (footNote?.type === 'foot_note1' && footNote?.main) {
                  return (
                    <CustomTypography
                      component="div"
                      sx={{ paddingTop: '16px' }}
                      key={'foot-note-1' + id}
                    >
                      {parse(footNote.main)}
                    </CustomTypography>
                  );
                }
              })}
          </div>
        )}
    </div>
  );
};

Narratives.propTypes = {
  narrative: PropTypes.object,
};

export default Narratives;
