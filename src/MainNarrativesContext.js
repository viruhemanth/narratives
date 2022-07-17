import React, { useEffect, useState, useContext, createContext } from 'react';

const MainNarrativesContext = createContext({
  expandAll: Boolean,
  toggleExpandAll: () => null,
});

function MainNarrativesContextProvider({ children }) {
  const [expandAll, setExpandAll] = useState(false);

  const toggleExpandAll = (type) => {
    if (type === 'expand') {
      setExpandAll(!expandAll);
      console.log('Hello');
      console.log(expandAll);
    } else {
      setExpandAll(false);
    }
  };

  return (
    <MainNarrativesContext.Provider value={{ toggleExpandAll, expandAll }}>
      {children}
    </MainNarrativesContext.Provider>
  );
}

const useMainNarrativesContext = () => useContext(MainNarrativesContext);

export { MainNarrativesContextProvider, useMainNarrativesContext };
