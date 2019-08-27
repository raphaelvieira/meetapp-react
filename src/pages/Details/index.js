import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
// import pt from 'date-fns/locale/pt';
import en from 'date-fns/locale/en-US';
import { MdEdit, MdDelete, MdDateRange, MdLocationOn } from 'react-icons/md';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import api from '~/services/api';
import history from '~/services/history';
import { Container, Detail } from './styles';

export default function Details(props) {
  const [meetup, setMeetup] = useState({});

  useEffect(() => {
    async function loadMeetup() {
      const { id } = props.match.params;
      const response = await api.get(`details-meetup/${id}`);
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const compareDate = utcToZonedTime(response.data.date, timezone);
      const data = {
        ...response.data,
        formattedDate: format(compareDate, "MMMM, d 'at ' hh:mm aa", {
          locale: en,
        }),
      };

      setMeetup(data);
    }

    loadMeetup();
  }, [meetup.date, props]);

  async function cancelMeetup(id) {
    try {
      await api.delete(`meetups/${id}`);
      toast.success('Meetup deleted with success!');
      history.push('/dashboard');
    } catch (error) {
      toast.error(`Error to delete Meetup! ${error.response.data.error}`);
    }
  }

  async function editMeetup(id) {
    history.push(`/meetup/${id}`);
  }

  return (
    <Container>
      <header>
        <strong>{meetup.title}</strong>
        <div>
          <button type="button" id="edit" onClick={() => editMeetup(meetup.id)}>
            <MdEdit size={20} color="#fff" />
            <strong>Edit</strong>
          </button>
          <button
            type="button"
            className="cancel"
            name="cancel"
            id="cancel"
            onClick={() => cancelMeetup(meetup.id)}
          >
            <MdDelete size={20} color="#fff" />
            <strong>Cancel</strong>
          </button>
        </div>
      </header>
      <Detail>
        <img src={meetup.file ? meetup.file.url : null} alt="Meetup" />
        <strong>{meetup.description}</strong>
        <div>
          <span>
            <MdDateRange size={16} color="#fff" /> {meetup.formattedDate}
          </span>

          <span>
            <MdLocationOn size={16} color="#fff" /> {meetup.location}
          </span>
        </div>
      </Detail>
    </Container>
  );
}
Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      experiment: PropTypes.string,
    }),
  }).isRequired,
};
