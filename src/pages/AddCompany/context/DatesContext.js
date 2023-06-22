import { createContext, useEffect, useState } from "react";
import axios from "axios";

const DatesContext = createContext();

function Provider({ children }) {

    const [markedDates, setMarkedDates] = useState([]);

    const valueToShare = {
        markedDates,
        setMarkedDates,
    };

    return (
        <DatesContext.Provider value={valueToShare}>
            {children}
        </DatesContext.Provider>
    );

}

export { Provider };

export default DatesContext;