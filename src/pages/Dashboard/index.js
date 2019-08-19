import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
// import pt from 'date-fns/locale/pt';
import en from 'date-fns/locale/en-US';
import { MdChevronRight, MdAddCircleOutline } from 'react-icons/md';
import api from '~/services/api';
import { Container, Meetup } from './styles';
import history from '../../services/history';

export default function Dashboard() {
  const [meetups, setMeetup] = useState([]);
  const [date] = useState(new Date());
  useEffect(() => {
    async function loadMeetup() {
      const response = await api.get('meetups');

      /**
       *  {
        params: { date },
      }
       */

      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const data = response.data.map(meetup => {
        const compareDate = utcToZonedTime(meetup.date, timezone);
        return {
          ...meetup,
          formattedDate: format(compareDate, "MMMM, d 'at ' hh:mm ", {
            locale: en,
          }),
        };
      });
      setMeetup(data);
    }

    loadMeetup();
  }, [date]);

  function handleGoDetail(id) {
    history.push(`/details/${id}`);
  }

  function handleGoNewMeetup() {
    history.push(`/meetup`);
  }
  return (
    <Container>
      <header>
        <strong>My Meetups</strong>
        <button type="button" onClick={handleGoNewMeetup}>
          <MdAddCircleOutline size={20} color="#fff" />
          <strong>Add Meetup</strong>
        </button>
      </header>

      <ul>
        {meetups.map(meetup => (
          <Meetup key={meetup.id} past={meetup.past}>
            <strong>{meetup.title} </strong>
            <span>{meetup.formattedDate} </span>
            <button type="button" onClick={() => handleGoDetail(meetup.id)}>
              <MdChevronRight size={36} color="#fff" />
            </button>
          </Meetup>
        ))}
      </ul>
    </Container>
  );
}
