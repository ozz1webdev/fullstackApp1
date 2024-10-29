import React from 'react';

const DateConvert = ({ dateString }) => {
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZoneName: 'short',
        };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    };

    return (
        <div>
            <p>{formatDate(dateString)}</p>
        </div>
    );
};

export default DateConvert;