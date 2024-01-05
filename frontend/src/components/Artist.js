import React from 'react';
import { useParams } from 'react-router-dom';

const Artist = () => {
    const { id } = useParams();

    return(
        <div className="m-36">
            {id}
        </div>
    );

};

export default Artist;