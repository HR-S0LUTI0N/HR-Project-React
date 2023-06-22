import * as React from 'react';
import { useContext } from "react";

import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import DatesContext from "./context/DatesContext";

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

/**
 * Mimic fetch with abort controller https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort
 * ⚠️ No IE11 support
 */
function fakeFetch(date, { signal }) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      const daysInMonth = date.daysInMonth();
      const daysToHighlight = [1, 2, 3].map(() => getRandomNumber(1, daysInMonth));

      resolve({ daysToHighlight });
    }, 500);

    signal.onabort = () => {
      clearTimeout(timeout);
      reject(new DOMException('aborted', 'AbortError'));
    };
  });
}

const initialValue = dayjs('2022-04-17');

function ServerDay(props) {
  const { markedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isMarked = markedDays.includes(day.format('DD-MM-YYYY'));

  const handleClick = () => {
    props.onDayClick(day.format('DD-MM-YYYY'));
  };

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      badgeContent={isMarked ? '🎀' : undefined}
      onClick={handleClick}
    >
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
}

export default function DateCalendarServerRequest() {
  const requestAbortController = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);
  const { markedDates, setMarkedDates } = useContext(DatesContext);


  const fetchHighlightedDays = (date) => {
    if (requestAbortController.current) {
      requestAbortController.current.abort();
    }

    const controller = new AbortController();
    fakeFetch(date, {
      signal: controller.signal,
    })
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };

  React.useEffect(() => {
    fetchHighlightedDays(initialValue);

    return () => {
      if (requestAbortController.current) {
        requestAbortController.current.abort();
      }
    };
  }, []);

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  const handleDayClick = (day) => {
    const isDayMarked = markedDates.includes(day);
    let updatedMarkedDates = [];

    if (isDayMarked) {
      updatedMarkedDates = markedDates.filter((markedDay) => markedDay !== day);
    } else {
      updatedMarkedDates = [...markedDates, day];
    }

    setMarkedDates(updatedMarkedDates);

    console.log('Marked Dates:', updatedMarkedDates);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        defaultValue={initialValue}
        loading={isLoading}
        onMonthChange={handleMonthChange}
        renderLoading={() => <DayCalendarSkeleton />}
        slots={{
          day: (props) => (
            <ServerDay {...props} onDayClick={handleDayClick} markedDays={markedDates} />
          ),
        }}
        slotProps={{
          day: {
            highlightedDays,
          },
        }}
      />
    </LocalizationProvider>
  );
}
