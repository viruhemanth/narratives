import React, { useEffect, useState, useContext, createContext } from 'react';

const MainNarrativesContext = createContext({
  expandAll: Boolean,
  toggleExpandAll: () => null,
  outerCollapseState: {},
  setOuterColapseState: () => null,
  innerCollapseState: {},
  setInnerCollapseState: () => null,
});

function MainNarrativesContextProvider({ children }) {
  const [expandAll, setExpandAll] = useState(false);
  const [outerCollapseState, setOuterCollapseState] = useState({});
  const [innerCollapseState, setInnerCollapseState] = useState({});

  const toggleExpandAll = (type) => {
    if (type === 'expand') {
      setExpandAll(!expandAll);
    } else {
      setExpandAll(false);
    }
  };

  return (
    <MainNarrativesContext.Provider
      value={{
        toggleExpandAll,
        expandAll,
        outerCollapseState,
        setOuterCollapseState,
        innerCollapseState,
        setInnerCollapseState,
      }}
    >
      {children}
    </MainNarrativesContext.Provider>
  );
}

const useMainNarrativesContext = () => useContext(MainNarrativesContext);

export { MainNarrativesContextProvider, useMainNarrativesContext };
