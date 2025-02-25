import React, { useEffect, useState } from "react";
import { fetchProtectedData } from "../api/authService";
import Interface from "./interfaces";

const ProtectedComponent = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetchProtectedData();
                setData(response);
            } catch (error) {
                setError(error.message || "Error al obtener datos protegidos.");
            }
        };

        getData();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <Interface />
        </div>
    );
};

export default ProtectedComponent;